from rest_framework import serializers

from User.serializers import AuthorSerializer
from .models import Article, Category


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class ArticleSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    author = AuthorSerializer()
    dateCreated = serializers.DateTimeField(source='created_at')
    dateUpdated = serializers.DateTimeField(source='updated_at')
    liked = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Article
        fields = ('id','title', 'content', 'category', 'author', 'image', 'tags', 'dateCreated', 'dateUpdated', 'liked')

    def get_liked(self, obj: Article):
        try:
            user = self.context['request'].user
        except KeyError:
            return False
        return user in obj.likes.all()


class InterestedCategorySerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(max_length=50)
    articles = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ('id', 'title', 'articles')

    def get_articles(self, obj: Category):
        articles = Article.objects.filter(category=obj).all()
        serializer = ArticleSerializer(articles, many=True)
        return serializer.data
