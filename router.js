var router = require('express').Router();


module.exports = router.get('/', 
	function(request, response){
		response.json( 
		{ 
			message : 'this is text', 
		});
	});
