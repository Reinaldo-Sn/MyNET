from django.contrib.auth.models import AbstractUser
from django.db import models

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

    def __str__(self):
        # Exibe o username no painel admin e no terminal
        return self.username
