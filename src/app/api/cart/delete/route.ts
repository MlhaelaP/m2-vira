import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connect();

    const body = await request.json();
    const { id, email } = body;

    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error("Unauthorized!");
    }

    user.cart = user.cart.filter((p: any) => p.id !== id);
    await user.save();

    return NextResponse.json({
      message: "Product removed from cart!",
      status: 200,
    });
  } catch (err: any) {
    return NextResponse.json({ message: err.message, status: 500 });
  }
}
