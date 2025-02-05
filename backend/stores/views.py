from django.shortcuts import render
from rest_framework import generics
from rest_framework.viewsets import ModelViewSet
from .serializers import StoreListSerializer, StoreDetailSerializer, ProductListSerializer, ProductDetailSerializer, CategoryListSerializer, CategoryDetailSerializer
from .models import Store, Category, Product
# Create your views here.


# class CategoryListAPIView(generics.ListAPIView):
#     queryset = Category.objects.all()
#     serializer_class = CategoryListSerializer


# class CategoryDetailAPIView(generics.RetrieveAPIView):
#     lookup_field = "id"
#     queryset = Category.objects.all()
#     serializer_class = CategoryDetailSerializer


# class CategoryCreateAPIView(generics.CreateAPIView):
#     queryset = Category.objects.all()
#     serializer_class = CategoryDetailSerializer


# class CategoryRetrieveUpdateAPIView(generics.RetrieveUpdateAPIView):
#     lookup_field = "id"
#     queryset = Category.objects.all()
#     serializer_class = CategoryDetailSerializer


# class CategoryDestroyAPIView(generics.DestroyAPIView):
#     lookup_field = "id"
#     queryset = Category.objects.all()

class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategoryDetailSerializer


# class StoreListAPIView(generics.ListAPIView):
#     queryset = Store.objects.all()
#     serializer_class = StoreListSerializer


# class StoreDetailAPIView(generics.RetrieveAPIView):
#     lookup_field = "id"
#     queryset = Store.objects.all()
#     serializer_class = StoreDetailSerializer


# class StoreCreateAPIView(generics.CreateAPIView):
#     queryset = Store.objects.all()
#     serializer_class = StoreDetailSerializer


# class StoreRetrieveUpdateAPIView(generics.RetrieveUpdateAPIView):
#     lookup_field = "id"
#     queryset = Store.objects.all()
#     serializer_class = StoreDetailSerializer


# class StoreDestroyAPIView(generics.DestroyAPIView):
#     lookup_field = "id"
#     queryset = Store.objects.all()


class StoreViewSet(ModelViewSet):
    queryset = Store.objects.all()

    def get_serializer_class(self):
        if self.action == 'list':
            return StoreListSerializer
        return StoreDetailSerializer


# class ProductListAPIView(generics.ListAPIView):
#     queryset = Product.objects.all()
#     serializer_class = ProductListSerializer


# class ProductDetailAPIView(generics.RetrieveAPIView):
#     lookup_field = "id"
#     queryset = Product.objects.all()
#     serializer_class = ProductDetailSerializer


# class ProductCreateAPIView(generics.CreateAPIView):
#     queryset = Product.objects.all()
#     serializer_class = ProductDetailSerializer


# class ProductRetrieveUpdateAPIView(generics.RetrieveUpdateAPIView):
#     lookup_field = "id"
#     queryset = Product.objects.all()
#     serializer_class = ProductDetailSerializer


# class ProductDestroyAPIView(generics.DestroyAPIView):
#     lookup_field = "id"
#     queryset = Product.objects.all()

class ProductViewSet(ModelViewSet):
    # queryset = Product.objects.all()
    # serializer_class = ProductDetailSerializer

    def get_queryset(self):
        return Product.objects.filter(store_id=self.kwargs['store_pk'])
    
    def get_serializer_class(self):
        if self.action == 'list':
            return ProductListSerializer
        return ProductDetailSerializer
