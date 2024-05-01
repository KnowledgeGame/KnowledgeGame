from django.db import models
from course.models import Course

# Create your models here.
class Subject(models.Model):
    idSubject = models.AutoField(primary_key=True)
    idCourse = models.ForeignKey(Course, on_delete=models.DO_NOTHING)
    nameSubject = models.CharField(max_length = 255)
    describeSubject = models.CharField(max_length = 255)

    def __str__(self):
        return self.nameSubject