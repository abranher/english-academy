import { auth } from "@/config/auth";
import { ROUTES } from "@/libs/routes";
import { Roles } from "@/types/enums/Roles";
import { NextResponse } from "next/server";
import { AuthMiddleware } from "@/libs/Middlewares";

export default auth((req) => {
  const { nextUrl } = req;
  const isAuthenticated = !!req.auth;
  const isPublicRoute = ROUTES.PUBLIC.includes(nextUrl.pathname);
  const role = req.auth?.user.role;

  AuthMiddleware(req, isAuthenticated, isPublicRoute);

  // guest for admin
  if (isAuthenticated && isPublicRoute && role === Roles.ADMIN) {
    return Response.redirect(new URL(ROUTES.ADMIN.DEFAULT_REDIRECT, nextUrl));
  }

  // guest for student
  if (isAuthenticated && isPublicRoute && role === Roles.STUDENT) {
    return Response.redirect(new URL(ROUTES.STUDENT.DEFAULT_REDIRECT, nextUrl));
  }

  // Verificar si el usuario tiene permiso para acceder a la ruta
  if (
    !(role === Roles.ADMIN) &&
    ROUTES.ADMIN.ROUTES.includes(nextUrl.pathname)
  ) {
    return NextResponse.json({ message: "Acceso denegado" }, { status: 403 });
  }

  // Verificar si el usuario tiene permiso para acceder a la ruta
  if (
    !(role === Roles.STUDENT) &&
    ROUTES.STUDENT.ROUTES.includes(nextUrl.pathname)
  ) {
    return NextResponse.json({ message: "Acceso denegado" }, { status: 403 });
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
