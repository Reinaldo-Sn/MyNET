from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterView

urlpatterns = [
    # Cadastro de novo usuário
    path('register/', RegisterView.as_view(), name='register'),
    # Login — retorna access + refresh token
    path('login/', TokenObtainPairView.as_view(), name='login'),
    # Renova o access token usando o refresh token
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]