import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js'; // Pulling from your Mongoose model instead of static data

// @desc    Fetch all IN-STOCK products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  // $gt: 0 means "Greater Than Zero". 
  // NOTE: If WooCommerce saved your stock under a different name like 'stock_quantity', change 'countInStock' to match your MongoDB schema!
  const products = await Product.find({ countInStock: { $gt: 0 } });

  res.json(products);
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export { getProducts, getProductById };