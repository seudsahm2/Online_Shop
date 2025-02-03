from rest_framework import serializers
from .models import Category, Store, Product
from rest_framework.reverse import reverse


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
    absolute_url = serializers.SerializerMethodField()

    class Meta:
        model = Store
        fields = ['id', 'name', 'city', 'zip_code', 'absolute_url']

    def get_absolute_url(self, obj):
        request = self.context.get('request')  # ✅ Get request context
        if request:
            url = reverse('store-detail', args=[obj.pk])  # ✅ Generate URL
            full_url = request.build_absolute_uri(url)  # ✅ Absolute URL
            print(f"Generated URL for {obj.name}: {full_url}")  # ✅ Debugging
            return full_url
        return None  # ✅ Return None if request is missing


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
