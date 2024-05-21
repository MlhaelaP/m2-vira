import mongoose from "mongoose";

const favoritesSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "Please provide userId!"],
  },
  productId: {
    type: String,
    required: [true, "Please provide productId!"],
  },
});

const Favorites =
  mongoose.models.favorites || mongoose.model("favorites", favoritesSchema);

export default Favorites;
