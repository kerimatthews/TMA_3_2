# Generated by Django 4.2.2 on 2023-06-12 03:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('carousel', '0002_pic_model_url'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='pic_model',
            name='url',
        ),
        migrations.AddField(
            model_name='pic_model',
            name='image',
            field=models.ImageField(null=True, upload_to='Pics/'),
        ),
    ]
