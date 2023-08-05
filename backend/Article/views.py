from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny

from Article.models import Category
from Article.serializers import CategorySerializer


class ListCategoryView(ListAPIView):
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]
    queryset = Category.objects.all()
