import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { from, subject, message } = body;

    if (from.length === 0 || subject.length === 0 || message.length === 0) {
      throw new Error("All the fields are required!");
    }

    return NextResponse.json({
      message: "Message has been sent!",
      status: 200,
    });
  } catch (err: any) {
    return NextResponse.json({
      message: err.message,
      status: 500,
    });
  }
}
