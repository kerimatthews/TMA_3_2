from django.contrib import admin
from .models import pic_model

class picAdmin(admin.ModelAdmin):
    list_display = ["num","pic_name", "caption", "image"] # new

# Register your models here.
admin.site.register(pic_model, picAdmin)