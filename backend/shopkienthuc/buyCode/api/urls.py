from rest_framework.routers import DefaultRouter
from .views import MomoApiView
from django.urls import path

urlpatterns = [
    path('Momo/', MomoApiView.as_view(), name='payUrl'),
]
