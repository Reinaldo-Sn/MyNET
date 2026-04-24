import re
from django.contrib.auth import get_user_model
from rest_framework import generics, permissions, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Post, Like, Comment, CommentLike
from .serializers import PostSerializer, CommentSerializer
from notifications.models import Notification

User = get_user_model()


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

# Permite leitura por qualquer um, mas edição/deleção só pelo autor do objeto
class IsAuthorOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.author == request.user

# Lista todos os posts ou cria um novo (autor = usuário autenticado)
class PostListCreateView(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        post = serializer.save(author=self.request.user)
        notify_mentions(post.content, self.request.user, post)

# Detalhe, edição parcial e deleção de um post específico
class PostDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]
    http_method_names = ['get', 'patch', 'delete', 'head', 'options']

# Curtir ou descurtir um post (toggle) — cria o Like se não existir, deleta se existir
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

# Lista comentários de um post ou cria um novo comentário
class CommentListCreateView(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Comment.objects.filter(post_id=self.kwargs['pk'], parent=None)

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

# Deleta um comentário específico (só o autor pode deletar)
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


class FeedView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PostSerializer

    def get_queryset(self):
        following_users = self.request.user.following.values_list('following', flat=True)
        return Post.objects.filter(author__in=following_users).order_by('-created_at')

