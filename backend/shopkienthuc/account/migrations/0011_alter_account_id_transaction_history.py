# Generated by Django 5.0.2 on 2024-04-24 05:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0010_alter_account_id_transaction_history'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='id_transaction_history',
            field=models.IntegerField(default=0, null=True),
        ),
    ]
