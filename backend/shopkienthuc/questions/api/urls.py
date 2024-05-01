from django.urls import path
from .views import QuestionsSubjectList,QuestionsSubjectAll

urlpatterns = [

    path('questionsSubjectList/', QuestionsSubjectList.as_view(), name='QuestionsSubjectList-list'),
    path('questionsSubjectAll/', QuestionsSubjectAll.as_view(), name='QuestionsSubjectAll'),
    path('questionsSubjectAll/delete/<int:id>/', QuestionsSubjectAll.as_view(), name='QuestionsSubjectAll-delete'),


]
