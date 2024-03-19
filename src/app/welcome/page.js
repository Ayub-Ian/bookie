'use client'
import { Button } from "@/components/ui/button";
import Availability from "@/components/welcome/availability";
// import Availability from "@/components/welcome/availability";
import Intro from "@/components/welcome/intro";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";



export default function Welcome() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const type = searchParams.get('type')

  return (
    <>
   
    {type ? (
          <Button  variant="ghost" className="space-x-1 mb-3"
            onClick={() => router.back()}
          >
            <ArrowLeftIcon className="h-4 w-4" /> 
           <p>Back</p> 
          </Button>
        ) : (
          <Intro key="intro" />
        )}

        {type === "availability" && <Availability key="availability" />}
    
    
    

    </>
  );
}
