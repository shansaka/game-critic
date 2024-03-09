const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const genreSchema = new Schema({
	name: {
		type: String,
		required: true
	}
});

module.exports  = model('Genres', genreSchema);