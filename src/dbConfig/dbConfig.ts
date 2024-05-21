import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
