import { NextRequest, NextResponse } from "next/server";
import { VerifyToken } from "./shared/Constant";

export function middleware(req: NextRequest) {
  // Exclude the login route from authentication
  if (req.nextUrl.pathname === "/api/user/login") {
    return NextResponse.next();
  }

  const token = req.headers.get("Authorization")?.split(" ")[1];

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const decoded = VerifyToken(token);
  if (!decoded) {
    return NextResponse.json({ message: "Invalid token" }, { status: 403 });
  }

  // Create a new request with the modified headers
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("user", JSON.stringify(decoded));

  return NextResponse.next({
    request: {
      headers: requestHeaders, // Pass modified headers
    },
  });
}

// Apply middleware to protected routes
export const config = {
  matcher: ["/api/user/:path*"], // Apply middleware to /api/user/:id but NOT to /api/user/login
};
