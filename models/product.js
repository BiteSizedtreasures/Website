const mongoose = require("mongoose");

// User Scheme - represenation of what the databse will hold
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // sets that this field needs an input
    trim: true, // removes any white spaces
    lowercase: true, // sets all chars to lowercase
  },
  allergins: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    default: 0,
    required: false,
  },
  coating: {
    type: String,
    required: false,
  },
  decoration: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

// Exports the model scheme of the database
module.exports = mongoose.model("Product", ProductSchema);
