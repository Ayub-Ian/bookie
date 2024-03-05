"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { updatePasswordSchema } from "@/lib/schema";
import { toast } from "sonner";

export default function UpdatePasswordForm() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    defaultValues: {
      password: "",
      cpassword: "",
    },
    mode: "onTouched",
    resolver: yupResolver(updatePasswordSchema),
  });

  const supabase = createClientComponentClient();
  const [error, setErrorMsg] = React.useState(null);
  const router = useRouter();

  return (
    <>
      <form
        onSubmit={handleSubmit(async (formData) => {
          try {
            const { error } = await supabase.auth.updateUser({
              password: formData.password,
            });

            if (error) {
              setErrorMsg(error.message);
            } else {
              toast.message("Password updated successfully");
              // Go to Home page
              router.replace("/");
            }
          } catch (error) {
            toast.error(
              "Oops! Something bad happened. Try again in a few minutes."
            );
            throw new Error(error);
          }
        })}
        className="space-y-6"
        method="post"
      >
        <div>
          {error && (
            <div className="bg-destructive text-destructive-foreground py-2 ps-3 mb-3 rounded-md text-sm border border-red-700">
              {error}. Try again.
            </div>
          )}

          <Label htmlFor="password">New Password</Label>
          <div className="my-2">
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="text-base md:text-sm"
                  {...field}
                />
              )}
            />
          </div>
          {errors.password?.message && (
            <div className="bg-destructive text-destructive-foreground px-4 py-2 text-sm rounded-md">
              {errors.password.message}
            </div>
          )}

          <Label htmlFor="confirm-password">Confirm Password</Label>
          <div className="mt-2">
            <Controller
              name="cpassword"
              control={control}
              render={({ field }) => (
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="text-base md:text-sm"
                  {...field}
                />
              )}
            />
          </div>
        </div>
        {errors.cpassword?.message && (
          <p className="bg-destructive text-destructive-foreground px-4 py-2 text-sm rounded-md">
            {errors.cpassword.message}
          </p>
        )}

        <div className="space-y-4">
          <Button disabled={!isValid || isSubmitting} className="w-full" type="submit">
            {isSubmitting && <Loader className="mr-2 h-4 w-4 animate-spin" />}
            Update Password
          </Button>
        </div>
      </form>
    </>
  );
}
