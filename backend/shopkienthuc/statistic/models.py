from django.db import models
from account.models import Account

import datetime
# Create your models here.
class Statistic(models.Model):
    idTransactionHistory = models.AutoField(primary_key=True)
    idAccount = models.ForeignKey(Account, on_delete=models.DO_NOTHING)
    position = models.CharField(max_length=255,default="Student")
    content = models.CharField(max_length=255)
    price = models.FloatField()
    time = models.DateField(default=datetime.datetime(2000, 11, 11))

    

