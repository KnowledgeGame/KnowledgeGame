from django.db import models

# Create your models here.
class Course(models.Model):
    idCourse = models.AutoField(primary_key=True)
    nameCourse = models.CharField(max_length=255)
    describeCourse = models.CharField(max_length=255)
    
    def __str__(self):
        return self.nameCourse
    

