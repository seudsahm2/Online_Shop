from django.shortcuts import render
from .serializers import StoreListSerializer
from rest_framework import generics
from .models import Store, Category, Product
# Create your views here.


class StoreListView(generics.ListAPIView):
    queryset = Store.objects.all()
    serializer_class = StoreListSerializer
