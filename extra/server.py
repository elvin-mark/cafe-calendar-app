from flask import Flask, request
from flask_cors import CORS
import base64
import random 

app = Flask(__name__)
CORS(app)
with open("res/piano-event.jpg","rb") as f:
    b = f.read()
    piano_event_image = base64.b64encode(b).decode()

with open("res/flute-event.jpg","rb") as f:
    b = f.read()
    flute_event_image = base64.b64encode(b).decode()

with open("res/language-event.jpg","rb") as f:
    b = f.read()
    language_event_image = base64.b64encode(b).decode()
    
random_events = [
    {
        "title": "Piano Event",
        "description":"Come to enjoy some classical music",
        "image": piano_event_image,
        "date":"2023/12/12"
    },
    {
        "title": "Flute Event",
        "description":"Come to enjoy some flute performance",
        "image": flute_event_image,
        "date":"2023/12/12"
    },
    {
        "title": "Language Exchange Event",
        "description":"Come with us to learn languages",
        "image": language_event_image,
        "date":"2023/12/12"
    }
]

@app.route("/events")
def events():
    return [random.choice(random_events) for _ in range(10)]

if __name__ == "__main__":
    app.run(host="0.0.0.0",port=5000)