import dbConnect from "@/lib/db";
import User from "@/modal/User.Model";
import mongoose from "mongoose";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  await dbConnect();

  try {
    console.log("API called");

    const { id } = params; // ✅ Fix: No need to await params
    console.log("User ID:", id);

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid or missing User ID" },
        { status: 400 }
      );
    }

    const userDetails = await User.findById(id); // ✅ Fix: Use `findById`

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
