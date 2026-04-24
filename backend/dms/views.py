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
        )
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
        msgs = DirectMessage.objects.filter(Q(sender=user) | Q(recipient=user))

        other_ids = set()
        for m in msgs:
            other_id = m.recipient_id if m.sender_id == user.id else m.sender_id
            other_ids.add(other_id)

        conversations = []
        for oid in other_ids:
            last = DirectMessage.objects.filter(
                Q(sender=user, recipient_id=oid) | Q(sender_id=oid, recipient=user)
            ).last()
            try:
                other = User.objects.get(pk=oid)
            except User.DoesNotExist:
                continue
            unread = DirectMessage.objects.filter(sender_id=oid, recipient=user, is_read=False).count()
            conversations.append({
                'user_id': other.id,
                'username': other.username,
                'display_name': other.display_name,
                'avatar': request.build_absolute_uri(other.avatar.url) if (other.avatar and other.avatar.name) else None,
                'last_message': last.content if last else '',
                'last_message_at': last.created_at.isoformat() if last else None,
                'unread_count': unread,
            })

        conversations.sort(key=lambda x: x['last_message_at'] or '', reverse=True)
        return Response(conversations)


class UnreadCountView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        count = DirectMessage.objects.filter(recipient=request.user, is_read=False).count()
        return Response({'count': count})
