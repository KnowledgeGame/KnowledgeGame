# Generated by Django 5.0.2 on 2024-03-12 04:30

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('course', '0002_rename_describe_course_course_describecourse_and_more'),
        ('subject', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='subject',
            name='idCourse',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.DO_NOTHING, to='course.course'),
            preserve_default=False,
        ),
    ]
