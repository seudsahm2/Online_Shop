from rest_framework import serializers
from .models import Category, Store, Product

class StoreListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields = ['id','name','city','zip_code']
        