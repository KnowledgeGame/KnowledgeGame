# Generated by Django 5.0.2 on 2024-04-19 08:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('statistic', '0003_alter_statistic_time'),
    ]

    operations = [
        migrations.AddField(
            model_name='statistic',
            name='position',
            field=models.CharField(default='student', max_length=255),
        ),
    ]
