from bs4 import BeautifulSoup
import requests
import pandas as pd
import re



page_number = 0

ti = []
te = []
d = []

#ANSA SCRAPER
while page_number < 73:
 
    # append category URL to page number to get the current page
    current_page = f'https://www.ansa.it/ricerca/ansait/search.shtml?start={page_number}&tag=&any=chiara+ferragni+pandoro&sezione=&periodo=&sort=data%3Adesc'
 
    response = requests.get(current_page)
 
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
 
        # get link cards
        titles = soup.find_all('h2', 'title')
        texts = soup.find_all('div', 'text')
        dates = soup.find_all('p', 'meta')
 
        # iterate through link cards to get article unique hrefs
        for title in titles:
            soup = BeautifulSoup(str(title), 'html.parser')
            text = soup.get_text()
            ti.append(text.strip())
            
        for text in texts:
            soup = BeautifulSoup(str(text), 'html.parser')
            text = soup.get_text()
            te.append(text.strip())
        
        for date in dates:
            soup = BeautifulSoup(str(date), 'html.parser')
            date = soup.get_text().strip().split(", ")[0]
            date = date.split("- ")[1]
            d.append(date)
    else:
        print(f'Error fetching links for page: {response.status_code}')
 
    # increment the page count
    page_number += 12

df1 = pd.DataFrame({'Title': ti, 'Text': te, 'Date': d})



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