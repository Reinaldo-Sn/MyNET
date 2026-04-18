from django.urls import path
from .views import FollowToggleView, FollowersListView, FollowingListView

urlpatterns = [
    path('<int:user_id>/follow/', FollowToggleView.as_view()),
    path('<int:user_id>/followers/', FollowersListView.as_view()),
    path('<int:user_id>/following/', FollowingListView.as_view()),
]
