from django.contrib import admin
from .models import Place, Comment, Category, Photo

# Register your models here.
admin.site.register(Place)
admin.site.register(Comment)
admin.site.register(Category)
admin.site.register(Photo)
