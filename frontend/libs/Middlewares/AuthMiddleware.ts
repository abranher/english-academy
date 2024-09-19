import { NextRequest, NextResponse } from "next/server";
import { ROOT } from "../routes";

export const AuthMiddleware = (
  req: NextRequest,
  isAuthenticated: boolean,
  isPublicRoute: boolean
) => {
  if (!isAuthenticated && !isPublicRoute)
    return NextResponse.redirect(new URL(ROOT, req.nextUrl));
};
