from django.db import models


class Place(models.Model):
    name = models.CharField(max_length=50)
    postcode = models.CharField(max_length=10)
    image = models.CharField(max_length=500)
    description = models.CharField(max_length=100)
    visited = models.BooleanField(default=False)

    def __str__(self):
        return self.name


# add related models later when testing is done
