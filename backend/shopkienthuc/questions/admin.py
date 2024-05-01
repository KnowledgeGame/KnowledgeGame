from django.contrib import admin
from .models import Questions

class QuestionAdmin(admin.ModelAdmin):
    list_display = [
'idQuestion',
'idContentSubject',
'contentQuestion',
'levelOfDifficult',
'answerA',
'answerB',
'answerC',
'answerD',
'correctAnswer',
'explanation']
# Register your models here.
admin.site.register(Questions,QuestionAdmin)