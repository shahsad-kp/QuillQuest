from django.http import Http404
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from Article.models import Category, Article
from Article.paginations import ArticlePagination
from Article.permissions import ArticleOwnerShip
from Article.serializers import CategorySerializer, ArticleSerializer, InterestedCategorySerializer


class ListCategoryView(ListAPIView):
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]
    queryset = Category.objects.all()


class CreateArticle(CreateAPIView):
    serializer_class = ArticleSerializer
    permission_classes = [IsAuthenticated]
    queryset = Article.objects.all()

    def perform_create(self, serializer: ArticleSerializer):
        serializer.save(author=self.request.user)


class EditArticle(UpdateAPIView):
    serializer_class = ArticleSerializer
    permission_classes = [IsAuthenticated, ArticleOwnerShip]
    queryset = Article.objects.all()
    lookup_field = 'pk'

    def perform_update(self, serializer: ArticleSerializer):
        serializer.save(author=self.request.user)


class GetArticle(RetrieveAPIView):
    serializer_class = ArticleSerializer
    permission_classes = [IsAuthenticated]
    queryset = Article.objects.all()
    lookup_field = 'pk'


class ListMatchedArticlesView(ListAPIView):
    serializer_class = ArticleSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = ArticlePagination

    def get_queryset(self):
        category = self.request.query_params.get('category', None)
        if category:
            return Article.objects.filter(category__title=category)
        return Article.objects.filter(category__interested_users=self.request.user)


class GetInterestedCategoriesView(ListAPIView):
    serializer_class = InterestedCategorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Category.objects.filter(interested_users=self.request.user)


class LikeArticle(APIView):
    permission_classes = [IsAuthenticated]

    def get_article(self, pk):
        try:
            return Article.objects.get(pk=pk)
        except Article.DoesNotExist:
            raise Http404

    def get(self, request: Request, pk: int):
        article = self.get_article(pk)
        status = article.like(request.user)
        return Response(data={'liked': status}, status=200)


class BlockArticle(APIView):
    permission_classes = [IsAuthenticated]

    def get_article(self, pk):
        try:
            return Article.objects.get(pk=pk)
        except Article.DoesNotExist:
            raise Http404

    def get(self, request: Request, pk: int):
        article = self.get_article(pk)
        status = article.block(request.user)
        return Response(data={'blocked': status}, status=200)


class GetOwnedArticle(ListAPIView):
    serializer_class = ArticleSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = ArticlePagination

    def get_queryset(self):
        return Article.objects.filter(author=self.request.user)


class DeleteArticle(DestroyAPIView):
    permission_classes = [IsAuthenticated, ArticleOwnerShip]
    queryset = Article.objects.all()
    lookup_field = 'pk'
