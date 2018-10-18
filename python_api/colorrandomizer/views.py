from colorrandomizer import app, mongo
from flask import request
import sys, json
from random import *
from schema import Schema, And, Use, SchemaError

schema = Schema({'name': Use(str, error='Invalid name'),
	'hex': Use(str, error='Invalid Hex value'),
	'rgb': {
		'red': Use(int, error='Invalid value'),
		'green': Use(int, error='Invalid value'),
		'blue': Use(int, error='Invalid value')
	},
	'hsl': {
		'hue': Use(int, error='Invalid value'),
		'saturation': Use(int, error='Invalid value'),
		'lightness': Use(int, error='Invalid value')
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
	try:
		data = schema.validate(request.json)
	except SchemaError:
		print(SchemaError, file=sys.stderr)
		return bad_request()
	mongo.db.colors.insert_one(request.json)
	return "Data successfully Posted"

@app.errorhandler(400)
def bad_request():
	message = {
		'status':400,
		'message': 'invalid request',
	}
	resp = json.dumps(message)

	return resp

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
