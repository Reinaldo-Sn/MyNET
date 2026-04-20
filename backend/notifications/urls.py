from django.urls import path
from .views import NotificationListView, MarkReadView

urlpatterns = [
    path('', NotificationListView.as_view()),
    path('mark-read/', MarkReadView.as_view()),
]
