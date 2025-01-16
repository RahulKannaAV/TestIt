
from authlib.integrations.flask_client import OAuth
from flask import Flask, render_template, url_for
import os

# More Info : https://docs.authlib.org/en/latest/client/flask.html
app = Flask(__name__)
app.secret_key = "suckmydick"
#Authlib
oauth = OAuth(app)

#Register google outh

CONF_URL = 'https://accounts.google.com/.well-known/openid-configuration' #provide us with common metadata configurations
google = oauth.register(
  name='google',
  server_metadata_url=CONF_URL,
  # Collect client_id and client secret from google auth api
  client_id= os.environ.get("CLIENT_ID"),
  client_secret = os.environ.get("CLIENT_SECRET"),
  client_kwargs={
    'scope': 'openid email profile'
  }
)

@app.route("/")
def index():
    return "<a href='/google-login'>Login</a>"

#Routes for login
@app.route('/google-login')
def googleLogin():
    redirect_uri = url_for('authorize', _external=True)
    google = oauth.create_client('google')
    return google.authorize_redirect(redirect_uri)


@app.route('/login/callback')
def authorize():
    token = oauth.google.authorize_access_token()
    user = token['userinfo']
    print(user)
  # user will return a dict of info like: email = user.get("email")
    #Save the user info to database and login the user
    return user

if(__name__ == "__main__"):
    app.run(debug=True)