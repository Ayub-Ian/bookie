"use client";
import React from "react";
import { useState } from "react";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// import { UserNav } from "./user-nav"
import { ThemeToggle } from "@/components/theme-toggle";
import { Sidebar } from "@/components/sidebar";
import { SidebarContext } from "@/app/context/sidebar-links";

export default function AuthenticatedClientLayout({ children }) {
  const [hamMenuOpen, setHamMenuOpen] = useState(false);

  const closeHamMenu = () => {
    setHamMenuOpen(false);
  };
  return (
    <>
      <div className="min-h-screen">
        <div className="flex h-full min-h-screen">
          <div className="hidden w-72 border-r bg-background md:block">
            <Sidebar />
          </div>
          <div className="flex-grow">
            <div className="flex h-14 w-full items-center justify-between px-4 md:justify-end">
              <div className="flex items-center md:hidden">
                <Sheet open={hamMenuOpen} onOpenChange={setHamMenuOpen}>
                  <SheetTrigger>
                    <HamburgerMenuIcon className="h-5 w-5" />
                  </SheetTrigger>
                  <SheetContent side="left" className="px-2">
                    <SidebarContext.Provider
                      value={{ onNavLinkClick: closeHamMenu }}
                    >
                      <Sidebar />
                    </SidebarContext.Provider>
                  </SheetContent>
                </Sheet>
              </div>

              <div className="flex items-center space-x-2">
                {/* <UserNav /> */}
                <ThemeToggle />
              </div>
            </div>

            {/* content */}
            <div className="p-4">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
