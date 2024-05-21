import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/productModel";
import User from "@/models/userModel";
import Favorites from "@/models/favoritesModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connect();

    const body = await request.json();
    const { _id, email } = body;

    const product = await Product.findOne({ _id });
    const user = await User.findOne({ email: email });

    if (!product || !user) {
      throw new Error("Invalid request!");
    }

    const fav = await Favorites.findOne({
      userId: user._id,
      productId: product._id,
    });

    if (!fav) {
      throw new Error("This product is not in your favorites!");
    }

    await Favorites.deleteOne(fav);

    return NextResponse.json({
      message: "Product removed from favorites!",
      status: 200,
    });
  } catch (err: any) {
    return NextResponse.json({ message: err.message, status: 500 });
  }
}
