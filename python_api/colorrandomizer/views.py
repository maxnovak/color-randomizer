from colorrandomizer import app

@app.route("/")
def hello():
	return "Hello World!"