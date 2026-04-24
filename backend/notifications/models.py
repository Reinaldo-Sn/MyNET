from django.db import models
from django.conf import settings

class Notification(models.Model):
    FOLLOW = 'follow'
    LIKE = 'like'
    COMMENT_REPLY = 'comment_reply'
    POKE = 'poke'
    MENTION = 'mention'
    TYPE_CHOICES = [(FOLLOW, 'Follow'), (LIKE, 'Like'), (COMMENT_REPLY, 'Comment Reply'), (POKE, 'Poke'), (MENTION, 'Mention')]

    recipient = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='notifications')
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='sent_notifications')
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    post = models.ForeignKey('posts.Post', null=True, blank=True, on_delete=models.CASCADE)
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
