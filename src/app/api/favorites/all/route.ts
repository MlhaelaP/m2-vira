import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/productModel";
import User from "@/models/userModel";
import Favorites from "@/models/favoritesModel";

export async function POST(request: NextRequest) {
  try {
    await connect();

    const body = await request.json();
    const { email } = body;

    const user = await User.findOne({ email: email });

    const favs = await Favorites.find({
      userId: user._id,
    });

    const products: any[] = [];

    if (favs.length !== 0) {
      await Promise.all(
        favs.map(async (f) => {
          products.push(await Product.findOne({ _id: f.productId }));
        })
      );
    }

    return NextResponse.json({
      message: "Favorites retrieved successfully!",
      status: 200,
      products,
    });
  } catch (err: any) {
    return NextResponse.json({
      message: err.message,
      status: 500,
      products: [],
    });
  }
}
