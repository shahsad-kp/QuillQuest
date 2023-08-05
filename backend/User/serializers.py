from rest_framework.serializers import ModelSerializer, CharField, DateField

from User.models import User


class UserSerializer(ModelSerializer):
    firstName = CharField(source='first_name')
    lastName = CharField(source='last_name')
    dateOfBirth = DateField(source='date_of_birth')

    class Meta:
        model = User
        fields = [
            'id',
            'firstName',
            'lastName',
            'dateOfBirth',
            'email',
            'phone',
            'password'
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
