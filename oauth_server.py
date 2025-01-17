
from authlib.integrations.flask_client import OAuth
from authlib.oauth2.client import OAuth2Client
from flask import Flask, url_for, make_response, redirect, request, session
from datetime import timedelta
import os
from flask import session
from functools import wraps


def login_required(f):
    @wraps(f) # makes sure that function 'f' retains the correct metadata
    def decorated_function(*args, **kwargs):
        user = dict(session).get('email', None)
        # You would add a check here and usethe user id or something to fetch
        # the other data for that user/check if they exist
        if user: # If user is there, it means user is authenticated
            return f(*args, **kwargs)
        return redirect("/")
    return decorated_function


# More Info : https://docs.authlib.org/en/latest/client/flask.html
app = Flask(__name__)
app.secret_key = "suckmydick"
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=30)

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
    print(f"Before Login: {session.items()}")
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
    session['email'] = user['email']
    session['username'] = user['given_name']
    session['userID'] = "49642"
    session.permanent = True
    print(f"After Login: {session.items()}")
  # user will return a dict of info like: email = user.get("email")
    #Save the user info to database and login the user
    return redirect("/logged")

@app.route("/logged")
@login_required
def logged_in(): # same as login_required(logged_in()), if true, returns logged_in, otherwise redirects to home
    return "<div> <h1>You have successfully Logged In</h1> <a href='/logout'>Log Out</a> </div>"

@app.route("/logout")
def logout():
    for key in list(session.keys()):
        session.pop(key)

    return redirect("/")



if(__name__ == "__main__"):
    app.run(debug=True)