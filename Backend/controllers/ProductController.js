const productModel = require("../models/productModel");
const productService = require("../services/ProductServices");
const { cloudinary } = require("../Config/Cloudnary");

const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "products",
    });
    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("Image upload failed");
  }
};

// Add Product Controller
const addProduct = async (req, res) => {
  try {
    if (
      !req.body.product_name ||
      !req.body.product_mrp ||
      !req.body.product_code
    ) {
      return res.status(400).json({
        success: false,
        message: "Product name, code and price are required",
      });
    }

    const uploadedImages = [];
    if (req.files) {
      const imageFields = ["image1", "image2", "image3", "image4"];

      for (let field of imageFields) {
        if (req.files[field]) {
          const url = await uploadToCloudinary(req.files[field][0]);
          uploadedImages.push(url);
        }
      }
    }

    const productData = {
      product_code: req.body.product_code,
      product_name: req.body.product_name,

      product_category: req.body.product_category,
      product_subcategory: req.body.product_subcategory,

      product_mrp: Number(req.body.product_mrp),
      product_discount: Number(req.body.product_discount) || 0,
      product_discount_price: Number(req.body.product_discount_price) || 0,

      product_brand_name: req.body.product_brand_name,
      product_description: req.body.product_description,
      product_quantity: Number(req.body.product_quantity) || 0,
      product_image: uploadedImages,

      product_size: req.body.product_size
        ? JSON.parse(req.body.product_size)
        : [],

      product_color: req.body.product_color
        ? JSON.parse(req.body.product_color)
        : [],

      product_material: req.body.product_material
        ? JSON.parse(req.body.product_material)
        : [],

      product_weight: req.body.product_weight
        ? JSON.parse(req.body.product_weight)
        : [],

      product_warranty: req.body.product_warranty,
      product_return_type: req.body.product_return_type,
      product_return_policy: req.body.product_return_policy,
      product_buy_limit: Number(req.body.product_buy_limit) || 0,
      product_emi_availability: req.body.product_emi_availability === "true",
      bestseller: req.body.bestseller === "true",
    };

    const newProduct = await productService.addProductService(productData);

    return res.status(201).json({
      success: true,
      message: "Product added successfully",
      data: newProduct,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// List Products
const listproduct = async (req, res) => {
  try {
    const products = await productService.getAllProductsService();
    res.json({ success: true, products });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};


// User product list
const userlist = async (req, res) => {
  try {
    const products = await productService.getAllProductsService();
    res.json({ success: true, products });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};


// Find by Product Code
const findProductByCode = async (req, res) => {
  try {
    const { product_code } = req.body;

    if (!product_code) {
      return res.status(400).json({
        success: false,
        message: "Product code required",
      });
    }

    const product = await productService.findProductService(product_code);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Product found",
      data: product,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// Delete Product
const deleteProductById = async (req, res) => {
  try {

    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Product ID required",
      });
    }

    const deleted = await productService.deleteProductByIdService(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Product deleted successfully",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


module.exports = {
  addProduct,
  listproduct,
  findProductByCode,
  deleteProductById,
};