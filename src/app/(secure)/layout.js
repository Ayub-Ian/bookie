import AuthenticatedClientLayout from "@/components/layouts/authenticated-layout";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function AuthenticatedLayout({ children }) {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();

  if (!data?.session) {
    redirect("/login");
  }

  return (
    <>
      <AuthenticatedClientLayout>{children}</AuthenticatedClientLayout>
    </>
  );
}
