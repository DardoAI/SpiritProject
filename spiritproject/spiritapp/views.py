from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from .models import keywordsExtractor






class DiscoverView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        prompt = request.data.get('prompt')
        if prompt is not None:
            # Process the prompt as needed
            # Example: Save the prompt to the database or perform some calculation
            return Response({"message": f"Received prompt: {prompt}"}, status=status.HTTP_200_OK)
        return Response({"error": "No prompt provided"}, status=status.HTTP_400_BAD_REQUEST)
    
class PreviewContentView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        prompt = request.data.get('prompt')
        if prompt is not None:
            # Process the prompt as needed
            keywords = keywordsExtractor.main(prompt)
           
            #Here will start the scraping

            # Example: Save the prompt to the database or perform some calculation
            return Response({"message": f"Received prompt for review: {keywords}"}, status=status.HTTP_200_OK)
        return Response({"error": "No prompt provided"}, status=status.HTTP_400_BAD_REQUEST)