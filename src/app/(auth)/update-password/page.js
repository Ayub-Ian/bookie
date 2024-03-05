import UpdatePasswordForm from '@/components/auth/form/update-password'
import React from 'react'

export default function UpdatePasswordPage() {
  return (
    <>
     <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
        Update your password
      </h2>
      <div className="mt-10 w-full sm:mx-auto">
      <UpdatePasswordForm />
      </div>
      
    </>
  )
}
