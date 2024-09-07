from django.db import models

from account.models import Account


class Property(models.Model):

    PROPERTY_TYPES = [
        ('buy', 'Buy'),
        ('lease', 'Lease'),
        ('rent', 'Rent')
    ]

    PROPERTY_STATUS_CHOICES = [
        ('available', 'Available'),
        ('sold', 'Sold'),
        ('rented', 'Rented'),
        ('leased', 'Leased'),
        ('unavailable', 'Unavailable')   
    ]

    title = models.CharField(max_length=50)
    address = models.CharField(max_length=150)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    bed_room = models.PositiveIntegerField()
    bath_room = models.PositiveIntegerField()
    description = models.TextField()
    sq_feet = models.PositiveIntegerField()
    listed_on = models.DateTimeField(auto_now_add=True)
    property_type = models.CharField(choices=PROPERTY_TYPES, max_length=10)
    status = models.CharField(max_length=12, choices=PROPERTY_STATUS_CHOICES, default='available')
    cover_pic = models.ImageField(upload_to='prop_imgs/', blank=True)
    held_user = models.ForeignKey(Account, on_delete=models.SET_NULL, null=True, blank=True, default=None)

    def __str__(self):
        return self.title
    
    class Meta:
        ordering = ['-listed_on']
    

class PropertyImage(models.Model):
    propty = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='images') 
    image = models.ImageField(upload_to='prop_imgs/')

    def __str__(self):
        return self.propty.title


class Transaction(models.Model):
    TRANSACTION_TYPE_CHOICES = [
        ('buy','Buy'),
        ('rent', 'Rent'),
        ('lease', 'Lease'),
    ]

    user = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='transactions')
    propty = models.ForeignKey(Property, on_delete=models.CASCADE)
    transaction_type = models.CharField(max_length=15,choices=TRANSACTION_TYPE_CHOICES)
    transaction_date = models.DateTimeField(auto_now_add=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)

class RentLease(models.Model):

    TYPE_CHOICES = [
        ('rent', 'Rent'),
        ('lease', 'Lease'),
    ]

    STATUS_CHOICES = [
        ('active', 'Active'),
        ('expired', 'Expired'),
    ]

    rental_type = models.CharField(max_length=10, choices=TYPE_CHOICES)
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    propty = models.ForeignKey(Property, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()
    deposit = models.DecimalField(max_digits=10, decimal_places=2)
    rent = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='active')
    next_payment_date = models.DateTimeField(blank=True, null=True)



class Maintenance(models.Model):
    MAINTENANCE_TYPE_CHOICES = [
        ('plumbing', 'Plumbing'),
        ('electrical', 'Electrical'),
        ('roofing', 'Roofing'),
        ('painting', 'Painting'),
        ('general_repairs', 'General Repairs'),
    ]

    MAINTENANCE_STATUS = [
        ('pending', 'Pending'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
    ]
    propty = models.ForeignKey(Property, on_delete=models.CASCADE)
    requested_date = models.DateTimeField(auto_now_add=True)
    maintenance_type = models.CharField(max_length=50, choices=MAINTENANCE_TYPE_CHOICES)
    description = models.TextField()
    status = models.CharField(max_length=50, choices=MAINTENANCE_STATUS, default='pending')
    resolved_date = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f'Maintenance for {self.propty.title}:{self.maintenance_type} --> {self.status}'



class Inventory(models.Model):
    propty = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='inventories')
    item_name = models.CharField(max_length=100)
    qty = models.PositiveIntegerField()

    def __str__(self):
        return f'{self.item_name}--->{self.propty.title}'