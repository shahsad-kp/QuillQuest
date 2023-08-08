from rest_framework import serializers

from User.serializers import AuthorSerializer
from .models import Article, Category, Tag


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class ArticleSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    author = AuthorSerializer(read_only=True)
    categoryId = serializers.IntegerField(source='category.id', write_only=True)
    dateCreated = serializers.DateTimeField(source='created_at', read_only=True)
    dateUpdated = serializers.DateTimeField(source='updated_at', read_only=True)
    tags = serializers.SlugRelatedField(slug_field='title', many=True, read_only=True)
    postTags = serializers.JSONField(write_only=True)
    liked = serializers.SerializerMethodField(read_only=True)
    blocked = serializers.SerializerMethodField(read_only=True)
    noOfLikes = serializers.SerializerMethodField(read_only=True)
    noOfBlocks = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Article
        fields = (
            'id',
            'title',
            'content',
            'category',
            'categoryId',
            'author',
            'image',
            'tags',
            'postTags',
            'dateCreated',
            'dateUpdated',
            'liked',
            'blocked',
            'noOfLikes',
            'noOfBlocks',
        )

    def get_blocked(self, obj: Article):
        try:
            user = self.context['request'].user
        except KeyError:
            return False
        return user in obj.blocks.all()

    def get_liked(self, obj: Article):
        try:
            user = self.context['request'].user
        except KeyError:
            return False
        return user in obj.likes.all()

    def get_noOfLikes(self, obj: Article):
        return obj.likes.count()

    def get_noOfBlocks(self, obj: Article):
        return obj.blocks.count()

    def create(self, validated_data):
        category_id = validated_data.pop('category').get('id')
        category = Category.objects.get(pk=category_id)
        tags = validated_data.pop('postTags', [])
        article = Article.objects.create(category=category, **validated_data)
        for tag in tags:
            tag_obj, _ = Tag.objects.get_or_create(title=tag)
            article.tags.add(tag_obj)
        return article

    def update(self, instance, validated_data):
        category = validated_data.pop('category', None)
        if category:
            category = Category.objects.get(pk=category['id'])
            instance.category = category
        tags = validated_data.pop('postTags', [])
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        for tag in tags:
            tag_obj, _ = Tag.objects.get_or_create(title=tag)
            instance.tags.add(tag_obj)
        return instance


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
