from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)

from .views import UserRegistrationView, UserListView

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='user_registration'),
    path('allusers/', UserListView.as_view(), name='all_user_list'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
