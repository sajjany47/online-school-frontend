import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { SecretKey } from "./shared/Constant";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname === "/api/user/login") {
    return NextResponse.next();
  }

  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    return NextResponse.json(
      { message: "Unauthorized - No token provided" },
      { status: 401 }
    );
  }

  try {
    const token:any = req.headers.get('authorization')?.split(' ')[1];
    console.log(token);
    const decoded = jwt.verify(token, SecretKey);
    console.log("decoded===>", decoded);
    req.user = decoded; // Attach user data for further use
    return NextResponse.next();
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 401 }
    );
  }

  return NextResponse.next(); // Allow all other routes without validation
}

// ✅ Apply middleware only to `/api/*` routes
export const config = {
  matcher: "/api/:path*",
};
