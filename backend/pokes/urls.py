from django.urls import path
from .views import PokeListView, PokeMarkSeenView, PokeSendView

urlpatterns = [
    path('', PokeListView.as_view()),
    path('mark-seen/', PokeMarkSeenView.as_view()),
    path('<int:user_id>/', PokeSendView.as_view()),
]
