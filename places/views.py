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

class CommentListView(ListCreateAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class CommentDetailView(RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class CategoryListView(ListAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CategoryDetailView(RetrieveAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

# class FriendListView(ListAPIView):
#     permission_classes = (IsAuthenticatedOrReadOnly, )
#     queryset = Friend.objects.all()
#     serializer_class = FriendSerializer

# class FriendDetailView(RetrieveAPIView):
#     permission_classes = (IsAuthenticatedOrReadOnly, )
#     queryset = Friend.objects.all()
#     serializer_class = FriendSerializer
    