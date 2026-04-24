from rest_framework import generics, permissions, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework_simplejwt.tokens import RefreshToken
from django.db.models import Count, Exists, OuterRef, Q
from follows.models import Follow
from .serializers import RegisterSerializer, ProfileSerializer
from .models import User


class SearchPagination(PageNumberPagination):
    page_size = 8


def _annotate_users(queryset, user=None):
    """Adiciona contagens de seguidores/seguindo e flag is_following — elimina N+1."""
    qs = queryset.annotate(
        followers_count_ann=Count('followers', distinct=True),
        following_count_ann=Count('following', distinct=True),
    )
    if user and user.is_authenticated:
        qs = qs.annotate(
            is_following_ann=Exists(
                Follow.objects.filter(following=OuterRef('pk'), follower=user)
            )
        )
    return qs


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return Response({
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
            },
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })


class ProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return _annotate_users(
            User.objects.filter(pk=self.request.user.pk),
            self.request.user,
        ).get()


class UserSearchView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ProfileSerializer
    pagination_class = SearchPagination

    def get_queryset(self):
        search = self.request.query_params.get('search', '')
        top = self.request.query_params.get('top')
        qs = User.objects.exclude(id=self.request.user.id)
        if top:
            return _annotate_users(qs, self.request.user).order_by('-followers_count_ann')[:int(top)]
        return _annotate_users(
            qs.filter(Q(username__icontains=search) | Q(display_name__icontains=search)),
            self.request.user,
        )

    def list(self, request, *args, **kwargs):
        if request.query_params.get('top'):
            self.pagination_class = None
        return super().list(request, *args, **kwargs)


class UserDetailView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ProfileSerializer

    def get_queryset(self):
        return _annotate_users(User.objects.all(), self.request.user)


class DeleteAccountView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        request.user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
