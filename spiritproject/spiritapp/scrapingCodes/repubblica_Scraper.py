from bs4 import BeautifulSoup
import requests
import pandas as pd
import re

page_number = 0

ti = []
te = []
d = []

#LA REPUBBLICA SCRAPER
ti = []
te = []
d = []
page_number = 1

while page_number < 13:
 
    # append category URL to page number to get the current page
    current_page = f'https://ricerca.repubblica.it/ricerca/repubblica?query=chiara+ferragni+pandoro&fromdate=2023-12-13&todate=2024-03-25&sortby=ddate&author=&mode=all&page={page_number}'
    response = requests.get(current_page)
 
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
 
        articles = soup.find_all('article')
        date = soup.find_all('time')
     
 
        # iterate through link cards to get article unique hrefs
        
        for article in articles:
            soup = BeautifulSoup(str(article), 'html.parser')
            str_article = soup.get_text()
            sections = re.split(r'\n\s*\n', str_article.strip())
            sections = [section.strip() for section in sections if section.strip()]
            ti.append(sections[0])
            te.append(sections[1])
            
            
        
        # for date in dates:
        #     soup = BeautifulSoup(str(date), 'html.parser')
        #     date = soup.time['datetime']
        #     d.append(str(date))
    else:
        print(f'Error fetching links for page: {response.status_code}')
 
   # increment the page count
    page_number += 1


df3 = pd.DataFrame({'Title': ti, 'Text': te})