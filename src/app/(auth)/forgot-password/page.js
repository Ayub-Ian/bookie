import React from "react";


import { NavLink } from "@/lib/router-events";
import { Button } from "@/components/ui/button";
import ForgotPassword from "@/components/auth/forgot-password";


export default function ForgotPasswordPage() {

  

  return (
    <>
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
        Get password reset link
      </h2>

      <ForgotPassword />

      <NavLink href="/login">
          <Button size="md" variant="link" className="px-1 w-full mt-5 justify-center">
       
        Back to Login
      </Button>
          </NavLink>
    </>
  );
}
