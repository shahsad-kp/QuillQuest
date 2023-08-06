from rest_framework.generics import ListAPIView
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import AllowAny, IsAuthenticated

from Article.models import Category, Article
from Article.serializers import CategorySerializer, ArticleSerializer, InterestedCategorySerializer


class ListCategoryView(ListAPIView):
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]
    queryset = Category.objects.all()


class ListMatchedArticlesView(ListAPIView):
    serializer_class = ArticleSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = LimitOffsetPagination
    page_size = 30

    def get_queryset(self):
        return Article.objects.filter(category__interested_users=self.request.user)


class GetInterestedCategoriesView(ListAPIView):
    serializer_class = InterestedCategorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Category.objects.filter(interested_users=self.request.user)
