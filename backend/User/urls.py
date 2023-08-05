from django.urls import path

from User.views import InterestCategoryView, UpdateInterestCategoryView

urlpatterns = [
    path('interests/', InterestCategoryView.as_view(), name='interested_categories'),
    path('interests/update/', UpdateInterestCategoryView.as_view(), name='update_interested_categories'),
]
