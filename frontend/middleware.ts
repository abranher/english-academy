import { NextResponse } from "next/server";
import { auth } from "@/config/auth";
import { ADMIN, PUBLIC_ROUTES, ROOT, STUDENT, TUTOR } from "@/libs/routes";
import { Roles } from "@/types/enums/Roles";

export default auth((req) => {
  const { nextUrl } = req;
  const isAuthenticated = !!req.auth;
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);
  const role = req.auth?.user.role;
  const isEmailVerified = req.auth?.user.emailVerifiedAt;
  const initialTestTaken = req.auth?.user.student?.initialTestAt;

  if (!isAuthenticated && !isPublicRoute)
    return NextResponse.redirect(new URL(ROOT, req.nextUrl));

  // guest for student
  // if (isAuthenticated && isPublicRoute && role === Roles.STUDENT) {
  //   return Response.redirect(new URL(STUDENT.DEFAULT_REDIRECT, req.nextUrl));
  // }

  if (isAuthenticated) {
    // Check email verification for all authenticated users
    // if (!isEmailVerified) {
    //  return NextResponse.redirect(new URL("/verify-email", req.nextUrl)); // Redirect to a verification page
    // }

    // Specific checks for students:
    if (
      role === Roles.STUDENT &&
      !initialTestTaken &&
      !nextUrl.pathname.startsWith("/students/initial-test")
    ) {
      // Exclude the initial test route itself
      return NextResponse.redirect(
        new URL("/students/initial-test", req.nextUrl)
      ); // Redirect to the initial test page
    }

    //Now you can safely check the routes
    if (isPublicRoute && role === Roles.ADMIN) {
      return NextResponse.redirect(
        new URL(ADMIN.DEFAULT_REDIRECT, req.nextUrl)
      );
    }

    if (!(role === Roles.ADMIN) && ADMIN.ROUTES.includes(nextUrl.pathname)) {
      return NextResponse.json({ message: "Not Found" }, { status: 404 });
    }

    if (
      !(role === Roles.STUDENT) &&
      STUDENT.ROUTES.includes(nextUrl.pathname)
    ) {
      return NextResponse.json({ message: "Not Found" }, { status: 404 });
    }

    if (!(role === Roles.TUTOR) && TUTOR.ROUTES.includes(nextUrl.pathname)) {
      return NextResponse.json({ message: "Not Found" }, { status: 404 });
    }
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
