from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from User.models import User
from User.serializers import UserSerializer


class LoginView(APIView):
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        phone = request.data.get('phone')
        password = request.data.get('password')
        if (email or phone) and password:
            try:
                if email:
                    user = User.objects.get(email=email)
                else:
                    user = User.objects.get(phone=phone)
            except User.DoesNotExist:
                return Response({"detail": "No active account found with the given credentials"}, status=401)
            if user.check_password(password):
                refresh = RefreshToken.for_user(user)
                data = {
                    'access': str(refresh.access_token),
                    'refresh': str(refresh),
                    'user': UserSerializer(user).data
                }
                return Response(data, status=200)
        elif not email and not phone:
            return Response({"detail": "Email or phone number is required"}, status=400)
        elif not password:
            return Response({"detail": "Password is required"}, status=400)
        return Response({"detail": "No active account found with the given credentials"}, status=401)


class RegisterView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            refresh = RefreshToken.for_user(serializer.instance)
            data = {
                'access': str(refresh.access_token),
                'refresh': str(refresh),
                'user': serializer.data
            }
            return Response(data, status=201)
        return Response(serializer.errors, status=400)
