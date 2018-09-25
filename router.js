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

module.exports = router.post('/',
	function(request, response) {
		var color = new Color();

		color.name = request.body.name;
		color.hex = request.body.hex;
		color.rgb.red = request.body.rgb.red;
		color.rgb.green = request.body.rgb.green;
		color.rgb.blue = request.body.rgb.blue;
		color.hsl.hue = request.body.hsl.hue;
		color.hsl.saturation = request.body.hsl.saturation;
		color.hsl.lightness = request.body.hsl.lightness;

		color.save(function(error) {
			if (error) {
				response.send(error);
			}
			response.json({ message : 'color added' });
		});
	});