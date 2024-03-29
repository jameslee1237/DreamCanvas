import { authMiddleware } from "@clerk/nextjs";
import { NextResponse, NextRequest } from "next/server";
 
export default authMiddleware({
  publicRoutes: ['/', '/sign-in', '/sign-up'],
  ignoredRoutes: ['/no-auth-in-this-route'],
  afterAuth(auth, req, evt) {
    if (auth.userId && (req.nextUrl.pathname === "/sign-in" || req.nextUrl.pathname === "/sign-up")) {
      return NextResponse.redirect(new URL('/main', req.url));
    }

    if (!auth.userId && req.url.includes("/main")) {
      return NextResponse.redirect(new URL('/', req.url))
    }

    if (auth.userId && req.nextUrl.pathname === "/") {
      return NextResponse.redirect(new URL('/main', req.url));
    }
  }
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};