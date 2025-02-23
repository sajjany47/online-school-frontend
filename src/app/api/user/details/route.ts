import dbConnect from "@/lib/db";
import User from "@/modal/Users.Model";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  await dbConnect();

  try {
    const reqData = await req.json();
    if (reqData._id) {
      const userDetails = await User.findById(
        new mongoose.Types.ObjectId(reqData._id)
      ); // ✅ Fix: Use `findById`

      if (!userDetails) {
        return NextResponse.json(
          { success: false, error: "User not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { success: true, data: userDetails },
        { status: 200 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
};
