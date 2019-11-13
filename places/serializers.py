# # pylint: disable=no-member,arguments-differ
from rest_framework import serializers
from .models import Place, Comment, Category


class NestedPlaceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Place
        fields = ('id', 'name', 'postcode', 'image', 'description', 'visited', 'comments')

class NestedCategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = ('id', 'name')

class NestedCommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = ('id', 'text')


class CategorySerializer(serializers.ModelSerializer):

    places = NestedPlaceSerializer(many=True)

    class Meta:
        model = Category
        fields = ('id', 'name', 'places')

class CommentSerializer(serializers.ModelSerializer):

    places = NestedPlaceSerializer()

    class Meta:
        model = Comment
        fields = ('id', 'text', 'places')

class PlaceSerializer(serializers.ModelSerializer):

    comments = NestedCommentSerializer(many=True)
    categories = NestedCategorySerializer(many=True)

    class Meta:
        model = Place
        fields = ('id', 'name', 'postcode', 'image', 'description', 'visited', 'comments', 'categories')
