# # pylint: disable=no-member,arguments-differ
from rest_framework import serializers
from .models import Place

class PlaceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Place
        fields = ('id', 'name', 'postcode', 'image', 'description', 'visited')
