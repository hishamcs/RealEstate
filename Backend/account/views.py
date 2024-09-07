from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from .serializers import AccountSerializer
from .models import Account

from rest_framework.pagination import PageNumberPagination


class UserRegistrationView(APIView):
    
    def post(self, request):
        serializer = AccountSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Account Created successfully...'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class UserListView(APIView):
    # permission_classes = [IsAdminUser]

    def get(self, request):
        users = Account.objects.filter(is_superuser=False)
        serializer = AccountSerializer(users, many=True)
        return Response(serializer.data)
    
    def patch(self, request):
        user_id = request.data.get('userId', None)
        if not user_id:
            return Response({'detail':'userId is required...'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user_id = int(user_id)
            user = get_object_or_404(Account, id=user_id)
            user.is_active = not user.is_active

            user.save()
            serializer = AccountSerializer(user)
            return Response(serializer.data)
        except ValueError:
            return Response({'detail':'userId must be an integer'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'detail':str(e)}, status=status.HTTP_404_NOT_FOUND)

    

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = AccountSerializer(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data
