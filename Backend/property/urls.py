from django.urls import path
from .views import *

urlpatterns = [
    path('', PropertyView.as_view(), name='prop_api'),
    path('transaction/', TransactionView.as_view(), name='tranaction_api'),
    path('property-holdings/', PropertyHoldingsView.as_view(), name='property_holdings'),
    path('maintenance/', MaintenanceView.as_view(), name='maintenance_api'),
    path('myproperty/', myproperty, name='myproperty_api' ),
    path('inventory/', InventoryView.as_view(), name='inventory_api'),
]
