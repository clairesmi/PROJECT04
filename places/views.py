# pylint: disable=no-member
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView, RetrieveAPIView
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_204_NO_CONTENT, HTTP_401_UNAUTHORIZED
from .models import Place, Category, Comment
from .serializers import PlaceSerializer, CategorySerializer, CommentSerializer, PopulatedPlaceSerializer

# All related to image upload:
from django import forms
from django.http import HttpResponse
from cloudinary.forms import cl_init_js_callbacks
from .models import Photo
from .forms import PhotoForm

def upload(request):
    context=dict(backend_form=PhotoForm())

    if request.method == 'POST':
        form = PhotoForm(request.POST, request.FILES)
        context['posted'] = form.instance
        if form.is_valid():
            form.save()

    return render(request, 'upload.html', context)



class PlaceListView(APIView):

    # permission_classes = (IsAuthenticated, IsAuthenticatedOrReadOnly) #needs to be a tuple (comma at end)

    def get(self, _request):
        places = Place.objects.all()
        serialized_places = PopulatedPlaceSerializer(places, many=True)
        return Response(serialized_places.data)

    def post(self, request):
        request.data['owner'] = request.user.id
        place = PlaceSerializer(data=request.data)
        if place.is_valid():
            place.save()
            return Response(place.data, status=HTTP_201_CREATED)
        return Response(place.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

class PlaceDetailView(APIView):

    # permission_classes = (IsAuthenticated, )

    def get(self, _request, pk):
        place = Place.objects.get(pk=pk)
        serialized_place = PopulatedPlaceSerializer(place)
        return Response(serialized_place.data)

    def put(self, request, pk):
        request.data['owner'] = request.user.id
        place = Place.objects.get(pk=pk)
        updated_place = PlaceSerializer(place, data=request.data)
        if updated_place.is_valid():
            updated_place.save()
            return Response(updated_place.data)
        return Response(updated_place.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

    def delete(self, request, pk):
        place = Place.objects.get(pk=pk)
        place.delete()
        return Response(status=HTTP_204_NO_CONTENT)


class CommentListView(APIView):

    # permission_classes = (IsAuthenticated, )

    def post(self, request, pk):
        request.data['owner'] = request.user.id
        request.data['places'] = pk
        print(request.data)
        comment = CommentSerializer(data=request.data)
        print(comment.is_valid())
        if comment.is_valid():
            comment.save()
            print(comment.data)
            place = Place.objects.get(pk=pk)
            serialized_place = PopulatedPlaceSerializer(place)
            return Response(serialized_place.data)
        return Response(comment.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

class CommentDetailView(APIView):

    # permission_classes = (IsAuthenticated, )
    def delete(self, request, comment_pk, **kwargs):
        comment = Comment.objects.get(pk=comment_pk)
        if comment.owner.id != request.user.id:
            return Response(status=HTTP_401_UNAUTHORIZED)
        comment.delete()
        return Response(status=HTTP_204_NO_CONTENT)

class CategoryListView(APIView):
    # permission_classes = (IsAuthenticated, )

    def get(self, _request):
        categories = Category.objects.all()
        serialized_categories = CategorySerializer(categories, many=True)
        return Response(serialized_categories.data)

class CategoryDetailView(APIView):
    # permission_classes = (IsAuthenticated, )

    def get(self, _request, pk):
        category = Category.objects.get(pk=pk)
        serialized_category = CategorySerializer(category)
        return Response(serialized_category.data)
