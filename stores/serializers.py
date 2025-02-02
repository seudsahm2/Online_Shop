from rest_framework import serializers
from .models import Category, Store, Product


class CategoryListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']


class CategoryDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'description']


class ProductListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'category', 'image']


class ProductDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            'id',
            'store',
            'category',
            'name',
            'image',
            'price',
            'stock_quantity',
            'description',
            'available'
        ]


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
