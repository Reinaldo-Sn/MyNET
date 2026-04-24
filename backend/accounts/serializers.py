from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
import uuid
from .models import User


class SingleSessionTokenSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['session_key'] = str(user.session_key)
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        self.user.session_key = uuid.uuid4()
        self.user.save(update_fields=['session_key'])
        token = self.get_token(self.user)
        data['access'] = str(token.access_token)
        data['refresh'] = str(token)
        return data


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])

    class Meta:
        model = User
        fields = ('username', 'email', 'password')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user


class ProfileSerializer(serializers.ModelSerializer):
    followers_count = serializers.SerializerMethodField()
    following_count = serializers.SerializerMethodField()
    is_following = serializers.SerializerMethodField()
    current_password = serializers.CharField(write_only=True, required=False, allow_blank=True)
    new_password = serializers.CharField(write_only=True, required=False, allow_blank=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'display_name', 'bio', 'avatar', 'banner',
                  'followers_count', 'following_count', 'is_following',
                  'current_password', 'new_password')
        read_only_fields = ('id', 'username', 'email')

    def get_followers_count(self, obj):
        if hasattr(obj, 'followers_count_ann'):
            return obj.followers_count_ann
        return obj.followers.count()

    def get_following_count(self, obj):
        if hasattr(obj, 'following_count_ann'):
            return obj.following_count_ann
        return obj.following.count()

    def get_is_following(self, obj):
        if hasattr(obj, 'is_following_ann'):
            return obj.is_following_ann
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.followers.filter(follower=request.user).exists()
        return False

    def validate_new_password(self, value):
        if value:
            validate_password(value)
        return value

    def validate(self, attrs):
        current_password = attrs.get('current_password', '')
        new_password = attrs.get('new_password', '')
        if new_password:
            if not current_password:
                raise serializers.ValidationError({'current_password': 'Informe a senha atual.'})
            if not self.instance.check_password(current_password):
                raise serializers.ValidationError({'current_password': 'Senha atual incorreta.'})
        return attrs

    def update(self, instance, validated_data):
        validated_data.pop('current_password', None)
        new_password = validated_data.pop('new_password', None)
        instance = super().update(instance, validated_data)
        if new_password:
            instance.set_password(new_password)
            instance.save()
        return instance
