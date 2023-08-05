from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models

from User.managers import AccountManager


class User(AbstractBaseUser, PermissionsMixin):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    date_of_birth = models.DateField(verbose_name='Date of birth')
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=10, unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'phone', 'date_of_birth']

    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    objects = AccountManager()

    def __str__(self):
        return self.email

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"
