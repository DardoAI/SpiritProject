import google.cloud.aiplatform as vertexai
from google.cloud import bigquery
from google.oauth2 import service_account
import os
import requests
from vertexai.language_models import CodeGenerationModel
import vertexai.preview.generative_models as generative_models

from vertexai.generative_models import (
    GenerationConfig,
    Content,
    FunctionDeclaration,
    GenerativeModel,
    
    HarmBlockThreshold,
    HarmCategory,
    Part,
    Tool,
)
import json
import pandas as pd
import base64
import requests
from vertexai.language_models import TextGenerationModel
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from time import time as current_time
import threading

def initialize_credentials(path):
    credentials = service_account.Credentials.from_service_account_file(path)
    return credentials

def initialize_vertex_ai(project_id, location, credentials):
    try:
        vertexai.init(
            project=project_id,
            location=location,
            credentials=credentials,
        )
        
    except Exception as e:
        print(e)

# Set your project and location
PROJECT_ID = "plucky-spirit-429815-a9"
LOCATION = "us-central1"

# Path to your service account key file
CREDENTIALS_PATH = os.path.abspath("spiritapp\\models\\giasone.json")

# Initialize Credentials and Vertex AI



vertexai.init(project="plucky-spirit-429815-a9", location="us-central1")



generation_config = {
    "max_output_tokens": 30,
    "temperature": 0,
}




def keywordsGenerator(user_input):
    # Initialize the Vertex AI
    
    # Initialize the GenerativeModel
    model = GenerativeModel("gemini-1.5-flash-001")
    
    # Generate the response using the model
    responses = model.generate_content(
        [f"""From the user input:{user_input}, generate meaningful keywords (single words) as a list. STATE ONLY THE KEYWORDS, MINIMUN 3, MAX 5
         
         EX:
         keyword1, ...., keywordn. 
        """],
        generation_config=generation_config,       
    )
    
    return responses.text.replace("\n", "").replace(" ", "").split(",")

def main(prompt):
    credentials = initialize_credentials(CREDENTIALS_PATH)
    initialize_vertex_ai(PROJECT_ID, LOCATION, credentials)
    keywords = keywordsGenerator(prompt)
    return keywords

