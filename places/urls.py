from django.urls import path
from .views import PlaceListView, PlaceDetailView, CategoryListView, CategoryDetailView


urlpatterns = [
    path('places', PlaceListView.as_view()),
    path('places/<int:pk>/', PlaceDetailView.as_view()),
    path('categories', CategoryListView.as_view()),
    path('categories/<int:pk>/', CategoryDetailView.as_view())
]
