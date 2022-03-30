const mongoose = require("mongoose");

const sauceSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    max: 1024,
    minlength: 5,
  },
  manufacturer: {
    type: String,
    required: true,
    max: 1024,
    minlength: 5,
  },
  description: {
    type: String,
    required: true,
    max: 1024,
    minlength: 5,
  },
  mainPepper: {
    type: String,
    required: true,
    max: 1024,
    minlength: 5,
  },
  imageUrl: {
    type: String,
    required: true,
    max: 1024,
    minlength: 5,
  },
  heat: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
  usersLiked: {
    type: [String],
    default: [],
  },
  usersDisliked: {
    type: [String],
    default: [],
  },
});

const sauceModel = mongoose.model("sauce", sauceSchema);
module.exports = sauceModel;
