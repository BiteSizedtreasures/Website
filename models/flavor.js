const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const config = require("../config/database");

// User Scheme - represenation of what the databse will hold
const FlavorSchema = mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
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
    validate(value) {
      if (value < 0) throw new Error("Price can't be negative");
    },
  },
  coating: {
    type: String,
    required: true,
  },
  decorations: {
    type: String,
    required: true,
  },
});

// Exports the model scheme of the database
const Flavor = (module.exports = mongoose.model("Flavor", UserSchema));

// Find Flavor by ID -Used for pulling items
module.exports.getFlavorById = function (id, callback) {
  // Finds the flavor using the paramater id
  Flavor.findbyID(id, callback);
};

// Add the Flavor to the database
module.exports.addFlavor = function (newFlavor, callback) {
  newFlavor.save(callback); // saves the falvor info to the database
};

// Removes the Flavor from the database by Name
module.exports.removeFlavor = function (name, callback) {
  const query = { name: name};
  Flavor.deleteOne(query, callback);
}

// Updates the flavor to the database
module.exports.updateFlavor = function (name, callback) {
  await Flavor.findOneAndUpdate(name, request.body, callback);
  await Flavor.save();
}

// Finds Flavor by Name
module.exports.getFlavorByName = function (name, callback) {
  const query = {name : name}; 
  Flavor.findOne(query, callback);
};