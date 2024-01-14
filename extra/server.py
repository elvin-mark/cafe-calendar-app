from flask import Flask, request
from flask_cors import CORS
import json
import random 

app = Flask(__name__)
CORS(app)

    
with open("res/data.json","r") as f:
    data = json.load(f)

@app.route("/events")
def events():
    return data["events"]

if __name__ == "__main__":
    app.run(host="0.0.0.0",port=5000)