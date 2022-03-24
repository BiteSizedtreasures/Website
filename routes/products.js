const express = require("express");
const router = express.Router();
const Product = require("../models/product");

// New product route
router.get("/new", async (req, res, next) => {
  res.send("New Products");
});

// Fetch all product route
router.get("/", async (req, res) => {
   Product.find({}, (err, product) => {
    
    // if(!product.length) {
    //   res.json({ success: false, message: "Products not found." });
    // }
    res.json({ success: true, data: product });
  })
  .clone()
  .catch(err => console.log(err));
});

// Create a product route
router.post("/", (req, res, next) => {
  // Creates a new flavor object with the data received
  let Product_object = new Product({
    name: req.body.name,
    allergins: req.body.allergins,
    ingredients: req.body.ingredients,
    price: req.body.price,
    coating: req.body.coating,
    decoration: req.body.decoration,
  });
  
  if (Product_object.save()) { // If the product information is saved
    res.json({ success: true, message: "Product successfully created." });
  } else { // If the product information is not saved in the database
    res.json({ success: false, message: "Product not created." });
  }
});

module.exports = router;
