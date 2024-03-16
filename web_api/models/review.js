const mongoose = require("mongoose");
const User = require("./user");
const Game = require("./game");

const { Schema, model } = mongoose;

const reviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  game: {
    type: Schema.Types.ObjectId,
    ref: "Games",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  comments: {
    type: String,
    required: true,
  },
  location: {
    city: {
      type: String,
    },
    country: {
      type: String,
    },
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  images: [
    {
      URL: {
        type: String,
        required: true,
      },
    },
  ],
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  dateUpdated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Reviews", reviewSchema);
