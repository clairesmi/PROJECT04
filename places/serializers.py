# pylint: disable=no-member,arguments-differ
from rest_framework import serializers
from .models import Place, Comment, Category


class NestedPlaceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Place
        fields = ('id', 'name', 'postcode', 'image', 'description', 'visited')

class NestedCategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = ('id', 'name')

class NestedCommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = ('id', 'text')


# class FriendSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = Friend
#         fields = ('id', 'user')

class CategorySerializer(serializers.ModelSerializer):

    places = NestedPlaceSerializer(many=True)

    class Meta:
        model = Category
        fields = ('id', 'name', 'places')

class CommentSerializer(serializers.ModelSerializer):

    places = NestedPlaceSerializer()

    class Meta:
        model = Comment
        fields = ('id', 'text', 'places', 'user')

class PlaceSerializer(serializers.ModelSerializer):

    comments = NestedCommentSerializer(many=True, required=False)
    categories = NestedCategorySerializer(many=True)

    def create(self, data):
        categories_data = data.pop('categories')
        # comments_data = data.pop('comments')

        place = Place(**data)
        # station.comments = Comment.objects.get(**comments_data)
        categories = [Category.objects.get(**category_data) for category_data in categories_data]
        place.save()
        place.categories.set(categories)
        return place


    def update(self, place, data):

        categories_data = data.pop('categories')

        place.name = data.get('name', place.name)
        place.postcode = data.get('postcode', place.postcode)
        place.image = data.get('image', place.image)
        place.description = data.get('description', place.description)
        place.visited = data.get('visited', place.visited)

        categories = [Category.objects.get(**category_data) for category_data in categories_data]

        place.save()
        place.categories.set(categories)
        return place

    class Meta:
        model = Place
        fields = ('id', 'name', 'postcode', 'image', 'description', 'visited', 'comments', 'categories', 'users')
