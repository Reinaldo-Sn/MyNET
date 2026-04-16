from django.db import models
from django.conf import settings

# settings.AUTH_USER_MODEL referencia o modelo de usuário customizado
# definido em accounts/models.py — evita importar diretamente a classe User


class Post(models.Model):
    # ForeignKey liga cada post a um usuário — se o usuário for deletado, os posts também são (CASCADE)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='posts')
    # Texto principal da postagem
    content = models.TextField()
    # Imagem opcional — salva na pasta media/posts/
    image = models.ImageField(upload_to='posts/', blank=True, null=True)
    # Preenchido automaticamente com a data/hora de criação
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        # Posts mais recentes aparecem primeiro por padrão
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.author.username} — {self.created_at:%d/%m/%Y}'


class Like(models.Model):
    # Usuário que curtiu
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='likes')
    # Post que foi curtido
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='likes')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        # Impede o mesmo usuário de curtir o mesmo post duas vezes
        unique_together = ('user', 'post')

    def __str__(self):
        return f'{self.user.username} curtiu {self.post.id}'


class Comment(models.Model):
    # Usuário que comentou
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='comments')
    # Post que recebeu o comentário — se o post for deletado, os comentários também são
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    # Texto do comentário
    content = models.TextField()
    # Preenchido automaticamente com a data/hora de criação
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        # Comentários aparecem do mais antigo para o mais recente
        ordering = ['created_at']

    def __str__(self):
        return f'{self.author.username} comentou no post {self.post.id}'
