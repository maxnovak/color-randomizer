var router = require('express').Router();


module.exports = router.get('/', 
	function(request, response){
		response.json( 
		{ 
			color: 'Crimson',
			hex: '#DC143C',
			rgb: 
				{
					red: 220,
					green: 20,
					blue: 60,
				},
			hsl: 
			{
				hue: 10,
				saturation: 80,
				lightness: 60,
			},
		});
	});
