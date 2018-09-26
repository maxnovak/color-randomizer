var express = require("express");
var dotenv = require('dotenv');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var port = process.env.PORT || 8000;
var app = express();
var router = require('./router.js');

dotenv.config();
var mongoUrl = process.env.MONGOLAB_URI;

mongoose.connect(mongoUrl);

app.all('/*', function(request, response, next){
	console.log('Got a request');
	next();
});

app.use(bodyParser.json());

app.use('/api', router);

app.post('/test', function(request, response){
	console.log(request.body);      // your JSON
	response.send(request.body);    // echo the result back
});

app.listen(port);

console.log('Server is running');