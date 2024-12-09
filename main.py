import selenium
from selenium.webdriver.common.by import By
from selenium.webdriver import Chrome
from selenium.webdriver.chrome.service import Service
import time
import ollama


WEBDRIVER_URL = r"..\chromedriver-win64\chromedriver.exe"

driver = Chrome(service=Service(driver_path_env_key=WEBDRIVER_URL))

driver.get("https://www.javatpoint.com/cpp-interview-questions")

time.sleep(5)
body_content = driver.find_element(By.ID, "city").text

with open('content.txt', 'w') as f:
  f.writelines(body_content)



