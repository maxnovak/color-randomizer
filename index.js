var express = require("express");
var dotenv = require('dotenv');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var port = process.env.PORT || 8000;
var app = express();
var router = require('./router.js');

dotenv.config();
var mongoUrl = process.env.MONGODB_URI;

mongoose.connect(mongoUrl, { useNewUrlParser: true });

app.all('/*', function(request, response, next){
	console.log('Got a request to: ' + request.url);
	next();
});

app.use(bodyParser.json());

app.use('/api', router);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, 'client/build')));
	app.get('*', function(req, res) {
		res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
	});
}

app.listen(port);

console.log('Server is running at: ' + port);