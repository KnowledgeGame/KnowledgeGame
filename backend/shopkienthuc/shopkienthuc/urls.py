
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('course.api.urls')),
    path('api/', include('subject.api.urls')),
    path('api/', include('account.api.urls')),
    path('api/', include('contentSubjectHandle.api.urls')),
    path('api/', include('questions.api.urls')),
    path('api/', include('buyCode.api.urls')),
    path('api/', include('statistic.api.urls')),

]
