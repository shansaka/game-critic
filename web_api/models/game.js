const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const gameSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	developer: {
		type: String,
		required: true
	},
	publisher: {
		type: String
	},
	dateReleased: {
		type: Date
	},
	dateAdded: {
		type: Date,
		default: Date.now
	},
	genreId: {
		type: String,
		required: true
	},
});

module.exports  = model('Games', gameSchema);