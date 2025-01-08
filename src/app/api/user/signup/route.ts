import dbConnect from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  await dbConnect();

  try {
    const reqData = await req.json();
    console.log(reqData);

    return NextResponse.json({ success: true, data: reqData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
};
