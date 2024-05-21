import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/productModel";
import { connect } from "@/dbConfig/dbConfig";

export async function POST(request: NextRequest) {
  try {
    await connect();

    const body = await request.json();
    const { id } = body;

    const product = await Product.findOne({ _id: id });

    if (!product) {
      return NextResponse.json({
        message: "Product was not found!",
        status: 404,
      });
    }

    return NextResponse.json({
      message: "Product retrieved successfully!",
      status: 200,
      product,
    });
  } catch (err: any) {
    return NextResponse.json({ message: err.message, status: 500 });
  }
}
