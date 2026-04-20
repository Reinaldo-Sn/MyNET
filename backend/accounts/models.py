from django.contrib.auth.models import AbstractUser
from django.db import models
import cloudinary.uploader

# AbstractUser já traz os campos padrão do Django:
# username, email, password, first_name, last_name, is_active, is_staff, etc.
# Aqui estamos estendendo ele com campos extras do nosso projeto


class User(AbstractUser):
    # Texto de apresentação opcional do perfil
    display_name = models.CharField(max_length=100, blank=True, default='')
    bio = models.TextField(blank=True, default='')
    # Foto de perfil — salva na pasta media/avatars/ — não é obrigatória
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    banner = models.ImageField(upload_to='banners/', blank=True, null=True)
    # Preenchido automaticamente com a data/hora em que a conta foi criada
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if self.pk:
            old = User.objects.filter(pk=self.pk).values('avatar', 'banner').first()
            if old:
                self._delete_if_changed('avatar', old['avatar'])
                self._delete_if_changed('banner', old['banner'])
        super().save(*args, **kwargs)

    def _delete_if_changed(self, field, old_value):
        new_value = getattr(self, field)
        if old_value and str(new_value) != str(old_value):
            public_id = old_value.rsplit('.', 1)[0]
            try:
                cloudinary.uploader.destroy(public_id)
            except Exception:
                pass

    def __str__(self):
        return self.username
