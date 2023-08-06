from rest_framework import serializers

from .models import Article, Category


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class AuthorSerializer(serializers.ModelSerializer):
    firstName = serializers.CharField(source='first_name')
    lastName = serializers.CharField(source='last_name')

    class Meta:
        model = 'User.User'
        fields = ('firstName', 'lastName', 'email')


class ArticleSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    author = AuthorSerializer()

    class Meta:
        model = Article
        fields = ('title', 'content', 'category', 'author', 'image', 'tags', 'created_at', 'updated_at')


class InterestedCategorySerializer(serializers.ModelSerializer):
    articles = ArticleSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = ('id', 'title', 'articles')
