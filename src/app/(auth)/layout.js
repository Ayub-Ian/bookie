import { Logo } from "@/components/shared/icons/logo";
import { NavLink } from "@/lib/router-events";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function AuthLayout({ children }) {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();

  if (data?.session) {
    redirect('/');
  }
  return (
    <>
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="flex flex-col items-center justify-center sm:mx-auto sm:w-full sm:max-w-sm">
            {/* TODO: figure out better way to use light and dark logos */}
            <div className="flex items-center space-x-2">
              <NavLink href="/"><Logo className="h-6" /></NavLink>
              
            </div>

            {children}
          </div>
        </div>
      </>
    </>
  );
}
