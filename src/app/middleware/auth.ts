import dbConnect from "@/lib/db";
import { VerifyToken } from "@/shared/Constant";
import { NextResponse, NextRequest } from "next/server";

export const AuthMiddleware = async (req: NextRequest) => {
  await dbConnect();
  try {
    const reqData = await req.json();
    const authToken = reqData.header("authorization");

    if (!authToken) {
      return NextResponse.json(
        { success: false, error: "Access Denied. No token provided." },
        { status: 401 }
      );
    }

    const token = authToken.split(" ")[1];

    const tokenValidation = await VerifyToken(token);
    reqData.user = tokenValidation;
  } catch {
    return NextResponse.json(
      { success: false, error: "Access Denied. No token provided." },
      { status: 401 }
    );
  }
};

export const config = {
  matcher: "/api/user/:id",
};
