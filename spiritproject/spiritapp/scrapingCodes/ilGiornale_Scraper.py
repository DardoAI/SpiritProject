from bs4 import BeautifulSoup
import requests
import pandas as pd
import re

#IL GIORNALE SCRAPER
page_number = 1

ti = []
te = []
d = []

while page_number < 13:
 
    # append category URL to page number to get the current page
    current_page = f'https://www.ilgiornale.it/cerca.html?q=ferragni%20pandoro&page={page_number}'
 
    response = requests.get(current_page)
 
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
 
        # get link cards
        titles = soup.find_all('a', 'card__title')
        texts = soup.find_all('p', 'card__abstract')
        dates = soup.find_all('div', 'card__time')
 
        # iterate through link cards to get article unique hrefs
        for title in titles:
            soup = BeautifulSoup(str(title), 'html.parser')
            text = soup.get_text()
            ti.append(text.strip())
            
        for text in texts:
            soup = BeautifulSoup(str(text), 'html.parser')
            text = soup.get_text()
            te.append(text.strip())
            te = te[:len(ti)]
        
        for date in dates:
            soup = BeautifulSoup(str(date), 'html.parser')
            date = soup.get_text()
            d.append(date.strip())
    else:
        print(f'Error fetching links for page: {response.status_code}')
 
    # increment the page count
    page_number += 1

df2 = pd.DataFrame({'Title': ti, 'Text': te, 'Date': d})