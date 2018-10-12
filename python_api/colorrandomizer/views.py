from colorrandomizer import app, mongo
from flask import request
import sys, json

@app.route("/color", methods=['GET','POST'])
def color():
	if request.method == 'POST':
		return post_data(request)
	else:
		return get_data()

def post_data(request):
	print(request.json, file=sys.stderr)
	return "Data successfully Posted"

def get_data():
	return "Got Data"

@app.route("/api/color/random", methods=['GET'])
def random_color():
	color = mongo.db.colors.find_one(filter={ "$text": { "$search": 'SkyBlue2' }}, projection={'_id':False, '__v':False})
	print(color, file=sys.stderr)
	return json.dumps(color)