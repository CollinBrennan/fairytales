import json
import sys

output_file = sys.stdout

data = {
  "id": 1,
  "title": "some title"
}

json.dump(data, output_file)