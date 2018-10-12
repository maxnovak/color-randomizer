from flask import Flask
from flask_pymongo import PyMongo

app = Flask(__name__)
app.config.from_envvar('SETTINGS_CONFIG')
mongo = PyMongo(app)

import colorrandomizer.views