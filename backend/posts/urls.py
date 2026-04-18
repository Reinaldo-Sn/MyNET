from django.urls import path
from .views import PostListCreateView, PostDetailView, LikeToggleView, CommentListCreateView, CommentDeleteView, FeedView

urlpatterns = [
    path('', PostListCreateView.as_view(), name='post-list-create'),
    path('<int:pk>/', PostDetailView.as_view(), name='post-detail'),
    path('<int:pk>/like/', LikeToggleView.as_view(), name='post-like'),
    path('<int:pk>/comments/', CommentListCreateView.as_view(), name='post-comments'),
    path('<int:pk>/comments/<int:comment_pk>/', CommentDeleteView.as_view(), name='comment-delete'),
    path('feed/', FeedView.as_view(), name='post-feed')
]

