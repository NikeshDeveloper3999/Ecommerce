const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  ratings: { type: Number, enum: [1, 2, 3, 4, 5] },
  feedback: { type: String },
  reviewerName: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  productMediaData: { type: String },
});

const productSchema = new mongoose.Schema(
  {
    product_code: { type: String, unique: true, required: true },
    product_name: { type: String, required: true },
    product_category: { type: String },
    product_subcategory: { type: String },
    product_mrp: { type: Number, required: true },
    product_discount: { type: Number, default: 0 },
    product_discount_price: { type: Number },
    product_brand_name: { type: String },
    product_sellers: { type: mongoose.Schema.Types.ObjectId, ref: "seller" },
    product_description: { type: String },
    product_mfg_date: { type: Date },
    product_expiry_date: { type: Date },
    product_quantity: { type: Number, default: 0 },
    product_size: { type: [String], default: [] },
    product_image: { type: [String], default: [] },
    product_color: { type: [String], default: [] },
    product_material: { type: [String], default: [] },
    product_weight: { type: [String], default: [] },
    product_ratings: [feedbackSchema],
    product_warranty: { type: String },
    product_return_type: { type: String, enum: ["Exchange", "Return", "No Return"], default: "Exchange" },
    product_return_policy: { type: String },
    product_buy_limit: { type: Number, default: 0 },
    product_expected_delivery_date: { type: Date },
    product_terms_conditions: { type: String },
    product_emi_availability: { type: Boolean, default: false },
    bestseller: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", productSchema);