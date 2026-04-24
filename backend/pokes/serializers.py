from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Poke

User = get_user_model()


class PokeUserSerializer(serializers.ModelSerializer):
    display = serializers.SerializerMethodField()
    avatar = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'display', 'avatar']

    def get_display(self, obj):
        return obj.display_name or obj.username

    def get_avatar(self, obj):
        if not obj.avatar:
            return None
        try:
            url = obj.avatar.url
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(url)
            return url
        except Exception:
            return None


class PokeSerializer(serializers.ModelSerializer):
    sender = PokeUserSerializer(read_only=True)
    receiver = PokeUserSerializer(read_only=True)

    class Meta:
        model = Poke
        fields = ['id', 'sender', 'receiver', 'created_at', 'is_seen']
