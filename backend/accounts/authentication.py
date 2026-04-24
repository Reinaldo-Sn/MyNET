from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework_simplejwt.settings import api_settings


class SingleSessionJWTAuthentication(JWTAuthentication):
    def get_user(self, validated_token):
        user = super().get_user(validated_token)
        token_session_key = validated_token.get('session_key')
        if token_session_key and str(user.session_key) != token_session_key:
            raise InvalidToken('Sessão encerrada. Faça login novamente.')
        return user
