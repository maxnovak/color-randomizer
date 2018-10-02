var router = require('express').Router();
var Color = require('./models/color');

router.get('/color',
	function(request, response){
		var query = Color.find({}).select('-_id -__v');
		query.exec(function(error, colors) {
			if (error) {
				response.send(error);
			}
			response.json(colors);
		});
	});

router.post('/color',
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

router.get('/color/random',
	function(request, response){
		Color.countDocuments()
		.exec(function(error, count){
			var random = Math.floor(Math.random() * count);

			var query = Color.findOne().skip(random).select('-_id -__v');
			query.exec(function(error, color) {
				if (error) {
					response.send(error);
				}
				response.json(color);
			});
		});
	});

router.delete('/color/:id',
	function(request, response) {
		console.log(request.params.id);
		response.send('Delete request');
	});
module.exports = router;