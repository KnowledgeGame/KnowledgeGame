
from .views import StatisticsAPIViewAll, StatisticStudents,StatisticTeachers
from django.urls import path

urlpatterns = [
    path('statisticsAPIViewAll/', StatisticsAPIViewAll.as_view(), name='statisticsAPIViewAll'),
    path('statisticStudents/', StatisticStudents.as_view(), name='statisticStudents'),
    path('statisticStudents/delete/<int:id>/', StatisticStudents.as_view(), name='statisticStudents-delete'),
    path('statisticTeachers/', StatisticTeachers.as_view(), name='statisticTeachers'),
    path('statisticTeachers/delete/<int:id>/', StatisticTeachers.as_view(), name='statisticTeachers-delete'),

    # Thêm các URL patterns khác nếu cần
]
