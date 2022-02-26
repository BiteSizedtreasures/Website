const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const { response } = require("express");
var multer = require("multer");
const fs = require('fs');
const path = require("path");


// Process to add a Flavor
router.post("/addproduct", (req, res, next) => {
  // Creates a new flavor object with the data received
  let newProduct = new Product({
    name: req.body.name,
    allergins: req.body.allergins,
    ingredients: req.body.ingredients,
    price: req.body.price,
    coating: req.body.coating,
    decoration: req.body.decoration,
  });

  // Notifies if flavor has been created successfully
  Product.addProduct(newProduct, (err, flavor) => {
    if (err) {
      console.error(err);
      res.json({ success: false, message: "Failed to add product." });
    } else {
      res.json({ success: true, message: "Added Product." });
    }
  });
});

// When Creating a flavor, it checks and see if falvor exists in database
router.post("/authenticateflavor", (req, res, next) => {
  // Retreive Flavor Name
  const name = req.body.name;
  // Checks if the name is found in the database
  Flavor.getProductByName(name, (err, product) => {
    if (err) {
      throw err;
    }
    if (!product) {
      return res.json({ success: true, message: "Product is not found." });
    } else {
      return res.json({ success: false, message: "Product found." });
    }
  });
});

// Deletes flavor from database
router.delete("/product/:name", (req, res, next) => {
  // Retreives name from route ":name"
  const name = req.params.name;

  Flavor.removeProduct(name, (err, flavor) => {
    if (err) {
      throw err;
    }
    if (!flavor) {
      return res.json({ success: false, message: "Product not found." });
    } else {
      return res.json({ success: true, message: "Product deleted." });
    }
  });
});

// Updates Flavor info to the database
router.patch("/product/:name", (req, res, next) => {
  const name = req.params.name;

  Flavor.updateProduct(name, (err, product) => {
    if (err) {
      throw err;
    }
    if (!product) {
      return res.json({ success: false, message: "Product not found." });
    } else {
      return res.json({ success: true, message: "Product updated." });
    }
  });
});

// Retreive All Flavors
router.get("/products", (req, res, next) => {
  // Returns all objects (flavors) in the database
  const products =  Product.find({});

  try {
    // tries to send the data (flavors)
    response.send(products);
  } catch (err) {
    // send to console error 500 status
    response.status(500).send(err);
  }
});

module.exports = router;
