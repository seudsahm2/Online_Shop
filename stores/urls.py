from django.urls import path
from . import views

urlpatterns = [
    path('', views.StoreListView.as_view(), name="store_list")
]
