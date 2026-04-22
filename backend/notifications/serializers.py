from rest_framework import serializers
from .models import Notification

class NotificationSerializer(serializers.ModelSerializer):
    sender_display = serializers.SerializerMethodField()
    sender_id = serializers.IntegerField(source='sender.id')

    class Meta:
        model = Notification
        fields = ['id', 'type', 'sender_id', 'sender_display', 'post_id', 'created_at']

    def get_sender_display(self, obj):
        return obj.sender.display_name or obj.sender.username
