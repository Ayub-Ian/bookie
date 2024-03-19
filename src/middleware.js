import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    // if user is signed in and doesn't have `onboardingComplete: true`, redirect them to the /welcome
    if (!user.user_metadata.onboardingComplete) {
      return NextResponse.redirect(new URL("/welcome", req.url));
    }

    // if user is signed in and the current path is / redirect the user to /account
    if (req.nextUrl.pathname === "/") {
      return NextResponse.redirect(new URL("/calendar", req.url));
    }
  }

  // if user is not signed in and the current path is not / redirect the user to /login
  if (!user && req.nextUrl.pathname !== "/") {
    // Exception f user is trying to reset password allow auth session
    if (req.nextUrl.pathname === "/update-password") {
      return res;
    }

    return NextResponse.redirect(new URL("/login", req.url));
  }

  return res;
}

export const config = {
  matcher: [
    "/",
    "/bookings/(.*)",
    "/calendar/(.*)",
    "/event-types/(.*)",
    "/availability/(.*)",
  ],
};
