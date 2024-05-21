import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/productModel";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      description,
      price,
      materials,
      sizes,
      colors,
      tags,
      images,
    } = body;

    const product = await Product.findOne({ title });

    if (!product) {
      return NextResponse.json({
        message: "Product was not found!",
        status: 404,
      });
    }

    await Product.findOneAndUpdate(
      { title },
      { title, description, price, materials, sizes, colors, tags, images }
    );

    return NextResponse.json({
      message: "Product updated successfully!",
      status: 200,
    });
  } catch (err: any) {
    return NextResponse.json({ message: err.message, status: 500 });
  }
}
