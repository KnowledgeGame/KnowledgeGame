from django.db import models
import datetime
# Create your models here.
class Account(models.Model):
    idAccount = models.AutoField(primary_key=True)
    id_transaction_history = models.IntegerField(default=0,null=True)
    name = models.CharField(max_length=255)
    accountName = models.CharField(max_length=255,unique=True)
    emailAddress = models.CharField(max_length=255)
    position = models.CharField(max_length=255,default="Student")
    infringe = models.CharField(max_length=255,default="",null=True)
    password = models.CharField(max_length=255)
    expiry = models.DateTimeField(default=datetime.datetime(2000, 11, 11),null=True)

    def __str__(self):
        return self.name
    
class Student(Account):
    activationCode = models.CharField(max_length=255,default="",null=True)
    point = models.IntegerField(default=0)
    learningOutcomes = models.IntegerField(default=0)

    def check_activation_code(self, code):
        if self.id_transaction_history == code:
            return True
        else:
            return False
        
class Teacher(Account):
    degree = models.CharField(max_length=255)
    phoneNumber = models.CharField(max_length=255)
    bankAccountNumber = models.CharField(max_length=255)
    wage = models.CharField(max_length=255)

