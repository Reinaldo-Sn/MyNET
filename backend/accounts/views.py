from rest_framework import generics, permissions
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.db.models import Q, Count
from .serializers import RegisterSerializer, ProfileSerializer
from .models import User

# View de cadastro de usuário
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

    # Cria o usuário e retorna os tokens JWT
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

# View de visualização e edição do perfil do usuário autenticado
class ProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    # Retorna o usuário logado como objeto do perfil
    def get_object(self):
        return self.request.user

class UserSearchView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ProfileSerializer

    def get_queryset(self):
        search = self.request.query_params.get('search', '')
        top = self.request.query_params.get('top')
        qs = User.objects.exclude(id=self.request.user.id)
        if top:
            return qs.annotate(fc=Count('followers')).order_by('-fc')[:int(top)]
        return qs.filter(Q(username__icontains=search) | Q(display_name__icontains=search))

class UserDetailView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ProfileSerializer
    queryset = User.objects.all()
