from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time

WEBDRIVER_URL = r"..\chromedriver-win64\chromedriver.exe"
CHANNEL_URL = r"https://www.youtube.com/@freecodecamp/videos"

SELECTOR_STRING = 'yt-formatted-string[id="video-title"]'

driver = webdriver.Chrome(service=Service(driver_path_env_key=WEBDRIVER_URL))

driver.get(CHANNEL_URL)

oldTopDistance = driver.execute_script("return document.body.scrollTop;")
scroll_height = 0

while(True):
    video_names = driver.find_elements(by=By.CSS_SELECTOR, value=SELECTOR_STRING)
    with open('freecodecamp_video_courses.txt', 'w', encoding='utf-8') as f:
        for name in video_names:
            f.write(f"{name.text}\n")
    time.sleep(2)
    html = driver.find_element(By.TAG_NAME, 'html')
    html.send_keys(Keys.END)
    element = driver.find_element(By.TAG_NAME, "html")
    new_scroll_height = element.get_attribute("scrollHeight")
    if(scroll_height == new_scroll_height):
        break
    else:
        scroll_height = new_scroll_height

    time.sleep(2)

