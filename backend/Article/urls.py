from django.urls import path

from Article.views import ListCategoryView, ListMatchedArticlesView, GetInterestedCategoriesView, LikeArticle, \
    BlockArticle, GetArticle, CreateArticle, EditArticle, GetOwnedArticle

urlpatterns = [
    path('categories/', ListCategoryView.as_view(), name='categories'),
    path('', ListMatchedArticlesView.as_view(), name='matched_articles'),
    path('interested_categories/', GetInterestedCategoriesView.as_view(), name='interested_categories'),
    path('<int:pk>/like/', LikeArticle.as_view(), name='like_article'),
    path('<int:pk>/block/', BlockArticle.as_view(), name='block_article'),
    path('<int:pk>/', GetArticle.as_view(), name='article_view'),
    path('create/', CreateArticle.as_view(), name='create_article'),
    path('<int:pk>/update/', EditArticle.as_view(), name='update_article'),
    path('owned/', GetOwnedArticle.as_view(), name='owned_article'),
]
