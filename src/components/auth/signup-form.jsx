"use client";
import React from "react";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "@/lib/schema";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SignupForm() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
    },
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = async (data) => {
    try {
      const { error: e } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
          data: {
            email: data.email,
            name: data.fullname,
          },
        },
      });

      if (e) {
        toast.error(
          "Oops! Something bad happened. Try again in a few minutes.",
          {
            position: "top-right",
          }
        );
        throw new Error(e);
      } else {
        toast.message("Account created successfully", {
          description: "Please check your email for further instructions",
          position: "top-right",
        });
        router.push("/login");
      }
    } catch (error) {
      toast.error("Oops! Something bad happened. Try again in a few minutes.", {
        position: "top-right",
      });
      console.error(error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-full w-full"
        method="post"
      >
        <div className="w-full space-y-6">
          <div>
            <Label htmlFor="fullname">Full Name</Label>
            <div className="mt-2">
              <Controller
                name="fullname"
                control={control}
                render={({ field }) => (
                  <Input
                    id="fullname"
                    type="text"
                    placeholder="Michael Scott"
                    error={errors.fullname?.message}
                    {...field}
                    className="text-base md:text-sm"
                  />
                )}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="email">Email address</Label>
            <div className="mt-2">
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    id="email"
                    type="email"
                    placeholder="michael@scott.com"
                    autoComplete="email"
                    error={errors.email?.message}
                    className="text-base md:text-sm"
                    {...field}
                  />
                )}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
            </div>
            <div className="mt-2">
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    autoComplete="new-password"
                    className="text-base md:text-sm"
                    {...field}
                  />
                )}
              />
            </div>

            <span className="text-xs text-muted-foreground leading-none">
              Make sure it has: UPPERCASE, lowercase, digit, 8 characters long
            </span>
          </div>

          <Button
            disabled={!isValid}
            className="w-full text-base md:text-sm"
            type="submit"
          >
            {isSubmitting && <Loader className="mr-2 h-4 w-4 animate-spin" />}
            Create account
          </Button>
        </div>
      </form>
    </>
  );
}
