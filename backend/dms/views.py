from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
from django.contrib.auth import get_user_model
from follows.models import Follow
from .models import DirectMessage
from .serializers import DirectMessageSerializer

User = get_user_model()


class MessageListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        other_id = request.query_params.get('recipient')
        if not other_id:
            return Response([], status=200)
        msgs = DirectMessage.objects.filter(
            Q(sender=request.user, recipient_id=other_id) |
            Q(sender_id=other_id, recipient=request.user)
        ).select_related('sender', 'recipient')
        DirectMessage.objects.filter(
            sender_id=other_id, recipient=request.user, is_read=False
        ).update(is_read=True)
        return Response(DirectMessageSerializer(msgs, many=True, context={'request': request}).data)

    def post(self, request):
        recipient_id = request.data.get('recipient')
        if not Follow.objects.filter(follower=request.user, following_id=recipient_id).exists():
            return Response({'detail': 'Você precisa seguir esse usuário para enviar mensagens.'}, status=403)
        serializer = DirectMessageSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(sender=request.user)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


class ConversationsListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        # Uma única query com todos os usuários pré-carregados
        msgs = DirectMessage.objects.filter(
            Q(sender=user) | Q(recipient=user)
        ).select_related('sender', 'recipient').order_by('-created_at')

        seen: dict = {}
        for msg in msgs:
            other = msg.recipient if msg.sender_id == user.id else msg.sender
            if other.id not in seen:
                seen[other.id] = {
                    'user': other,
                    'last_message': msg.content,
                    'last_message_at': msg.created_at.isoformat(),
                    'unread_count': 0,
                }
            if msg.sender_id == other.id and not msg.is_read:
                seen[other.id]['unread_count'] += 1

        conversations = []
        for data in seen.values():
            other = data['user']
            conversations.append({
                'user_id': other.id,
                'username': other.username,
                'display_name': other.display_name,
                'avatar': request.build_absolute_uri(other.avatar.url) if (other.avatar and other.avatar.name) else None,
                'last_message': data['last_message'],
                'last_message_at': data['last_message_at'],
                'unread_count': data['unread_count'],
            })

        conversations.sort(key=lambda x: x['last_message_at'] or '', reverse=True)
        return Response(conversations)


class UnreadCountView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        count = DirectMessage.objects.filter(recipient=request.user, is_read=False).count()
        return Response({'count': count})
