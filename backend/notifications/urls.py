from django.urls import path
from .views import NotificationListView, MarkReadView, MarkOneReadView

urlpatterns = [
    path('', NotificationListView.as_view()),
    path('mark-read/', MarkReadView.as_view()),
    path('<int:pk>/mark-read/', MarkOneReadView.as_view()),
]
