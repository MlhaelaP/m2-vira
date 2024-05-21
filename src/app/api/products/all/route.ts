import { NextResponse } from "next/server";
import Product from "@/models/productModel";
import { connect } from "@/dbConfig/dbConfig";

export async function GET() {
  try {
    await connect();

    const products = await Product.find();

    return NextResponse.json({
      message: "All products retrieved.",
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
