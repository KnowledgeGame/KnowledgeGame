# Generated by Django 5.0.2 on 2024-03-12 04:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('subject', '0003_rename_idcourse_subject_namecourse'),
    ]

    operations = [
        migrations.RenameField(
            model_name='subject',
            old_name='nameCourse',
            new_name='idCourse',
        ),
    ]
