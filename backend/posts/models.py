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
    gif_url = models.URLField(blank=True, null=True)
    # Preenchido automaticamente com a data/hora de criação
    repost_of = models.ForeignKey(
        'self', null=True, blank=True,
        related_name='reposts', on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
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
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='comments')
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    parent = models.ForeignKey('self', null=True, blank=True, related_name='replies', on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        # Comentários aparecem do mais antigo para o mais recente
        ordering = ['created_at']

    def __str__(self):
        return f'{self.author.username} comentou no post {self.post.id}'


class CommentLike(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='comment_likes')
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, related_name='likes')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'comment')

    def __str__(self):
        return f'{self.user.username} curtiu comentário {self.comment.id}'
