import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const isOnboardingRoute = createRouteMatcher(["/onboarding"]);
const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"]);
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isHRRoute = createRouteMatcher(["/hr(.*)"]);
const isEmployeeRoute = createRouteMatcher(["/employee(.*)"]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { userId, sessionClaims, redirectToSignIn } = await auth();

  // For users visiting /onboarding, don't try to redirect
  if (userId && isOnboardingRoute(req)) {
    return NextResponse.next();
  }

  // If the user isn't signed in and the route is private, redirect to sign-in
  if (!userId && !isPublicRoute(req))
    return redirectToSignIn({ returnBackUrl: req.url });

  // Catch users who do not have `onboardingComplete: true` in their publicMetadata
  // Redirect them to the /onboarding route to complete onboarding
  if (userId && !sessionClaims?.metadata?.onboardingComplete) {
    const onboardingUrl = new URL("/onboarding", req.url);
    return NextResponse.redirect(onboardingUrl);
  }

  // Handle role-based redirects for the root path
  if (
    userId &&
    req.nextUrl.pathname === "/" &&
    sessionClaims?.metadata?.onboardingComplete
  ) {
    const userRole = sessionClaims?.metadata?.role;

    switch (userRole) {
      case "admin":
        return NextResponse.redirect(new URL("/admin", req.url));
      case "hr":
        return NextResponse.redirect(new URL("/hr", req.url));
      case "employee":
        return NextResponse.redirect(new URL("/employee", req.url));
      default:
        return NextResponse.redirect(new URL("/onboarding", req.url));
    }
  }

  // Role-based route protection
  if (userId && sessionClaims?.metadata?.onboardingComplete) {
    const userRole = sessionClaims.metadata.role;

    // Protect admin routes
    if (isAdminRoute(req) && userRole !== "admin") {
      const dashboardUrl = new URL(`/${userRole}`, req.url);
      return NextResponse.redirect(dashboardUrl);
    }

    // Protect HR routes
    if (isHRRoute(req) && userRole !== "hr") {
      const dashboardUrl = new URL(`/${userRole}`, req.url);
      return NextResponse.redirect(dashboardUrl);
    }

    // Protect Employee routes
    if (isEmployeeRoute(req) && userRole !== "employee") {
      const dashboardUrl = new URL(`/${userRole}`, req.url);
      return NextResponse.redirect(dashboardUrl);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
