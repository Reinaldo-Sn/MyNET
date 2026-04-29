from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.views import TokenObtainPairView as BaseTokenView
from .serializers import SingleSessionTokenSerializer
from .views import RegisterView, ProfileView, UserSearchView, UserDetailView, DeleteAccountView, PinPostView


class SingleSessionTokenView(BaseTokenView):
    serializer_class = SingleSessionTokenSerializer


urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', SingleSessionTokenView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('delete-account/', DeleteAccountView.as_view(), name='delete-account'),
    path('users/', UserSearchView.as_view(), name='user-search'),
    path('users/<int:pk>/', UserDetailView.as_view(), name='user-detail'),
    path('pin-post/<int:pk>/', PinPostView.as_view(), name='pin-post'),
]