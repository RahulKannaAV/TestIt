import logging
import time
from typing import List
import ollama
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.common import exceptions
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options

def get_top_resources(query):
    query_string = "+".join(query.split(" "))

    WEBDRIVER_URL = r"..\chromedriver-win64\chromedriver.exe"
    options = Options()
    options.add_argument('--headless=new')
    driver = webdriver.Chrome(service=Service(driver_path_env_key=WEBDRIVER_URL),
                              options=options)

    driver.get(f"https://www.google.com/search?q={query_string}")
    website_titles = []
    website_links = []

    try:
        targeted_elements = driver.find_elements(By.CSS_SELECTOR, "h3[class='LC20lb MBeuO DKV0Md']")

        for element in targeted_elements:
            website_titles.append(element.text)

    except (exceptions.NoSuchElementException, exceptions.ElementNotInteractableException) as e:
        logging.error(f"Element doesn't exist/non-interactable {e}")


    try:
        targeted_elements = driver.find_elements(By.CSS_SELECTOR, "a[jsname='UWckNb']")

        for element in targeted_elements:
            website_links.append(element.get_attribute("href"))
    except (exceptions.NoSuchElementException, exceptions.ElementNotInteractableException) as e:
        logging.error(f"Element links doesn't exist/non-interactable {e}")

    link_dict = {website_titles[i]:website_links[i] for i in range(3)}
    return(link_dict)

def get_important_entities(text: str)->List[str]:
    ollama.pull('llama3')
    response = ollama.chat(model='llama3', messages=[
      {
        'role': 'user',
        'content': f'Print out list of important entities mentioned in this text, "{text}"',

      },
      ], stream=True)

    results = ""
    for chunk in response:
      print(chunk['message']['content'], end='', flush=True)
      results += chunk['message']['content']

    return results

content = ""
with open("big_lesson.txt", 'r') as f:
    for line in f.readlines():
        content += line

entities = get_important_entities(content)
print(entities)


