# Generated by Django 5.1.5 on 2025-02-03 17:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stores', '0003_alter_store_phone_number'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='products/'),
        ),
        migrations.AlterField(
            model_name='store',
            name='logo_image',
            field=models.ImageField(blank=True, upload_to='logos/'),
        ),
    ]
