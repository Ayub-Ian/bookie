"use client"
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GoogleLogo from "@/components/shared/icons/google";
import Link from "next/link";
import { Loader } from "lucide-react";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useForm, Controller } from "react-hook-form"

const getCharacterValidationError = (str) => {
  return `must have at least 1 ${str} character`;
};

const SignUpSchema = yup.object().shape({
  fullname: yup.string().required("Field is required"),
  email: yup.string().email("Invalid email").required("Field is required"),
  password: yup.string()
    .required("Field is required")
    .min(8, "Password must have at least 8 characters")
    .matches(/[0-9]/, getCharacterValidationError("digit"))
    .matches(/[Link-z]/, getCharacterValidationError("lowercase"))
    .matches(/[A-Z]/, getCharacterValidationError("uppercase"))
});



export default function SignUpPage() {
  const { control, handleSubmit, formState: { errors, isValid, isSubmitting }, } = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      password: ""
    },
    resolver: yupResolver(SignUpSchema),
  })
  const onSubmit = (data) => console.log(data)

  console.log({errors})
  console.log({isValid})

  return (
    <>
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight ">
        Create new account
      </h2>
      <div className="mt-10 w-full sm:mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="h-full w-full" method="post">
          <div className="w-full space-y-6">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <div className="mt-2">
              <Controller
        name="fullname"
        control={control}
        render={({ field }) => 
                <Input
                  id="fullname"
                  type="text"
                  placeholder="Michael Scott"
                  error={errors.fullname?.message}
                  {...field}
                  className="text-base md:text-sm"
                />
              }/>

              </div>
            </div>
            <div>
              <Label htmlFor="email">Email address</Label>
              <div className="mt-2">
              <Controller
        name="email"
        control={control}
        render={({ field }) => 
                <Input
                  id="email"
                  type="email"
                  placeholder="michael@scott.com"
                  autoComplete="email"
                  error={errors.email?.message}
                  className="text-base md:text-sm"
                  {...field}
                /> }/>
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
        render={({ field }) => 

                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className="text-base md:text-sm"
                  {...field}
              
                />  }/>
              </div>
              
                <span className="text-xs text-muted-foreground">Make sure it has: UPPERCASE, lowercase, digit, 8 characters long</span>
              
            </div>

            <Button disabled={!isValid}  className="w-full text-base md:text-sm" type="submit">
             {isSubmitting && <Loader className="mr-2 h-4 w-4 animate-spin" />} 
              Create account
            </Button>
          </div>
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
              <GoogleLogo height={18} /> <span>Sign up with Google</span>
            </span>
          </Button>
        </form>

        <div className="mt-5 flex justify-center">
          <p className="flex-grow text-center text-sm text-muted-foreground">
            Already a member?{" "}
            <Link href="/login">
              <Button size="md" variant="link" className="px-1">
                Sign in
              </Button>
            </Link>
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
