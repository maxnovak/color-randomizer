from flask import Flask
from flask_pymongo import PyMongo

app = Flask(__name__)
app.config["MONGO_URI"] = ""
mongo = PyMongo(app)

import colorrandomizer.views