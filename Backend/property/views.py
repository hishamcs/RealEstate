from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from datetime import datetime, timedelta
from django.db.models import Q
from django.utils import timezone

from .models import Property, PropertyImage, Transaction, RentLease, Maintenance
from .serializers import *

class PropertyView(APIView):
    serializer_class = PropertySerializer

    def get_permissions(self):
        if self.request.method == 'GET':
            return [IsAuthenticated()]
        return [IsAdminUser()]

    def get(self,request):
        property_id = request.GET.get('property_id', None)
        if property_id:
            prop = get_object_or_404(Property, id=property_id, status='available')
            inventories = Inventory.objects.filter(propty=prop)
            property_serializer = self.serializer_class(prop)
            inventroy_serializer = InventorySerializer(inventories, many=True)
            return Response({
                'property':property_serializer.data,
                'inventories':inventroy_serializer.data
            })
            return Response(serializer.data)
        if request.user.is_superuser:
            properties = Property.objects.all()
        else:
            properties = Property.objects.filter(status='available')
        serializer = self.serializer_class(properties, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request):
        property_id = request.data.get('propertyId', None)

        if not property_id:
            return Response({'detail':'Property id is required...'})
        
        try:
            property_id = int(property_id)
            propty = Property.objects.get(id=property_id)
            if propty.status in ['sold', 'leased', 'rented']:
                return Response({'detail':'Not able to block, it is held by other user...'}, status=status.HTTP_400_BAD_REQUEST)
            if propty.status == 'available':
                propty.status = 'unavailable'
            else:
                propty.status = 'available'
            propty.save()
            serializer = self.serializer_class(propty)
            return Response(serializer.data)
        except ValueError:
            return Response({'detail':'Property ID must be an integer'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_404_NOT_FOUND)
        

class TransactionView(APIView):
    
    def post(self, request):
        request.data['user'] = request.user.id
        propty_id = request.data.get('propty', None)


        if not propty_id:
            return Response({'detail':'property id is required...'}, status=status.HTTP_400_BAD_REQUEST)
        

        try:
            propty = get_object_or_404(Property, id=propty_id)
            if propty.status != 'available':
                return Response({'detail':"Property can't be purchased.."}, status=status.HTTP_400_BAD_REQUEST)
        except Property.DoesNotExist:
            return Response({'detail':'Property doesnot exist'}, status=status.HTTP_404_NOT_FOUND)
        

        serializer = TransactionInputSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            if propty.property_type == 'buy':
                propty.status = 'sold'
            elif propty.property_type == 'lease':
                propty.status = 'leased'

                start_date = datetime.now().date()
                end_date = start_date + timedelta(days=365)
                deposit = 2 * propty.price
                rent = propty.price
                RentLease.objects.create(
                    rental_type='lease',
                    user=request.user,
                    propty=propty,
                    start_date=start_date,
                    end_date=end_date,
                    deposit=deposit,
                    rent=rent,
                    next_payment_date=start_date+timedelta(days=30),
                )
            elif propty.property_type == 'rent':
                propty.status = 'rented'

                start_date = datetime.now().date()
                end_date = start_date + timedelta(days=30)
                deposit = 100
                rent = propty.price
                RentLease.objects.create(
                    rental_type='rent',
                    user=request.user,
                    propty=propty,
                    start_date=start_date,
                    end_date=end_date,
                    deposit=deposit,
                    rent=rent,
                )

            propty.held_user = request.user
            propty.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request):
        transactions = Transaction.objects.all()
        serializer = TransactionOutputSerializer(transactions, many=True)
        return Response(serializer.data)
    

class PropertyHoldingsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_id = request.GET.get('user_id', None)
        if user_id:
            properties = Property.objects.filter(held_user__id=user_id)
        else:
            properties = Property.objects.filter(held_user=request.user)
        serializer = PropertySerializer(properties, many=True)
        return Response(serializer.data)
    
class MaintenanceView(APIView):
    permission_classes = [IsAuthenticated]
    

    def get(self, request):
        maintenances = Maintenance.objects.all()
        serializer = MaintenanceOutputSerializer(maintenances, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        print(request.data)
        serializer = MaintenanceInputSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

    def patch(self, request):
        maintenance_id = request.data.get('id',None)
        try:
            maintenance = Maintenance.objects.get(id=maintenance_id)
        except Maintenance.DoesNotExist:
            return Response({'detail':'Maintenance not found'}, status=status.HTTP_404_NOT_FOUND)
        
        if 'status' in request.data and request.data['status'] == 'completed':
            request.data['resolved_date'] = timezone.now()

        serializer = MaintenanceInputSerializer(maintenance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def myproperty(request):
    property_id = request.GET.get('property_id',None)
    if not property_id:
        return Response({'detail':'Property ID is required...'})
    try:
        propty = Property.objects.get(id=property_id, held_user=request.user)
        maintenances = Maintenance.objects.filter(propty=propty, propty__held_user=request.user)
    except Property.DoesNotExist:
        return Response({'detail':'Property Doesnot exist'}, status=status.HTTP_404_NOT_FOUND)
    property_serializer = PropertySerializer(propty)
    maintenances_serializer = MaintenanceOutputSerializer(maintenances, many=True)
    return Response({
        'property':property_serializer.data,
        'maintenances':maintenances_serializer.data
    })



class InventoryView(APIView):
    permission_classes = [IsAdminUser]

    def get(self,request):
        inventories = Inventory.objects.all()
        serializer = InventorySerializer(inventories, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        property_id = request.data.get('property_id', None)
        item_name = request.data.get('item_name',None)
        count = request.data.get('number', None)

        if not property_id or not item_name or not count:
            return Response({'detail': 'All fields (property_id, item_name, number) are required'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            propty = Property.objects.get(id=property_id)
        except Property.DoesNotExist:
            return Response({'detail':'Property is not found'}, status=status.HTTP_404_NOT_FOUND)
        
        try:
            inventory = Inventory.objects.create(
                propty=propty,
                item_name=item_name,
                qty=count
            )

            serializer = InventorySerializer(inventory)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'detail':str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)