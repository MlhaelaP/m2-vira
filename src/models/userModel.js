import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username!"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an email!"],
    unique: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  cart: [
    {
      id: String,
      title: String,
      price: Number,
      color: String,
      size: String,
    },
  ],
  orders: [
    {
      title: String,
      price: Number,
      color: String,
      size: String,
    },
  ],
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
