// ProductServices.js

const productModel = require('../models/productModel');

// Add Product
const addProductService = async (data) => {
  return await productModel.create(data);
};

// Get all products
const getAllProductsService = async () => {
  return await productModel.find({});
};

// Find by code
const findProductService = async (code) => {
  return await productModel.findOne({ product_code: code });
};

// Delete by ID
const deleteProductByIdService = async (id) => {
  return await productModel.findByIdAndDelete(id);
};

// Update product
const updateProductService = async (id, updateData) => {
  return await productModel.findByIdAndUpdate(id, updateData, { new: true });
};

module.exports = {
  addProductService,
  getAllProductsService,
  findProductService,
  deleteProductByIdService,
  updateProductService
};