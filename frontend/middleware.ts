import { NextResponse } from "next/server";
import { auth } from "@/config/auth";
import { ADMIN, PUBLIC_ROUTES, ROOT, STUDENT } from "@/libs/routes";
import { Roles } from "@/types/enums/Roles";

export default auth((req) => {
  const { nextUrl } = req;
  const isAuthenticated = !!req.auth;
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);
  const role = req.auth?.user.role;

  if (!isAuthenticated && !isPublicRoute)
    return NextResponse.redirect(new URL(ROOT, req.nextUrl));

  // guest for admin
  if (isAuthenticated && isPublicRoute && role === Roles.ADMIN) {
    return Response.redirect(new URL(ADMIN.DEFAULT_REDIRECT, req.nextUrl));
  }

  // guest for student
  if (isAuthenticated && isPublicRoute && role === Roles.STUDENT) {
    return Response.redirect(new URL(STUDENT.DEFAULT_REDIRECT, req.nextUrl));
  }

  if (!(role === Roles.ADMIN) && ADMIN.ROUTES.includes(nextUrl.pathname)) {
    return NextResponse.json({ message: "Not Found" }, { status: 404 });
  }

  if (!(role === Roles.STUDENT) && STUDENT.ROUTES.includes(nextUrl.pathname)) {
    return NextResponse.json({ message: "Not Found" }, { status: 404 });
  }
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
