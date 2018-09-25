var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var colorSchema = new Schema({ 
	name: String,
	hex: String,
	rgb: 
		{
			red: Number,
			green: Number,
			blue: Number,
		},
	hsl: 
	{
		hue: Number,
		saturation: Number,
		lightness: Number,
	},
});

module.exports = mongoose.model('Color', colorSchema);