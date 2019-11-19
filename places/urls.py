from django.urls import path
from .views import PlaceListView, PlaceDetailView, CategoryListView, CategoryDetailView, CommentListView, CommentDetailView


urlpatterns = [
    path('places', PlaceListView.as_view()),
    path('places/<int:pk>/', PlaceDetailView.as_view()),
    path('categories', CategoryListView.as_view()),
    path('categories/<int:pk>/', CategoryDetailView.as_view()),
    path('places/<int:pk>/comments/', CommentListView.as_view()),
    path('places/<int:pk>/comments/<int:comment_pk>/', CommentDetailView.as_view())
]
