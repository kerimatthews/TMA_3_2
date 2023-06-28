from .models import pic_model
from django.template import loader
from django.http import HttpResponse


def my_pics(request):
  my_pics = pic_model.objects.all()
  template = loader.get_template('index.html')
  context = {
    'my_pics': my_pics,
  }
  return HttpResponse(template.render(context, request))

from django.shortcuts import render

# Create your views here.
def index(request):
    data = pic_model.objects.all()
    context = {
        'data' : data
    }
    return render(request,"display.html", context)