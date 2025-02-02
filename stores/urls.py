from django.urls import path
from . import views

urlpatterns = [
    path('', views.StoreListView.as_view(), name="store_list"),
    path('<int:id>/', views.StoreDetailView.as_view(), name="store_detail"),
    path('products/', views.ProductListView.as_view(), name="products")
]
