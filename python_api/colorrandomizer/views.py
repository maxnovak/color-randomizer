from colorrandomizer import app
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
	return json.dumps({'name':'SkyBlue2','hex':'#87AFFF','rgb':{'red':135,'green':175,'blue':255},'hsl':{'hue':220,'saturation':100,'lightness':76}})