import dbConnect from "@/lib/db";
import User from "@/modal/User.Model";
import mongoose from "mongoose";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  await dbConnect();
  try {
    console.log(req);
    const userDetails = await User.findOne({
      _id: new mongoose.Types.ObjectId("6784b2352ca2b377418fa1f8"),
    });
    if (userDetails) {
      return NextResponse.json(
        {
          success: true,
          data: userDetails,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
};
