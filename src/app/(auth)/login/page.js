import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import GoogleLogo from "@/components/shared/icons/google";
import { Loader } from "lucide-react";

export default function LoginPage() {
  return (
    <>
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
        Sign in to your account
      </h2>
      <div className="mt-10 w-full sm:mx-auto">
        <form className="space-y-6" method="post">
          <div>
            <Label htmlFor="email">Email address</Label>
            <div className="mt-2">
              <Input
                placeholder="michael@scott.com"
                id="email"
                type="email"
                autoComplete="email"
                className="text-base md:text-sm"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
            </div>
            <div className="mt-2">
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                className="text-base md:text-sm"
              />
            </div>
          </div>

          <Button className="w-full text-base md:text-sm" type="submit">
            <Loader className="mr-2 h-4 w-4 animate-spin" />
            Sign in
          </Button>
        </form>

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
            <Link href="/signup">
              <Button size="md" variant="link" className="px-1">
                Sign up
              </Button>
            </Link>
          </p>
          <Link href="/forgot-password">
            <Button variant="link" size="md">
              Forgot Password
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
