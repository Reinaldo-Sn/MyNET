from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.contrib.auth import get_user_model
from django.utils import timezone
from .models import Poke
from .serializers import PokeSerializer
from notifications.models import Notification

User = get_user_model()
DAILY_LIMIT = 5


class PokeListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        today = timezone.now().date()
        received = Poke.objects.filter(receiver=request.user).select_related('sender')
        sent = Poke.objects.filter(sender=request.user).select_related('receiver')
        daily_used = Poke.objects.filter(sender=request.user, created_at__date=today).count()
        unseen_count = Poke.objects.filter(receiver=request.user, is_seen=False).count()

        ctx = {'request': request}
        return Response({
            'received': PokeSerializer(received, many=True, context=ctx).data,
            'sent': PokeSerializer(sent, many=True, context=ctx).data,
            'remaining_today': max(0, DAILY_LIMIT - daily_used),
            'unseen_count': unseen_count,
        })


class PokeMarkSeenView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        Poke.objects.filter(receiver=request.user, is_seen=False).update(is_seen=True)
        return Response({'detail': 'Marcadas como vistas.'})


class PokeSendView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, user_id):
        if request.user.id == user_id:
            return Response({'detail': 'Você não pode cutucar a si mesmo.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            receiver = User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return Response({'detail': 'Usuário não encontrado.'}, status=status.HTTP_404_NOT_FOUND)

        today = timezone.now().date()
        daily_used = Poke.objects.filter(sender=request.user, created_at__date=today).count()
        if daily_used >= DAILY_LIMIT:
            return Response(
                {'detail': f'Você já usou todas as {DAILY_LIMIT} cutucadas de hoje.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        already_poked = Poke.objects.filter(
            sender=request.user, receiver=receiver, created_at__date=today
        ).exists()
        if already_poked:
            return Response({'detail': 'Você já cutucou essa pessoa hoje.'}, status=status.HTTP_400_BAD_REQUEST)

        poke = Poke.objects.create(sender=request.user, receiver=receiver)
        Notification.objects.create(type='poke', sender=request.user, recipient=receiver)

        return Response(PokeSerializer(poke, context={'request': request}).data, status=status.HTTP_201_CREATED)
