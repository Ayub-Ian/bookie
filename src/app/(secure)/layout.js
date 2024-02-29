import AuthenticatedClientLayout from "@/components/layouts/authenticated-layout";
import React from "react";

export default function AuthenticatedLayout({ children }) {
    
    return(


    <>

<AuthenticatedClientLayout>
  {children}
</AuthenticatedClientLayout>


  
  

    </>
  );
}
