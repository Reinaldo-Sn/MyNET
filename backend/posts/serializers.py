from rest_framework import serializers
from .models import Post, Comment

class PostSerializer(serializers.ModelSerializer):
    author_username = serializers.ReadOnlyField(source='author.username')
    author_avatar = serializers.SerializerMethodField()
    likes_count = serializers.SerializerMethodField()
    comments_count = serializers.SerializerMethodField()
    is_liked = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'author', 'author_username', 'author_avatar', 'content', 'image',
                  'likes_count', 'comments_count', 'is_liked', 'created_at']
        read_only_fields = ['id', 'author', 'created_at']

    def get_author_avatar(self, obj):
        request = self.context.get('request')
        if obj.author.avatar:
            url = obj.author.avatar.url
            return request.build_absolute_uri(url) if request else url
        return None

    def get_likes_count(self, obj):
        return obj.likes.count()

    def get_comments_count(self, obj):
        return obj.comments.count()

    def get_is_liked(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.likes.filter(user=request.user).exists()
        return False
    
class CommentSerializer(serializers.ModelSerializer):
    author_username = serializers.ReadOnlyField(source='author.username')
    author_avatar = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ['id', 'author', 'author_username', 'author_avatar', 'content', 'created_at']
        read_only_fields = ['id', 'author', 'created_at']

    def get_author_avatar(self, obj):
        request = self.context.get('request')
        if obj.author.avatar:
            url = obj.author.avatar.url
            return request.build_absolute_uri(url) if request else url
        return None
