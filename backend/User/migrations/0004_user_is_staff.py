# Generated by Django 4.2.4 on 2023-08-05 15:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('User', '0003_user_groups_user_is_superuser_user_user_permissions_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='is_staff',
            field=models.BooleanField(default=False),
        ),
    ]
