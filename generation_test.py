import ollama
import re
import json

# Just run the method along with ollama run llama3:8b. Don't start from the command-line terminal


def generate_quiz(query):

    ollama.pull('llama3')
    response = ollama.chat(model='llama3', messages=[
      {
        'role': 'user',
        'content': f'Generate 5 quiz questions, 4 options related to this in JSON format which should also contain answers field. {query}',

      },
      ], stream=True)

    results = ""
    for chunk in response:
      print(chunk['message']['content'], end='', flush=True)
      results += chunk['message']['content']


    questions_json = extract_json(results)
    # Extracted JSON
    print(questions_json[0])

    # Save it to the Database


def extract_json(output):
    pattern = r"```(.*?)```"
    match = re.search(pattern, output, re.DOTALL)

    if match:
        json_text = match.group(1).strip()
        try:
          # Parse the JSON
          questions = json.loads(json_text)
          print("JSON extracted successfully")
          return questions
        except json.JSONDecodeError as e:
          print(f"Error decoding JSON: {e}")
          return []
    else:
        print("No JSON block found in the text.")
        return []

with open('content.txt', 'r') as f:
    generate_quiz(f.read())

