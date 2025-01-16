import selenium
from selenium.webdriver.common.by import By
from selenium.webdriver import Chrome
from selenium.webdriver.chrome.service import Service
import time
import ollama
from flask import Flask, request
from flask_cors import CORS, cross_origin


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

"""
WEBDRIVER_URL = r"..\chromedriver-win64\chromedriver.exe"

driver = Chrome(service=Service(driver_path_env_key=WEBDRIVER_URL))

driver.get("https://www.javatpoint.com/cpp-interview-questions")

time.sleep(5)
body_content = driver.find_element(By.ID, "city").text

with open('content.txt', 'w') as f:
  f.writelines(body_content)"""

@app.route("/hello")
@cross_origin()
def send_message():
  return "Hello World"

@app.route("/scrape-quiz-text", methods=['POST'])
@cross_origin()
def get_quiz_text():
  if(request.method == "POST"):
    content = request.get_json()
    print(content)
  return ["Well done",200]

if __name__ == "__main__":
  app.run(debug=True, port=5000)

