from django.urls import path
from . import views

urlpatterns = [
    path('', views.StoreListAPIView.as_view(), name="store_list"),
    path('<int:id>/', views.StoreDetailAPIView.as_view(), name="store_detail"),
    path('create/', views.StoreCreateAPIView.as_view(), name="create_store"),
    path('update/<int:id>/', views.StoreRetrieveUpdateAPIView.as_view(),
         name="update_store"),
    path('products/', views.ProductListAPIView.as_view(), name="products"),
    path('products/<int:id>/', views.ProductDetailAPIView.as_view(),
         name="product_detail"),
    path('categories/', views.CategoryListAPIView.as_view(), name="category_list"),
    path('categories/<int:id>/', views.CategoryDetailAPIView.as_view(),
         name="product_detail"),
]
