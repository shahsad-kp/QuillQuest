from rest_framework.relations import PrimaryKeyRelatedField
from rest_framework.serializers import ModelSerializer, CharField, DateField, SerializerMethodField, ManyRelatedField

from Article.models import Category
from User.models import User


class UserSerializer(ModelSerializer):
    firstName = CharField(source='first_name')
    lastName = CharField(source='last_name')
    dateOfBirth = DateField(source='date_of_birth')
    setupCompleted = SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = [
            'id',
            'firstName',
            'lastName',
            'dateOfBirth',
            'email',
            'phone',
            'password',
            'setupCompleted',
        ]
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(  # Assign the newly created UserData instance to the user_data field
            **validated_data
        )
        user.set_password(password)
        user.save()
        return user

    def get_setupCompleted(self, obj: 'User'):
        return obj.interested_categories.all().exists()


class InterestedCategorySerializer(ModelSerializer):
    class Meta:
        model = 'Article.Category'
        fields = ['id', 'title']


class UpdateInterestsSerializer(ModelSerializer):
    categories = ManyRelatedField(
        source='interested_categories',
        required=True,
        child_relation=PrimaryKeyRelatedField(queryset=Category.objects.all())
    )

    class Meta:
        model = User
        fields = ['categories']
