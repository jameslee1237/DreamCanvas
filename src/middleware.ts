import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse, NextRequest } from "next/server";
 
export default authMiddleware({
  publicRoutes: ["/"],
  ignoredRoutes: ['/api/webhooks(.*)'],
  afterAuth(auth, req, evt) {
    if (auth.userId && (req.nextUrl.pathname === "/sign-in" || req.nextUrl.pathname === "/sign-up")) {
      return NextResponse.redirect(new URL('/main', req.url));
    }

    // if (!auth.userId && (req.url.includes("/main") || req.url.includes("/message") || req.url.includes("/user-page"))){
    //   return NextResponse.redirect(new URL('/', req.url))
    // }

    // if (auth.userId && req.nextUrl.pathname === "/") {
    //   return NextResponse.redirect(new URL('/main', req.url));
    // }
  }
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};