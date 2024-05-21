import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide title!"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "Please provide description!"],
  },
  price: {
    type: Number,
    required: [true, "Please provide price!"],
    min: 0.0,
    max: 999.99,
  },
  createdAt: {
    type: Date,
    required: [true, "Please provide 'createdAt' date!"],
  },
  materials: [String],
  sizes: [String],
  colors: [String],
  tags: [String],
});

const Product =
  mongoose.models.products || mongoose.model("products", productSchema);

export default Product;
