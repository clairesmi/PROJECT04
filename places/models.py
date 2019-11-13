from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Place(models.Model):
    name = models.CharField(max_length=50)
    postcode = models.CharField(max_length=10)
    image = models.CharField(max_length=500)
    description = models.CharField(max_length=100)
    visited = models.BooleanField(default=False)
    categories = models.ManyToManyField(
        Category,
        related_name='places',
        blank=True # M2M field is a string so this needs to be blank
    )

    def __str__(self):
        return self.name


# add related models later when testing is done
# set up comments and categories
class Comment(models.Model):
    text = models.TextField(max_length=1000)
    places = models.ForeignKey(
        Place,
        related_name='comments',
        on_delete=models.DO_NOTHING,
        null=True #foreign key is an int so this needs to be null
    )
    def __str__(self):
        return self.text
