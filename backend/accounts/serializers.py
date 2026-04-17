from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import User

# Serializer de cadastro
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])

    class Meta:
        model = User
        fields = ('username', 'email', 'password')

    # Cria o usuário com senha criptografada
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

# Serializer de perfil
class ProfileSerializer(serializers.ModelSerializer):
    followers_count = serializers.SerializerMethodField()
    following_count = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'bio', 'avatar', 'followers_count', 'following_count')
        read_only_fields = ('id', 'username', 'email')

    # Retorna quantidade de seguidores
    def get_followers_count(self, obj):
        return obj.followers.count()

    # Retorna quantidade de usuários que segue
    def get_following_count(self, obj):
        return obj.following.count()
