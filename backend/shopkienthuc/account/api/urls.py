from rest_framework.routers import DefaultRouter
from .views import StudentAPIView,RegisterStudent,ProtectedView,StudentAPIViewByExpiry,TeachersAPIViewAll,CheckAccount
from django.urls import path

urlpatterns = [
    path('studentsAccount/', StudentAPIView.as_view(), name='student-list'),
    path('studentsAccount/delete/<int:idAccount>/', StudentAPIView.as_view(), name='student-delete'),
    path('studentsAccount/post_dang_ky', RegisterStudent.as_view(), name='register-student'),
    path('studentsAccount/protected/', ProtectedView.as_view(), name='protected-view'),
    path('studentAPIViewByExpiry/', StudentAPIViewByExpiry.as_view(), name='studentAPIViewByExpiry'),
    path('teachersAPIViewAll/', TeachersAPIViewAll.as_view(), name='teachersAPIViewAll'),
    path('teachersAPIViewAll/delete/<int:idAccount>/', TeachersAPIViewAll.as_view(), name='teacher-delete'),
    path('checkAccount/', CheckAccount.as_view(), name='checkAccount'),

    # Thêm các URL patterns khác nếu cần
]
