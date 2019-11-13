# pylint: disable=no-member
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly
# from rest_framework.response import Response
from .models import Place, Category, Comment
from .serializers import PlaceSerializer, CategorySerializer, CommentSerializer
# Create your views here.

class PlaceListView(ListCreateAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )
    queryset = Place.objects.all()
    serializer_class = PlaceSerializer

class PlaceDetailView(RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )
    queryset = Place.objects.all()
    serializer_class = PlaceSerializer

class CategoryListView(ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CategoryDetailView(RetrieveAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    