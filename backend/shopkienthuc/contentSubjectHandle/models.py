from django.db import models
from subject.models import Subject

class TitleContent(models.Model):
    idTitleContent = models.AutoField(primary_key=True)
    idSubject = models.ForeignKey(Subject, on_delete=models.DO_NOTHING)
    titleContent = models.CharField(max_length = 255)
    def __str__(self):
        return self.titleContent

class ContentSubject(models.Model):
    idContentSubject = models.AutoField(primary_key=True)
    idTitleContent = models.ForeignKey(TitleContent, on_delete=models.DO_NOTHING)
    idSubject = models.ForeignKey(Subject, on_delete=models.DO_NOTHING)
    nameContent = models.CharField(max_length=200)
    contentSubject = models.TextField()
    def __str__(self):
        return self.nameContent