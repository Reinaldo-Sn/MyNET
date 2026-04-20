from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from .models import Follow
from .serializers import UserSummarySerializer
from notifications.models import Notification

User = get_user_model()

class FollowToggleView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, user_id):
        target = get_object_or_404(User, id=user_id)

        if target == request.user:
            return Response({'detail': 'Você não pode seguir a si mesmo.'}, status=status.HTTP_400_BAD_REQUEST)

        follow, created = Follow.objects.get_or_create(follower=request.user, following=target)

        if not created:
            follow.delete()
            Notification.objects.filter(recipient=target, sender=request.user, type=Notification.FOLLOW).delete()
            return Response({'detail': 'Deixou de seguir.'}, status=status.HTTP_200_OK)

        Notification.objects.get_or_create(recipient=target, sender=request.user, type=Notification.FOLLOW)
        return Response({'detail': 'Seguindo.'}, status=status.HTTP_201_CREATED)

class FollowersListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, user_id):
        target = get_object_or_404(User, id=user_id)
        followers = User.objects.filter(following__following=target)
        serializer = UserSummarySerializer(followers, many=True, context={'request': request})
        return Response(serializer.data)

class FollowingListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, user_id):
        target = get_object_or_404(User, id=user_id)
        following = User.objects.filter(followers__follower=target)
        serializer = UserSummarySerializer(following, many=True, context={'request': request})
        return Response(serializer.data)
