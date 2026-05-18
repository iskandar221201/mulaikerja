import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  // Use next-auth/jwt to check the token without importing lib/auth.ts
  // This avoids Prisma and bcrypt Edge runtime errors
  const token = await getToken({ 
    req, 
    secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET 
  });
  
  if (!token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/employer/:path*", "/seeker/:path*"],
};
