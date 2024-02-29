import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RocketIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader } from "lucide-react";

export default function ForgotPasswordPage() {
  let lastSubmission = false;
  return (
    <>
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
        Get password reset link
      </h2>
      {!lastSubmission ? (
        <div className="mt-10 w-full sm:mx-auto">
          <form className="space-y-6" method="post">
            <div>
              <Label htmlFor="email">Email address</Label>
              <div className="mt-2">
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="michael@scott.com"
                  className="text-base md:text-sm"
                />
              </div>
            </div>

            <div className="space-y-4">
              <Button className="w-full" type="submit">
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Request Reset Link
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <div className="mx-auto mt-6 max-w-lg">
          <Alert>
            <RocketIcon className="h-4 w-4" />
            <AlertTitle className="text-lg">Link sent successfully!</AlertTitle>
            <AlertDescription className="mt-3 text-sm leading-relaxed">
              Password reset link has been sent to your email. Please check spam
              folder as well
            </AlertDescription>
          </Alert>
        </div>
      )}
    </>
  );
}
