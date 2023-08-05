from django.urls import path

from Article.views import ListCategoryView, ListMatchedArticlesView

urlpatterns = [
    path('categories/', ListCategoryView.as_view(), name='categories'),
    path('', ListMatchedArticlesView.as_view(), name='matched_articles'),
]
