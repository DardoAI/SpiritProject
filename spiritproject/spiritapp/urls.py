from django.urls import path
from .views import DiscoverView, PreviewContentView


urlpatterns = [
    path('discover/', DiscoverView.as_view(), name='discover'),
    path('preview/', PreviewContentView.as_view(), name='preview'),
]
