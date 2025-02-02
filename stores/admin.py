from django.contrib import admin
from .models import Category, Store, Product
# Register your models here.


class ProductInline(admin.TabularInline):
    model = Product
    extra = 3


@admin.register(Store)
class StoreAdmin(admin.ModelAdmin):
    list_display = ['name', 'city', 'state', 'active']
    search_fields = ['name', 'city']
    list_filter = ['active']
    inlines = [ProductInline]


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'description']
    search_fields = ['name']


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'store', 'category', 'price',
                    'stock_quantity', 'available']
    search_fields = ['name', 'store', 'category']
    list_filter = ['available']
