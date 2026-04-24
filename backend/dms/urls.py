from django.urls import path
from .views import MessageListView, ConversationsListView, UnreadCountView

urlpatterns = [
    path('', MessageListView.as_view()),
    path('conversations/', ConversationsListView.as_view()),
    path('unread/', UnreadCountView.as_view()),
]
