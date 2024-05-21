import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connect();

    const body = await request.json();
    const { email } = body;

    const user = await User.findOne({ email: email });

    let cart = [];

    if (user && user.cart.length !== 0) {
      cart = user.cart.filter((p: any) => !p.isOrdered);
    }

    return NextResponse.json({
      message: "Cart retrieved!",
      status: 200,
      cart,
    });
  } catch (err: any) {
    return NextResponse.json({ message: err.message, status: 500 });
  }
}
