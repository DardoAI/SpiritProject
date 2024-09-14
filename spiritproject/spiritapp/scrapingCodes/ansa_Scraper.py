from bs4 import BeautifulSoup
import requests
import pandas as pd
import re


def ansaScraper(regex):

    page_number = 0

    ti = []
    te = []
    d = []

    #ANSA SCRAPER
    while page_number < 73:
    
        # append category URL to page number to get the current page
        current_page = f'https://www.ansa.it/ricerca/ansait/search.shtml?start={page_number}&tag=&any={regex}&sezione=&periodo=&sort=data%3Adesc'
        print(current_page)
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
    df1.to_csv('Ansa Scraped.csv')
    df1.head()
    print('ho screpato zi')
    return df1

def main(keywords):
    print('sto pe fa zi')
    regex = ''
    for i in range(len(keywords)):
        
        if i == 0:
            regex += keywords[i]
        else:
            regex += f'+{keywords[i]}'

    print(regex)
    df_ansa = ansaScraper(regex)
    print(df_ansa)
    return df_ansa


    

    