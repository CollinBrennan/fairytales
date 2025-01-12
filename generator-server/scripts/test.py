import json
import os

data = {
  "id": 1,
  "title": "some title"
}

file_path = os.path.join(os.getcwd(), "output", "data.json")

with open(file_path, "w") as f:
  json.dump(data, f)