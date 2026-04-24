from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Notification
from .serializers import NotificationSerializer

class NotificationListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        notifications = Notification.objects.filter(recipient=request.user, is_read=False)
        return Response(NotificationSerializer(notifications, many=True).data)

class MarkReadView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        Notification.objects.filter(recipient=request.user, is_read=False).update(is_read=True)
        return Response({'detail': 'Marcadas como lidas.'})

class MarkOneReadView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        Notification.objects.filter(recipient=request.user, pk=pk).update(is_read=True)
        return Response({'detail': 'Marcada como lida.'}, status=status.HTTP_200_OK)
