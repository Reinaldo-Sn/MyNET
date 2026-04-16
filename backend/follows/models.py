from django.db import models
from django.conf import settings

# Create your models here.

class Follow(models.Model):
    # Usuário que está seguindo alguém
    follower = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='following')
    # Usuário que está sendo seguido
    following = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='followers')
    # Preenchido automaticamente com a data/hora em que o follow aconteceu
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        # Impede o mesmo usuário de seguir a mesma pessoa duas vezes
        unique_together = ('follower', 'following')

    def __str__(self):
        return f'{self.follower.username} segue {self.following.username}'
