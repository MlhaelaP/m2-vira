import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/productModel";
import { connect } from "@/dbConfig/dbConfig";

export async function POST(request: NextRequest) {
  try {
    await connect();

    const body = await request.json();
    const { title, description, price, materials, sizes, colors, tags } = body;

    const product = await Product.findOne({ title });

    if (product) {
      return NextResponse.json({
        message: "Product with this title already exists!",
        status: 403,
      });
    }

    const splittedMaterials: string[] = materials.split(",");
    const splittedSizes: string[] = sizes.split(",");
    const splittedColors: string[] = colors.split(",");
    const splittedTags: string[] = tags.split(",");
    const tl = "";

    const newProduct = new Product({
      title: title.trim(),
      description: description.trim(),
      price,
      materials: splittedMaterials,
      sizes: splittedSizes,
      colors: splittedColors,
      tags: splittedTags,
      createdAt: Date.now(),
    });

    const productResult = await newProduct.save();

    return NextResponse.json({
      message: "Product created successfully!",
      status: 200,
      product: productResult,
    });
  } catch (err: any) {
    return NextResponse.json({ message: err.message, status: 500 });
  }
}
