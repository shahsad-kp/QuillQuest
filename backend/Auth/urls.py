from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from Auth.views import LoginView, RegisterView, UpdatePassword

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='register'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('update-password/', UpdatePassword.as_view(), name='update_password'),
]
