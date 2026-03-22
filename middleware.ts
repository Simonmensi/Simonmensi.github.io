import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    const authHeader = request.headers.get("authorization");

    if (
      !authHeader ||
      !authHeader.startsWith("Basic ") ||
      atob(authHeader.slice(6)) !==
        `${process.env.ADMIN_USER}:${process.env.ADMIN_PASS}`
    ) {
      return new NextResponse("Unauthorized", {
        status: 401,
        headers: { "WWW-Authenticate": 'Basic realm="Admin"' },
      });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
