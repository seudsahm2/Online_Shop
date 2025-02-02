from django.urls import path
from . import views

urlpatterns = [
    path('', views.StoreListView.as_view(), name="store_list"),
    path('<int:id>/', views.StoreDetailView.as_view(), name="store_detail"),
    path('create/', views.StoreCreateView.as_view(), name="create_store"),
    path('products/', views.ProductListView.as_view(), name="products"),
    path('products/<int:id>/', views.ProductDetailView.as_view(),
         name="product_detail"),
    path('categories/', views.CategoryListView.as_view(), name="category_list"),
    path('categories/<int:id>/', views.CategoryDetailView.as_view(),
         name="product_detail"),
]
