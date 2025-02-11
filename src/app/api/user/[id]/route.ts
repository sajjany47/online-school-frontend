import dbConnect from "@/lib/db";
import User from "@/modal/User.Model";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  await dbConnect();

  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "User ID is required" },
        { status: 400 }
      );
    }
    const userDetails = await User.findOne({
      _id: new mongoose.Types.ObjectId(id),
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
