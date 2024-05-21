import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connect();

    const { name, email } = await req.json();

    const user = await User.findOne({ email });

    if (!user) {
      const newUser = new User({
        username: name,
        email,
      });

      await newUser.save();
    }

    return NextResponse.json({
      status: 200,
      message: "Sign In was successful!",
    });
  } catch (err: any) {
    return NextResponse.json({ message: err.message, status: 500 });
  }
}
