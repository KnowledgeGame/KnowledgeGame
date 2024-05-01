from django.urls import path
from .views import CourseAPIView

urlpatterns = [
    path('course/', CourseAPIView.as_view(), name='course-list'),
    path('courses/delete/<int:idCourse>/', CourseAPIView.as_view(), name='course-list'),

]
