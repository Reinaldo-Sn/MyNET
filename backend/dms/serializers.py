from rest_framework import serializers
from .models import DirectMessage


class DirectMessageSerializer(serializers.ModelSerializer):
    sender_username = serializers.SerializerMethodField()
    sender_avatar = serializers.SerializerMethodField()

    class Meta:
        model = DirectMessage
        fields = ['id', 'sender', 'recipient', 'content', 'is_read', 'created_at', 'sender_username', 'sender_avatar']
        read_only_fields = ['id', 'sender', 'is_read', 'created_at']

    def get_sender_username(self, obj):
        return obj.sender.username

    def get_sender_avatar(self, obj):
        if not (obj.sender.avatar and obj.sender.avatar.name):
            return None
        request = self.context.get('request')
        url = obj.sender.avatar.url
        return request.build_absolute_uri(url) if request else url
