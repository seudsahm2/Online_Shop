from django.shortcuts import render
from .serializers import StoreListSerializer, StoreDetailSerializer, ProductListSerializer, ProductDetailSerializer, CategoryListSerializer, CategoryDetailSerializer
from rest_framework import generics
from .models import Store, Category, Product
# Create your views here.


class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategoryListSerializer


class CategoryDetailView(generics.RetrieveAPIView):
    lookup_field = "id"
    queryset = Category.objects.all()
    serializer_class = CategoryDetailSerializer


class StoreListView(generics.ListAPIView):
    queryset = Store.objects.all()
    serializer_class = StoreListSerializer


class StoreDetailView(generics.RetrieveAPIView):
    lookup_field = "id"
    queryset = Store.objects.all()
    serializer_class = StoreDetailSerializer


class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductListSerializer


class ProductDetailView(generics.RetrieveAPIView):
    lookup_field = "id"
    queryset = Product.objects.all()
    serializer_class = ProductDetailSerializer
