from django.shortcuts import render
from rest_framework.views import APIView
from . models import Sites
from rest_framework.response import Response
from . serializer import WebsiteSerializer
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404
import json
import pandas as pd
from django.shortcuts import HttpResponse


serializer_class = WebsiteSerializer

@api_view(['GET'])
def zipDetail(request, pk):
    zip = Sites.objects.filter(ZIP=pk)
    serializer = WebsiteSerializer(zip, many=True)
    newList = (json.dumps(serializer.data))
    newList = json.loads(newList)
    print(newList)
    
    
    return Response(newList)

@api_view(['GET'])
def databaseList(self):
    siteNames = list(Sites.objects.all()[1:].values_list('Site_Name', flat=True))
    counties = list(Sites.objects.all()[1:].values_list('County', flat=True))
    addresses = list(Sites.objects.all()[1:].values_list('Address_1', flat=True))
    zipCodes = list(Sites.objects.all()[1:].values_list('ZIP', flat=True))
    siteList = [siteNames, counties, addresses, zipCodes]
    return Response(siteList)

@api_view(['GET'])
def getTable(request):
    dataFrame = pd.read_csv("Finals.csv")
    final = dataFrame.to_html()

    return HttpResponse(final)
    