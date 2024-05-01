
from .views import SubjectAPIView
from django.urls import path


urlpatterns = [
    path('subject/', SubjectAPIView.as_view(), name='SubjectAPIView'),
    path('SubjectAPIView/delete/<int:id>/', SubjectAPIView.as_view(), name='SubjectAPIView-delete'),

]