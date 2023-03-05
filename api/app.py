import io
import mimetypes
import os
import json
import time


from flask import (Flask, flash, redirect, render_template, request, send_file,
                   session, url_for, Response)
from flask_cors import CORS 

# initialize app flask object
# intializing to the name of the file
app = Flask(__name__)
# https://stackoverflow.com/questions/20035101/why-does-my-javascript-code-receive-a-no-access-control-allow-origin-header-i
CORS(app)

# Load app configuration from config.py, must be at root of repository
# Source: https://exploreflask.com/en/latest/configuration.html
app.config.from_pyfile('config.py')

# App routing information
    # now we use app routing to map a function to a given page of our website
    # in app routing, it starts from the root of our website
    # so if our website is mysite.com, and we wanted to route to mysite.com/hello
    # we would pass /hello to the app route call
    # app routing uses special @ and then the flask app oobject
    # then we immediately define the associated function for the URL
    # @app.route("/test")
    # def testfunc():
    #     return "Testing web page!"
    # we can have several routes for the different pages on our website
    # just by adding more app routes and the subsequent functions that handle them


@app.route('/helloworld', methods=['GET', 'POST'])
def test_route():
    return 'Hello World'


# running the code
if __name__ == '__main__':
    # debug is true to show errors on the webpage
    app.run(debug=True)