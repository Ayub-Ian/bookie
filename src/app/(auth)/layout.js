import { Logo } from "@/components/shared/icons/logo";
import React from "react";

export default function AuthLayout({ children }) {
  return (
    <>
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="flex flex-col items-center justify-center sm:mx-auto sm:w-full sm:max-w-sm">
            {/* TODO: figure out better way to use light and dark logos */}
            <div className="flex items-center space-x-2">
              <Logo className="h-6" />
            </div>

            {children}
          </div>
        </div>
      </>
    </>
  );
}
