from django.db import models
from contentSubjectHandle.models import ContentSubject

# Create your models here.
class Questions(models.Model):
    idQuestion = models.AutoField(primary_key=True)
    idContentSubject = models.ForeignKey(ContentSubject, on_delete=models.DO_NOTHING)
    contentQuestion = models.TextField()
    levelOfDifficult = models.CharField(max_length=200)
    answerA = models.TextField()
    answerB = models.TextField()
    answerC = models.TextField()
    answerD = models.TextField()
    correctAnswer = models.CharField(max_length=10)
    explanation = models.TextField()

    def __str__(self):
        return self.contentQuestion
