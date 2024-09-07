from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static

from . import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/', include('account.urls')),
    path('api/property/', include('property.urls'))
]+static(settings.base.MEDIA_URL,document_root=settings.base.MEDIA_ROOT)
