"use client"
import React from 'react'
import ForgotPasswordForm from './form/forgot-password'
import { RocketIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


export default function ForgotPassword() {
    const [submitted, setSubmitted] = React.useState(null)
    
  return (
    <>
        {!submitted ? (
        <div className="mt-10 w-full sm:mx-auto">
          <ForgotPasswordForm submission={setSubmitted} />
          
        </div>
      ) : (
        <div className="mx-auto mt-6 max-w-lg">
          <Alert>
            <RocketIcon className="h-4 w-4" />
            <AlertTitle className="text-lg">Link sent successfully!</AlertTitle>
            <AlertDescription className="mt-3 text-sm leading-relaxed">
              Password reset link has been sent to {submitted}. Please check spam
              folder as well
            </AlertDescription>
          </Alert>
        </div>
      )}
    </>
  )
}
