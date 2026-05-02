import re
from django.contrib.auth import get_user_model
from django.db.models import Count, Exists, OuterRef, Prefetch, Q
from rest_framework import generics, permissions, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from .models import Post, Like, Comment, CommentLike
from .serializers import PostSerializer, CommentSerializer
from notifications.models import Notification

User = get_user_model()


def _annotate_posts(queryset, user=None):
    """Adiciona contagens e flags ao queryset de posts — elimina N+1."""
    qs = queryset.select_related('author', 'repost_of__author').annotate(
        likes_count_ann=Count('likes', distinct=True),
        comments_count_ann=Count(
            'comments',
            filter=Q(comments__parent__isnull=True),
            distinct=True,
        ),
        reposts_count_ann=Count('reposts', distinct=True),
    )
    if user and user.is_authenticated:
        qs = qs.annotate(
            is_liked_ann=Exists(
                Like.objects.filter(post=OuterRef('pk'), user=user)
            ),
            is_reposted_ann=Exists(
                Post.objects.filter(repost_of=OuterRef('pk'), author=user)
            ),
        )
    return qs.order_by('-created_at')


def _annotate_comments(queryset, user=None):
    """Adiciona contagens e pré-carrega replies ao queryset de comentários."""
    replies_qs = Comment.objects.select_related('author').annotate(
        likes_count_ann=Count('likes', distinct=True),
    )
    qs = queryset.select_related('author').annotate(
        likes_count_ann=Count('likes', distinct=True),
    )
    if user and user.is_authenticated:
        replies_qs = replies_qs.annotate(
            is_liked_ann=Exists(
                CommentLike.objects.filter(comment=OuterRef('pk'), user=user)
            )
        )
        qs = qs.annotate(
            is_liked_ann=Exists(
                CommentLike.objects.filter(comment=OuterRef('pk'), user=user)
            )
        )
    replies_qs = replies_qs.order_by('-created_at')
    return qs.order_by('-created_at').prefetch_related(Prefetch('replies', queryset=replies_qs))


def notify_mentions(content, sender, post):
    usernames = set(re.findall(r'@(\w+)', content))
    for username in usernames:
        try:
            user = User.objects.get(username__iexact=username)
            if user != sender:
                Notification.objects.get_or_create(
                    recipient=user,
                    sender=sender,
                    type=Notification.MENTION,
                    post=post,
                )
        except User.DoesNotExist:
            pass


class IsAuthorOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.author == request.user


class PostListCreateView(generics.ListCreateAPIView):
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return _annotate_posts(Post.objects.all(), self.request.user)

    def perform_create(self, serializer):
        post = serializer.save(author=self.request.user)
        notify_mentions(post.content, self.request.user, post)


class PostDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]
    http_method_names = ['get', 'patch', 'delete', 'head', 'options']

    def get_queryset(self):
        return _annotate_posts(Post.objects.all(), self.request.user)


class LikeToggleView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        post = generics.get_object_or_404(Post, pk=pk)
        like, created = Like.objects.get_or_create(user=request.user, post=post)
        if not created:
            like.delete()
            return Response({'status': 'unliked'})
        if post.author != request.user:
            Notification.objects.create(
                recipient=post.author,
                sender=request.user,
                type=Notification.LIKE,
                post=post,
            )
        return Response({'status': 'liked'}, status=status.HTTP_201_CREATED)


class CommentListCreateView(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        base = Comment.objects.filter(post_id=self.kwargs['pk'], parent=None)
        return _annotate_comments(base, self.request.user)

    def perform_create(self, serializer):
        post = generics.get_object_or_404(Post, pk=self.kwargs['pk'])
        parent_id = self.request.data.get('parent')
        parent = None
        if parent_id:
            parent = generics.get_object_or_404(Comment, pk=parent_id, post=post)
        comment = serializer.save(author=self.request.user, post=post, parent=parent)
        if parent and parent.author != self.request.user:
            Notification.objects.create(
                recipient=parent.author,
                sender=self.request.user,
                type=Notification.COMMENT_REPLY,
                post=post,
            )
        notify_mentions(comment.content, self.request.user, post)


class CommentDeleteView(generics.DestroyAPIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated, IsAuthorOrReadOnly]

    def get_object(self):
        comment = generics.get_object_or_404(
            Comment,
            pk=self.kwargs['comment_pk'],
            post_id=self.kwargs['pk']
        )
        self.check_object_permissions(self.request, comment)
        return comment


class CommentLikeToggleView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk, comment_pk):
        comment = generics.get_object_or_404(Comment, pk=comment_pk, post_id=pk)
        like, created = CommentLike.objects.get_or_create(user=request.user, comment=comment)
        if not created:
            like.delete()
            return Response({'status': 'unliked'})
        return Response({'status': 'liked'}, status=status.HTTP_201_CREATED)


class RepostToggleView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        original = generics.get_object_or_404(Post, pk=pk)
        if original.repost_of_id:
            return Response({'detail': 'Não é possível republicar uma republicação.'}, status=status.HTTP_400_BAD_REQUEST)
        if original.author == request.user:
            return Response({'detail': 'Não é possível republicar o próprio post.'}, status=status.HTTP_400_BAD_REQUEST)
        existing = Post.objects.filter(author=request.user, repost_of=original).first()
        if existing:
            existing.delete()
            return Response({'status': 'unreposted'})
        Post.objects.create(author=request.user, content='', repost_of=original)
        return Response({'status': 'reposted'}, status=status.HTTP_201_CREATED)


class PostLikersView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, pk):
        post = generics.get_object_or_404(Post, pk=pk)
        likers = Like.objects.filter(post=post).select_related('user').order_by('-id')[:3]
        data = [{'display_name': like.user.display_name or like.user.username} for like in likers]
        return Response(data)


class PostRepostersView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, pk):
        post = generics.get_object_or_404(Post, pk=pk)
        reposters = Post.objects.filter(repost_of=post).select_related('author').order_by('-id')[:3]
        data = [{'display_name': r.author.display_name or r.author.username} for r in reposters]
        return Response(data)


class FeedPagination(PageNumberPagination):
    page_size = 15


class FeedView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PostSerializer
    pagination_class = FeedPagination

    def get_queryset(self):
        following_users = self.request.user.following.values_list('following', flat=True)
        base = Post.objects.filter(author__in=following_users, repost_of__isnull=True).order_by('-created_at')
        return _annotate_posts(base, self.request.user)
