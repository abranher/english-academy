import { auth } from "@/config/auth";
import { ADMIN, PUBLIC_ROUTES, STUDENT } from "@/libs/routes";
import { Roles } from "@/types/enums/Roles";
import { NextResponse } from "next/server";
import { AuthMiddleware } from "@/libs/Middlewares";

export default auth((req) => {
  const { nextUrl } = req;
  const isAuthenticated = !!req.auth;
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);
  const role = req.auth?.user.role;

  AuthMiddleware(req, isAuthenticated, isPublicRoute);

  // guest for admin
  if (isAuthenticated && isPublicRoute && role === Roles.ADMIN) {
    return Response.redirect(new URL(ADMIN.DEFAULT_REDIRECT, req.nextUrl));
  }

  // guest for student
  if (isAuthenticated && isPublicRoute && role === Roles.STUDENT) {
    return Response.redirect(new URL(STUDENT.DEFAULT_REDIRECT, req.nextUrl));
  }

  if (!(role === Roles.ADMIN) && ADMIN.ROUTES.includes(nextUrl.pathname)) {
    return NextResponse.json({ message: "Acceso denegado" }, { status: 403 });
  }

  if (!(role === Roles.STUDENT) && STUDENT.ROUTES.includes(nextUrl.pathname)) {
    return NextResponse.json({ message: "Acceso denegado" }, { status: 403 });
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
