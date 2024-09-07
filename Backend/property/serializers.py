import re
from rest_framework import serializers


from account.serializers import AccountSerializer
from .models import Property, PropertyImage, Transaction, Maintenance, Inventory
from account.models import Account


class PropertyImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyImage
        fields = ['id', 'image']

class PropertySerializer(serializers.ModelSerializer):
    images = PropertyImageSerializer(many=True, read_only=True)
    listed_on = serializers.DateTimeField(format="%d-%m-%Y", read_only=True)
    held_user = AccountSerializer(read_only=True)
    class Meta:
        model = Property
        fields = [
            'id', 'title', 'address', 'price', 'bed_room', 'bath_room',
            'description', 'sq_feet', 'listed_on', 'property_type', 'status',
            'cover_pic', 'images', 'held_user'
        ]

    def validate(self, data):
        if 'cover_pic' not in self.context['request'].FILES and not data.get('cover_pic'):
            raise serializers.ValidationError({'cover_pic':"Cover Picture is required"})
        return data

    def validate_title(self, value):
        pattern = r'^[A-Za-z0-9\s]{8,50}$'
        if not re.match(pattern, value):
            raise serializers.ValidationError("Title must be alphanumeric and between 8 to 50 characters.")
        return value
    
    def validate_address(self, value):
        if not value.strip():
            raise serializers.ValidationError("Address cannot be empty")
        return value
    
    def validate_description(self, value):
        if not value.strip():
            raise serializers.ValidationError("Description can't be empty")
        return value
    def validate_price(self, value):
        if value < 0:
            raise serializers.ValidationError("Price cannot be negative")
        return value
    def validate_sq_feet(self, value):
        if value < 0:
            raise serializers.ValidationError("Square feet can't be negative")
        return value
    
    def validate_bed_room(self, value):
        if value < 0:
            raise serializers.ValidationError("Number of bed rooms can't be negative")
        return value
    
    def validate_bath_room(self, value):
        if value < 0:
            raise serializers.ValidationError("Number of bath rooms can't be negative")
        return value
    

class TransactionInputSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=Account.objects.all())
    propty = serializers.PrimaryKeyRelatedField(queryset=Property.objects.all())

    class Meta:
        model = Transaction
        fields = ['id','user', 'propty','transaction_type','amount']

class TransactionOutputSerializer(serializers.ModelSerializer):
    user = AccountSerializer(read_only=True)
    propty = PropertySerializer(read_only=True)
    class Meta:
        model = Transaction
        fields = ['id','user', 'propty','transaction_type','amount']

class MaintenanceOutputSerializer(serializers.ModelSerializer):
    propty = PropertySerializer(read_only=True)
    requested_date = serializers.DateTimeField(format="%d-%m-%Y", read_only=True)
    resolved_date = serializers.DateTimeField(format="%d-%m-%Y", read_only=True)
    class Meta:
        model = Maintenance
        fields = ['id', 'propty', 'requested_date', 'maintenance_type', 'description', 'status', 'resolved_date']

class MaintenanceInputSerializer(serializers.ModelSerializer):
    propty = serializers.PrimaryKeyRelatedField(queryset=Property.objects.all())

    class Meta:
        model = Maintenance
        fields = ['id', 'propty', 'requested_date', 'maintenance_type', 'description', 'status', 'resolved_date']


class InventorySerializer(serializers.ModelSerializer):
    propty = PropertySerializer(read_only=True)
    class Meta:
        model = Inventory
        fields = ['id', 'item_name', 'propty', 'qty']

    
