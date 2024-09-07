# Generated by Django 4.2.15 on 2024-09-06 19:17

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('property', '0005_alter_rentlease_next_payment_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='property',
            name='held_user',
            field=models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
    ]
