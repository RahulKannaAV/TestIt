import logging
import time
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

import spacy
from spacy import displacy
from collections import Counter

nlp = spacy.load("en_core_web_md")

contents = ""
with open('big_lesson.txt', 'r') as f:
    for line in f.readlines():
        contents += line

nlp_doc = nlp(contents)
labels = [x.text for x in nlp_doc.ents]

print(Counter(labels).most_common(20))
