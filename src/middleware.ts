import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { VerifyToken } from "./shared/Constant";

export async function middleware(req: NextRequest) {
  // Define protected API routes
  const protectedRoutes: string[] = [];

  if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json(
        { message: "Unauthorized - No token provided" },
        { status: 401 }
      );
    }

    try {
      const token = authHeader.split(" ")[1];
      const decoded = await VerifyToken(token);

      return NextResponse.json({ message: "Protected data", user: decoded });
    } catch (error: any) {
      console.log(error);
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 401 }
      );
    }
  }

  return NextResponse.next(); // Allow all other routes without validation
}
