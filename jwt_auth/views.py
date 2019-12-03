# pylint: disable=no-member,arguments-differ
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from django.conf import settings
import jwt
from .serializers import UserSerializer
from datetime import datetime, timedelta
User = get_user_model()

class RegisterView(APIView):

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Registration Successful'})
        return Response(serializer.errors, status=422)

        # Django doesn't set an expiry time for the token by default so you have to import packages
        # from datetime (as above) to get Auth in navbar to work properly IF USING THE SAME CODE FROM
        # AN AUTH FILE IN EXPRESS
        # date and time is set with the dt variable to 'now' and time delta is set to 1 day
        # (token expires after 1 day) This needs to be set in the main post function as well as the
        # 'if not user' part

class LoginView(APIView):


    def get_user(self, email):
        try:
            return User.objects.get(email=email)
        except User.DoesNotExist:
            raise PermissionDenied({'message': 'Invalid Credentials'})
    def post(self, request):

        email = request.data.get('email')
        password = request.data.get('password')

        user = self.get_user(email)

        dt = datetime.now() + timedelta(days=1)
        token = jwt.encode({'sub': user.id, 'exp': int(dt.strftime('%s'))}, settings.SECRET_KEY, algorithm='HS256')

        if not user.check_password(password):
            raise PermissionDenied({'message': 'Invalid Credentials'})

        token = jwt.encode({'sub': user.id, 'exp': int(dt.strftime('%s'))}, settings.SECRET_KEY, algorithm='HS256')
        return Response({'token': token, 'message': f'Hello again {user.username}'})
