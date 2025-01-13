import dbConnect from "@/lib/db";
import User from "@/modal/User.Model";
import bcrypt from "bcrypt";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  await dbConnect();

  try {
    const reqData = await req.json();
    const checkUser = await User.findOne({ username: reqData.username });
    if (!checkUser) {
      return NextResponse.json(
        { success: false, error: "User not found!" },
        { status: 404 }
      );
    }
    if (checkUser) {
      if (!checkUser.isActive) {
        return NextResponse.json(
          {
            sucess: false,
            error: "User locked, Contact with admin",
          },
          {
            status: 423,
          }
        );
      }
      const verifyPassword = await bcrypt.compare(
        reqData.password,
        checkUser.password
      );
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
};
