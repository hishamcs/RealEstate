from rest_framework import serializers
from django.core.validators import RegexValidator,MinLengthValidator, MaxLengthValidator
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ValidationError


from .models import Account
from property.models import Property

class AccountSerializer(serializers.ModelSerializer):
    count_of_property_held = serializers.SerializerMethodField()
    email = serializers.EmailField(required=True)
    password = serializers.CharField(
        write_only=True,
        required=True,
        validators=[
            RegexValidator(
                regex=r'^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$',
                message='Password should be 8-20 characters and include at least 1 letter, 1 number, and 1 special character'
            )
        ]
    )
    username = serializers.CharField(
        required=True,
        validators=[
            MinLengthValidator(3, message='User name should be at least 3 characters.'),
            MaxLengthValidator(16, message='User name should be at most 16 characters.'),
            RegexValidator(
                regex=r'^[a-zA-Z]+$',
                message='User name should only contain alphanumeric characters'
            )
        ]
    )

    phone_number = serializers.CharField(
        required=True,
        # write_only=True,
        validators=[
            RegexValidator(
                regex=r'^\d{10}$',
                message='Please Enter a valid Mobile Number'
            )
        ]
    )

    class Meta:
        model = Account
        fields = ['id', 'email', 'username', 'is_superuser', 'password', 'phone_number', 'is_active', 'count_of_property_held']

    def get_count_of_property_held(self, obj):
        return Property.objects.filter(held_user=obj).count()

    def validate_email(self, value):
        if Account.objects.filter(email=value).exists():
            raise ValidationError('The Email is already used')
        return value
    
    def validate_phone_number(self, value):
        if Account.objects.filter(phone_number=value).exists():
            raise ValidationError('The Phone number is already used...')
        return value


    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)
    