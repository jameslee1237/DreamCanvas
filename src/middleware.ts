import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
 
export default authMiddleware({
  publicRoutes: ['/'],
  ignoredRoutes: ['/no-auth-in-this-route'],

  afterAuth(auth, req, evt) {

    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
  },
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};