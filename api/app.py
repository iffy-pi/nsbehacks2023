import io
import mimetypes
import os
import json
import time


from flask import (Flask, flash, redirect, render_template, request, send_file,
                   session, url_for, Response)
from flask_cors import CORS 
from api.dbsearch import search

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

def make_json_response( resp_dict:dict, status=200):
    # receives a dictionary and crafts the Flask JSON response object for it
    resp = Response(
        response=json.dumps(resp_dict), status=status, mimetype="text/plain"
    )

    # add_access_control(resp)
    resp.headers['Content-type'] = 'application/json'
    return resp

def error_response(status:int, message:str=None, error_json=None):
    # crafts an erroneous message with the status and returns it
    
    if message is not None:
        content = { 'message': message }

    elif error_json is not None:
        content = error_json

    else:
        raise Exception('No content provided')

    resp = Response(
        response=json.dumps(content), status=status, mimetype="text/plain"
    )

    # resp.headers['Access-Control-Allow-Origin'] = '*'
    if error_json is not None: resp.headers['Content-type'] = 'application/json'
    return resp

@app.route('/api/test', methods=['GET', 'POST'])
def test_sample():
    if request.method != 'POST':
        return error_response(400, message='Invalid HTTP method!')

    # summary options and transcript
    if request.json is None:
        return error_response(400, message='No JSON content included!')
    
    # Expecting the following keys
    expected_keys = [ 'query', 'filters']

    missing_keys = list(filter(
        lambda key: key not in request.json,
        expected_keys
    ))

    if len(missing_keys) > 0:
        return error_response(400, message="Required keys are missing: {}".format(missing_keys))

    results = search(request.json['query'], request.json['filters'])

    # for now craft a simple relay message
    js = {
        'query': request.json['query'],
        'filters': request.json['filters'],
        'results': results
    }
    resp = make_json_response(js)
    return resp



# running the code
if __name__ == '__main__':
    # debug is true to show errors on the webpage
    app.run(debug=True)