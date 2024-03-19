const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const gameSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dateReleased: {
    type: Date,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
  mainImage: {
    type: String,
    required: true,
  },
});

module.exports = model("Games", gameSchema);
