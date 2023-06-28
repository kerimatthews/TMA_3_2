from django.urls import path
from . import views
from django.contrib import admin
from carousel.views import my_pics

urlpatterns = [
    path('', views.index, name='index'),
    path('carousel/', my_pics),
]
