from colorrandomizer import app, mongo
from flask import request
import sys, json
from random import *

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
	document_count = mongo.db.colors.count_documents({})
	color = mongo.db.colors.find_one(filter={ }, projection={'_id':False, '__v':False}, skip=randrange(document_count))
	print(color, file=sys.stderr)
	return json.dumps(color)

@app.route("/api/color/<color_name>", methods=['GET'])
def specfic_color(color_name):
	color = mongo.db.colors.find_one(filter={"$text": { "$search": color_name }}, projection={'_id':False, '__v':False})
	return json.dumps(color)
