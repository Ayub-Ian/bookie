import React from "react";
import { Button } from "@/components/ui/button";
import GoogleLogo from "@/components/shared/icons/google";
import { NavLink } from "@/lib/router-events";
import LoginForm from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <>
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
        Sign in to your account
      </h2>
      <div className="mt-10 w-full sm:mx-auto">
      
      <LoginForm />

        <div className="my-6">
          <div className="relative flex items-center">
            <div className=" flex-grow border-t"></div>
            <span className="text-muted-foreground leading-none mx-2 flex-shrink text-xs uppercase font-light ">
              Or continue with
            </span>
            <div className=" flex-grow border-t"></div>
          </div>
        </div>

        <form action="/auth/google" method="post" className="mt-4">
          <Button className="w-full" type="submit" variant="outline">
            <span className="flex items-center space-x-2">
              <GoogleLogo height={18} /> <span>Sign in with Google</span>
            </span>
          </Button>
        </form>
        <div className="mt-5 flex items-center justify-between">
          <p className="flex-grow text-sm text-muted-foreground">
            Not a member?{" "}
            <NavLink href="/signup">
              <Button size="md" variant="link" className="px-1">
                Sign up
              </Button>
            </NavLink>
          </p>
          <NavLink href="/forgot-password">
            <Button variant="link" size="md">
              Forgot Password
            </Button>
          </NavLink>
        </div>
      </div>
    </>
  );
}
