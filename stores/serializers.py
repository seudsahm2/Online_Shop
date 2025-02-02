from rest_framework import serializers
from .models import Category, Store, Product


class StoreListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields = ['id', 'name', 'city', 'zip_code']


class StoreDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields = [
            'id',
            'name',
            'description',
            'street',
            'city',
            'state',
            'zip_code',
            'website',
            'phone_number',
            'logo_image',
            'email',
            'active',
        ]


class ProductListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'category', 'image']

