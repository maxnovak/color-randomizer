var express = require("express");
var port = process.env.PORT || 8000;
var app = express();
var router = express.Router();

router.get('/', function(request, response){
	response.json( 
	{ 
		message : 'this is text', 
	});
});

app.use('/', router);

app.listen(port);

console.log('Server is running');