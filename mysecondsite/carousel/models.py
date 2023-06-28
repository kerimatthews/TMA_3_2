from django.db import models

class pic_model(models.Model):
  pic_name = models.CharField(max_length=255)
  caption = models.CharField(max_length=255)
  num= models.IntegerField()
  image=models.ImageField(upload_to='pics', null=True)

  def __str__(self):
    return f"{self.pic_name}"

