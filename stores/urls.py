from django.urls import path
from . import views

urlpatterns = [
    path('', views.StoreListAPIView.as_view(), name="store_list"),
    path('<int:id>/', views.StoreDetailAPIView.as_view(), name="store_detail"),
    path('create/', views.StoreCreateAPIView.as_view(), name="create_store"),
    path('update/<int:id>/', views.StoreRetrieveUpdateAPIView.as_view(),
         name="update_store"),
    path('delete/<int:id>/', views.StoreDestroyAPIView.as_view(), name="delete_store"),

    path('products/', views.ProductListAPIView.as_view(), name="products"),
    path('products/<int:id>/', views.ProductDetailAPIView.as_view(),
         name="product_detail"),
    path('products/create/', views.ProductCreateAPIView.as_view(),
         name="create_product"),
    path('products/update/<int:id>/', views.ProductRetrieveUpdateAPIView.as_view(),
         name="update_product"),
    path('products/delete/<int:id>/',
         views.ProductDestroyAPIView.as_view(), name="delete_product"),

    path('categories/', views.CategoryListAPIView.as_view(), name="category_list"),
    path('categories/<int:id>/', views.CategoryDetailAPIView.as_view(),
         name="product_detail"),
    path('categories/create/', views.CategoryCreateAPIView.as_view(),
         name="create_product"),
    path('categories/update/<int:id>/', views.CategoryRetrieveUpdateAPIView.as_view(),
         name="update_product"),
    path('categories/delete/<int:id>/',
         views.CategoryDestroyAPIView.as_view(), name="delete_product"),
]
