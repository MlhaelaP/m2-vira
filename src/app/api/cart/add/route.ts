import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/productModel";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connect();

    const body = await request.json();
    const { productState, email } = body;

    const product = await Product.findOne({ _id: productState.id });
    const user = await User.findOne({ email: email });

    if (!product || !user) {
      throw new Error("Invalid request!");
    }

    if (
      user.cart.some(
        (item: any) =>
          item.id === productState.id &&
          item.color === productState.color &&
          item.size === productState.size
      )
    ) {
      throw new Error("Product is already in your cart!");
    }

    user.cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      color: productState.color,
      size: productState.size,
      isOrdered: false,
    });

    await user.save();

    return NextResponse.json({
      message: "Product added to cart!",
      status: 200,
    });
  } catch (err: any) {
    return NextResponse.json({ message: err.message, status: 500 });
  }
}
