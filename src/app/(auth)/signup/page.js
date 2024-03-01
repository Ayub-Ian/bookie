import React from "react";
import { Button } from "@/components/ui/button";
import GoogleLogo from "@/components/shared/icons/google";
import Link from "next/link";
import { NavLink } from "@/lib/router-events";
import SignupForm from "@/components/auth/signup-form";


export default function SignUpPage() {
  


 
  
 

  return (
    <>
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight ">
        Create new account
      </h2>
      <div className="mt-10 w-full sm:mx-auto">

        <SignupForm   />

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
              <GoogleLogo height={18} /> <span>Sign up with Google</span>
            </span>
          </Button>
        </form>

        <div className="mt-5 flex justify-center">
          <p className="flex-grow text-center text-sm text-muted-foreground">
            Already a member?{" "}
            <NavLink href="/login">
              <Button size="md" variant="link" className="px-1">
                Sign in
              </Button>
            </NavLink>
          </p>
        </div>
      </div>

      <div className="text-center text-sm mt-5 text-muted-foreground leading-normal ">
        By proceeding, you agree to our&nbsp;
        <Link
          className="underline hover:text-black dark:hover:text-white"
          target="_blank"
          href="#"
        >
          <span>Terms of service</span>
        </Link>
        &nbsp; and&nbsp;
        <Link
          className="underline hover:text-black dark:hover:text-white"
          target="_blank"
          href="#"
        >
          <span>Privacy Policy</span>
        </Link>
        .
      </div>
    </>
  );
}
