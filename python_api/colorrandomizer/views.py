from colorrandomizer import app, mongo
from flask import request
import sys, json
from random import *
from schema import Schema, And, Use, Optional

schema = Schema({'name': Use(str),
	'hex': Use(str),
	'rgb': {
		'red': Use(int),
		'green': Use(int),
		'blue': Use(int)
	},
	'hsl': {
		'hue': Use(int),
		'saturation': Use(int),
		'lightness': Use(int)
	}
	})

@app.route("/api/color", methods=['GET','POST'])
def color():
	if request.method == 'POST':
		return post_data(request)
	else:
		return get_all_colors()

def post_data(request):
	print(request.json, file=sys.stderr)
	data = schema.validate(request.json)
	mongo.db.colors.insert_one(request.json)
	return "Data successfully Posted"

def get_all_colors():
	colors = mongo.db.colors.find(projection={'_id':False, '__v':False})
	return json.dumps(list(colors))

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
