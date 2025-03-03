import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose"; // ✅ Use jose for Edge compatibility
import { SecretKey } from "./shared/Constant"; 

export async function middleware(req: NextRequest) {
  const UnProtectedRoutes = ["/api/user/login"];
  const { pathname } = req.nextUrl;
  UnProtectedRoutes.forEach(element => {
    if (pathname === element) {
      return NextResponse.next();
    }
  });
 

  const authHeader = req.headers.get("authorization");
  if (!authHeader) {
    return NextResponse.json(
      { message: "Unauthorized - No token provided" },
      { status: 401 }
    );
  }

  try {
   
    const token = authHeader.split(" ")[1]; // Extract token from header

    // ✅ Convert secret key to Uint8Array
    const secret = new TextEncoder().encode(SecretKey);

    // ✅ Verify token using `jose`
    const { payload } = await jwtVerify(token, secret);
req.user=payload

    // Middleware cannot modify `req`, so pass data via headers or cookies if needed
    return NextResponse.next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 401 }
    );
  }
}

// ✅ Apply middleware only to `/api/*` routes
export const config = {
  matcher: "/api/:path*",
};
