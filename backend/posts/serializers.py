from rest_framework import serializers
from .models import Post, Comment

class PostSerializer(serializers.ModelSerializer):
    author_username = serializers.SerializerMethodField()
    author_avatar = serializers.SerializerMethodField()
    likes_count = serializers.SerializerMethodField()
    comments_count = serializers.SerializerMethodField()
    is_liked = serializers.SerializerMethodField()
    reposts_count = serializers.SerializerMethodField()
    is_reposted = serializers.SerializerMethodField()
    repost_of = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'author', 'author_username', 'author_avatar', 'content', 'image', 'gif_url',
                  'likes_count', 'comments_count', 'is_liked',
                  'reposts_count', 'is_reposted', 'repost_of', 'created_at']
        read_only_fields = ['id', 'author', 'created_at']

    def get_author_username(self, obj):
        return obj.author.display_name or obj.author.username

    def get_author_avatar(self, obj):
        request = self.context.get('request')
        if obj.author.avatar:
            url = obj.author.avatar.url
            return request.build_absolute_uri(url) if request else url
        return None

    def get_likes_count(self, obj):
        if hasattr(obj, 'likes_count_ann'):
            return obj.likes_count_ann
        return obj.likes.count()

    def get_comments_count(self, obj):
        if hasattr(obj, 'comments_count_ann'):
            return obj.comments_count_ann
        return obj.comments.filter(parent=None).count()

    def get_is_liked(self, obj):
        if hasattr(obj, 'is_liked_ann'):
            return obj.is_liked_ann
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.likes.filter(user=request.user).exists()
        return False

    def get_reposts_count(self, obj):
        if hasattr(obj, 'reposts_count_ann'):
            return obj.reposts_count_ann
        return obj.reposts.count()

    def get_is_reposted(self, obj):
        if hasattr(obj, 'is_reposted_ann'):
            return obj.is_reposted_ann
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.reposts.filter(author=request.user).exists()
        return False

    def get_repost_of(self, obj):
        if not obj.repost_of_id:
            return None
        return PostSerializer(obj.repost_of, context=self.context).data


class ReplySerializer(serializers.ModelSerializer):
    author_username = serializers.SerializerMethodField()
    author_avatar = serializers.SerializerMethodField()
    likes_count = serializers.SerializerMethodField()
    is_liked = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ['id', 'author', 'author_username', 'author_avatar', 'content', 'parent',
                  'likes_count', 'is_liked', 'created_at']
        read_only_fields = ['id', 'author', 'created_at']

    def get_author_username(self, obj):
        return obj.author.display_name or obj.author.username

    def get_author_avatar(self, obj):
        request = self.context.get('request')
        if obj.author.avatar and obj.author.avatar.name:
            url = obj.author.avatar.url
            return request.build_absolute_uri(url) if request else url
        return None

    def get_likes_count(self, obj):
        if hasattr(obj, 'likes_count_ann'):
            return obj.likes_count_ann
        return obj.likes.count()

    def get_is_liked(self, obj):
        if hasattr(obj, 'is_liked_ann'):
            return obj.is_liked_ann
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.likes.filter(user=request.user).exists()
        return False


class CommentSerializer(serializers.ModelSerializer):
    author_username = serializers.SerializerMethodField()
    author_avatar = serializers.SerializerMethodField()
    replies = ReplySerializer(many=True, read_only=True)
    likes_count = serializers.SerializerMethodField()
    is_liked = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ['id', 'author', 'author_username', 'author_avatar', 'content', 'parent',
                  'replies', 'likes_count', 'is_liked', 'created_at']
        read_only_fields = ['id', 'author', 'created_at']

    def get_author_username(self, obj):
        return obj.author.display_name or obj.author.username

    def get_author_avatar(self, obj):
        request = self.context.get('request')
        if obj.author.avatar and obj.author.avatar.name:
            url = obj.author.avatar.url
            return request.build_absolute_uri(url) if request else url
        return None

    def get_likes_count(self, obj):
        if hasattr(obj, 'likes_count_ann'):
            return obj.likes_count_ann
        return obj.likes.count()

    def get_is_liked(self, obj):
        if hasattr(obj, 'is_liked_ann'):
            return obj.is_liked_ann
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.likes.filter(user=request.user).exists()
        return False
