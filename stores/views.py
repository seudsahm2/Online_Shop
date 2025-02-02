from django.shortcuts import render
from .serializers import StoreListSerializer, StoreDetailSerializer
from rest_framework import generics
from .models import Store, Category, Product
# Create your views here.


class StoreListView(generics.ListAPIView):
    queryset = Store.objects.all()
    serializer_class = StoreListSerializer


class StoreDetailView(generics.RetrieveAPIView):
    lookup_field = "id"
    queryset = Store.objects.all()
    serializer_class = StoreDetailSerializer
