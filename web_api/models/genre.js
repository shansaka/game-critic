const mongoose = require('mongoose');
const Genre = require('./genre');
const { Schema, model } = mongoose;

const genreSchema = new Schema({
	name: {
		type: String,
		required: true
	}
});

module.exports  = model('Genre', genreSchema);