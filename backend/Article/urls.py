from django.urls import path

from Article.views import ListCategoryView

urlpatterns = [
    path('categories/', ListCategoryView.as_view(), name='categories'),
]
