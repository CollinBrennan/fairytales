import json

data = {
  "id": 1,
  "title": "some title",
}

with open('data.json', 'w') as f:
  json.dump(data, f)