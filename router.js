var router = require('express').Router();
var color = require('./models/color');

module.exports = router.get('/', 
	function(request, response){
		color.find(function(error, colors) {
			if (error) {
				response.send(error);
			}
			response.json(colors);
		});
	});
