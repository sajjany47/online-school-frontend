import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { SecretKey } from "./shared/Constant";

const SECRET_KEY = SecretKey;

// Paths that require token validation
const protectedPaths = ["/api/user/:path*"];

export async function middleware(req: NextRequest) {
  if (protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
    const token = await getToken({ req, secret: SECRET_KEY });
    console.log("Token:", token); // Debugging line
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/user/:path*"],
};
