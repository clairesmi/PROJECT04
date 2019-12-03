from django.db import models
from jwt_auth.models import User
from cloudinary.models import CloudinaryField


class Category(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Place(models.Model):
    name = models.CharField(max_length=50, unique=True)
    postcode = models.CharField(max_length=10)
    image = models.CharField(max_length=500, blank=True)
    description = models.CharField(max_length=100, blank=True)
    visited = models.BooleanField(default=False)
    categories = models.ManyToManyField(
        Category,
        related_name='places',
        blank=True # M2M field is a string so this needs to be blank
    )
    owner = models.ForeignKey(
        User,
        related_name='places',
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )

    def __str__(self):
        return self.name


# add related models later when testing is done
# set up comments and categories
class Comment(models.Model):
    text = models.TextField(max_length=1000, blank=True)
    places = models.ForeignKey(
        Place,
        related_name='comments',
        on_delete=models.CASCADE,
        null=True, #foreign key is an int so this needs to be null
        blank=True
    )
    owner = models.ForeignKey(
        User,
        related_name='comments',
        on_delete=models.CASCADE,
        null=True,
        blank=True

    )
    def __str__(self):
        return f'Comment {self.id} - {self.owner}'


# class Photo(models.Model):
#     image = CloudinaryField('image')

#     def __str__(self):
#         return {self.image}
