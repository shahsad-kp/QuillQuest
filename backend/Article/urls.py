from django.urls import path

from Article.views import ListCategoryView, ListMatchedArticlesView, GetInterestedCategoriesView

urlpatterns = [
    path('categories/', ListCategoryView.as_view(), name='categories'),
    path('', ListMatchedArticlesView.as_view(), name='matched_articles'),
    path('interested_categories/', GetInterestedCategoriesView.as_view(), name='interested_categories'),
]
