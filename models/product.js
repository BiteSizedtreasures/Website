const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const config = require("../config/database");

// User Scheme - represenation of what the databse will hold
const ProductSchema = mongoose.Schema({
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
});

// Exports the model scheme of the database
const Flavor = (module.exports = mongoose.model("Product", ProductSchema));

// Find Flavor by ID -Used for pulling items
module.exports.getProductById = function (id, callback) {
  // Finds the flavor using the paramater id
  Flavor.findbyID(id, callback);
};

// Add the Flavor to the database
module.exports.addProduct = function (newProduct, callback) {
  newProduct.save(callback); // saves the falvor info to the database
};

// Removes the Flavor from the database by Name
module.exports.removeProduct = function (name, callback) {
  const query = { name: name };
  Flavor.deleteOne(query, callback);
};

// Updates the flavor to the database
module.exports.updateProduct = function (name, callback) {
  Flavor.findOneAndUpdate(name, request.body, callback);
  Flavor.save();
};

// Finds Flavor by Name
module.exports.getProductByName = function (name, callback) {
  const query = { name: name };
  Flavor.findOne(query, callback);
};
