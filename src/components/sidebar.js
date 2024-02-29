"use client"
import React, { useContext } from "react";
import { CalendarDaysIcon, Clock3Icon, LayersIcon, LinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/lib/router-events";
import { SidebarContext } from "@/app/context/sidebar-links";
import { Logo } from "./shared/icons/logo";
import { usePathname } from "next/navigation"
import { Calendar } from "@/components/ui/calendar"

export function Sidebar({ className }) {
  const [date, setDate] = React.useState(new Date())

  return (
    <div className={cn("relative h-full pb-12", className)}>
      <div className="w-full">
        {/* TODO: drive this logo using brand config */}
       
        <Calendar
    mode="single"
    selected={date}
    onSelect={setDate}
    className="border-none min-w-full w-full flex flex-1 "
  />
      </div>

   
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <NavigationLink href="/calendar">
              <CalendarDaysIcon className="mr-2 h-4 w-4" />
              Calendar
            </NavigationLink>
            <NavigationLink href="/event-types">
              <LinkIcon className="mr-2 h-4 w-4" />
              Event Types
            </NavigationLink>
            <NavigationLink href="/bookings">
              <LayersIcon className="mr-2 h-4 w-4" />
              Bookings
            </NavigationLink>
            <NavigationLink href="/availability">
              <Clock3Icon className="mr-2 h-4 w-4" />
              Availability
            </NavigationLink>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavigationLink({ children, href }) {
  const pathname = usePathname();
  let isActive = pathname === href;
  const { onNavLinkClick } = useContext(SidebarContext);
  

  return (
    <NavLink
      href={href}
      className="block"
      onClick={() => {
        onNavLinkClick?.();
      }}
    >
      <Button
        variant="ghost"
        className={cn("w-full justify-start dark:text-slate-400", {
          "bg-zinc-100 font-semibold dark:text-white dark:bg-zinc-900": isActive,
        })}
      >
        {children}
      </Button>
    </NavLink>
  );
}
