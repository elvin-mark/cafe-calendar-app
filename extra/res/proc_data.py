import json
import base64

with open("raw_data.json","r") as f:
    raw_data = json.load(f)

new_data = []
for i,event in enumerate(raw_data["events"]):
    with open(f"event_{i+1}.jpg","rb") as f:
        b = f.read()
        event_image = base64.b64encode(b).decode()
    event["poster"] = event_image
    new_data.append(event)
data = {"events":new_data}
with open("data.json","w") as f:
    json.dump(data,f)