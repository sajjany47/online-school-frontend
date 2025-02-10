import { NextRequest, NextResponse } from "next/server";
import { VerifyToken } from "./shared/Constant";

export function middleware(req: NextRequest) {
  const token =
    req.cookies.get("token")?.value ||
    req.headers.get("Authorization")?.split(" ")[1];

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const decoded = VerifyToken(token);
  if (!decoded) {
    return NextResponse.json({ message: "Invalid token" }, { status: 403 });
  }

  // Attach user info to request headers
  req.headers.set("user", JSON.stringify(decoded));
  return NextResponse.next();
}

// Apply middleware to protected routes
export const config = {
  matcher: ["/api/protected/:path*"], // Apply middleware to API routes that need protection
};
