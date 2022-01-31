#!usr/bin/python3

from bs4 import BeautifulSoup
import requests

page = requests.get("https://edendayspa.pl/cennik/cennik.html")
soup = BeautifulSoup(page.content, 'html.parser')

#print(soup.prettify())
print(len(soup.find_all('div', class_='pricelist-item')))



def print_strings(stripped_strings, i = 0):
  for string in stripped_strings:
    print(f"\n  {string:>55}\n")

def print_strings_2(stripped_strings, i = 0):
  for string in stripped_strings:
    print(f"\n\n\n ====  {string :^55} ==== ")



categories = soup.find_all('div', class_="container")
for category in categories:
  name_category = category.find('h2')
  
  if name_category is not None:
    print_strings_2(name_category.stripped_strings)

    subcategories = category.find_all('div', class_="pricelist-item2")
    if subcategories is not None:
      for subcategory in subcategories:
        if subcategory is not None:
          subcategory_name = subcategory.find('div', class_="title2")  
          print_strings(subcategory_name.stripped_strings, 4)

          name_services = subcategory.find_all('div', class_="title")
          for service in name_services:
            children = service.contents[2]
            

            price = service.parent.find('div', class_="price")
            print(f" {price.string:>25}    {children}")

