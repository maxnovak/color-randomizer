var express = require("express");
var port = process.env.PORT || 8000;
var app = express();
var router = express.Router();


router.use(function(request, response, next){
	console.log('Got a request');
	next();
});

router.get('/', function(request, response){
	response.json( 
	{ 
		message : 'this is text', 
	});
});

app.use('/', router);

app.listen(port);

console.log('Server is running');