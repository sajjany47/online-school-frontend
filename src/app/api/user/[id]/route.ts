import dbConnect from "@/lib/db";
import User from "@/modal/Users.Model";
import mongoose from "mongoose";
import { NextResponse, NextRequest } from "next/server";

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

    const userDetails = await User.findById(new mongoose.Types.ObjectId(id));

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
  } catch (error: any) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
};
