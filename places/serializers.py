# pylint: disable=no-member,arguments-differ
from rest_framework import serializers
from .models import Place, Comment, Category
from django.contrib.auth import get_user_model
User = get_user_model()


class UserSerializer(serializers.ModelSerializer): # This user serializer is used to populate a nested owner on a post or comment

    class Meta:
        model = User
        fields = ('id', 'username', 'profile_image')

class NestedPlaceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Place
        fields = ('id', 'name', 'postcode', 'image')


class CategorySerializer(serializers.ModelSerializer):

    places = NestedPlaceSerializer(many=True)


    class Meta:
        model = Category
        fields = ('id', 'name', 'places')


class CommentSerializer(serializers.ModelSerializer): # This comment serializer does the same for comments on a post, serializes and populates them, if we didnt do tbhis we would just see a list of comment IDs returned on a post, instead of the full objects in a list.

    class Meta:
        model = Comment
        fields = ('id', 'text', 'places', 'owner')

class PopulatedCommentSerializer(CommentSerializer): # We use this on comment population to show the owner as a seraoilized nested field. note how this is inherting directly from the comment serializer above, and there for has all its meta class and feilds infromation automatically added

    owner = UserSerializer()

class PlaceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Place
        fields = ('id', 'owner', 'name', 'postcode', 'image', 'description', 'visited', 'comments', 'categories')
        extra_kwargs = {'comments': {'required': False}, 'categories': {'required': False}} # this lines tell the serializer that sometimes, comments wont be there, and thats fine. This is important otherwise when we create a post. it would say we need to make comments along with it. Again this is a USE CASE idea. Maybe you have a nested field that you would want to be required on creation. This just doesn't make sense for comments. we would want to make a post, and then allow users to make comments on that post


class PopulatedPlaceSerializer(PlaceSerializer): # again same idea as with the populated comment serilaizer, it inherits from Post Serializer and gets all the meta class and fields from that

    owner = UserSerializer() # any user on the post will be seralized and nested(like .populate() in mongoose)
    comments = PopulatedCommentSerializer(many=True)
    categories = CategorySerializer(many=True)

class PopulatedCategorySerializer(serializers.ModelSerializer):

    places = NestedPlaceSerializer(many=True)
