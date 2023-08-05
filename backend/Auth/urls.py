from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from Auth.views import LoginView, RegisterView

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='register'),
    path('regresh/', TokenRefreshView.as_view(), name='token_refresh')
]