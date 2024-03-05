"use client"
import React from 'react'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { emailSchema } from '@/lib/schema';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function ForgotPasswordForm({ submission }) {
    const {
        control,
        handleSubmit,
        formState: { errors, isValid, isSubmitting },
      } = useForm({
        defaultValues: {
          email: "",
          password: "",
        },
        resolver: yupResolver(emailSchema),
      });

      const supabase = createClientComponentClient();
      const [error, setErrorMsg] = React.useState(null);
  return (
    <>
    <form onSubmit={handleSubmit(async (formData) => {
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
                redirectTo: `${location.origin}/update-password`,
              });

              if (error) {
                console.error({error})
                setErrorMsg(error.message);
              } else {
                submission(formData.email)
              }
            
        } catch (error) {
            console.log(error)
        }
          
          
           
        
    })} className="space-y-6" method="post">

            <div>
            {error && (
          <div className="bg-destructive text-destructive-foreground py-2 ps-3 mb-3 rounded-md text-sm border border-red-700">
            {error}. Try again.
          </div>
        )}
              <Label htmlFor="email">Email address</Label>
              <div className="mt-2">
              <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="michael@scott.com"
                  className="text-base md:text-sm"
                  {...field}
                /> )} />
              </div>
            </div>

            <div className="space-y-4">
              <Button disabled={!isValid || isSubmitting} className="w-full" type="submit">
                 {isSubmitting && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                Request Reset Link
              </Button>
            </div>
          </form>
    </>
  )
}
