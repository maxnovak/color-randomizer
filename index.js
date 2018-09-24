var express = require("express");
var port = process.env.PORT || 8000;
var app = express();
var router = require('./router.js');


app.all('/*', function(request, response, next){
	console.log('Got a request');
	next();
});

app.use('/', router);

app.listen(port);

console.log('Server is running');