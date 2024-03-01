"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "lucide-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/lib/schema";

export default function LoginForm() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [error, setError] = React.useState(null);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
  });

  async function signIn(formData) {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        setError(error.message);
      } else {
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <form className="space-y-6" onSubmit={handleSubmit(signIn)} method="post">
        {error && (
          <div className="bg-destructive text-destructive-foreground py-2 ps-3 rounded-md text-sm border border-red-700">
            {error}. Try again.
          </div>
        )}

        <div>
          <Label htmlFor="email">Email address</Label>
          <div className="mt-2">
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="michael@scott.com"
                  id="email"
                  type="email"
                  autoComplete="email"
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
                  autoComplete="current-password"
                  className="text-base md:text-sm"
                  {...field}
                />
              )}
            />
          </div>
        </div>

        <Button
          disabled={!isValid}
          className="w-full text-base md:text-sm"
          type="submit"
        >
          {isSubmitting && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          Sign in
        </Button>
      </form>
    </>
  );
}
