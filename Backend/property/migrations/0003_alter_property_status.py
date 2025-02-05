# Generated by Django 4.2.15 on 2024-09-04 13:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('property', '0002_property_cover_pic_alter_property_address_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='property',
            name='status',
            field=models.CharField(choices=[('available', 'Available'), ('sold', 'Sold'), ('rented', 'Rented'), ('leased', 'Leased'), ('unavailable', 'Unavailable')], default='available', max_length=12),
        ),
    ]
