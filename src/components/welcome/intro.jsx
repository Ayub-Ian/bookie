"use client";
import React, { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TimezoneSelect, { allTimezones } from "react-timezone-select";
import { useForm } from "react-hook-form";
import { useTimePreferences } from "@/context/onboarding";
import {  dayjs } from "@/lib/extended-dayjs";

function Intro() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const {
    setTimezone: setSelectedTimeZone,
    timezone: selectedTimeZone,
    username: currentUsername,
    setUsername,
  } = useTimePreferences();

  const {
    register,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      username: currentUsername,
    },
  });

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <>
      <div className="border-border border rounded-md shadow-md px-4 divide-y divide-border">
        <div>
          <h2 className="mt-10  text-2xl font-bold leading-9 tracking-tight">
            Welcome
          </h2>
          <p className="text-sm mb-8 mt-2 leading-relaxed">
            We take the work out of connecting with others so you can accomplish
            more
          </p>
        </div>
        <div className="space-y-4 mb-6">
          <div className="my-4">
            <h5 className="font-medium mb-2">Create your URL</h5>

            <p className="text-xs leading-relaxed">
              Choose a url that desribes you or your business in a concise way.
              Make it short and easy to remember.
            </p>
          </div>

          <div className="flex items-center justify-between ">
            <Label htmlFor="username" className="text-medium me-3">
              bookie.com/
            </Label>

            <div className="w-full">
              <Input
                {...register("username", { required: true })}
                id="username"
                type="text"
                placeholder="unique name"
                className="text-base md:text-sm"
                value={currentUsername}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="flex  flex-col justify-between">
            <Label className="text-medium mb-2">Timezone</Label>

            <div className="w-full">
              <TimezoneSelect
                value={selectedTimeZone}
                onChange={({ value }) => setSelectedTimeZone(value)}
                className=" w-full rounded-md "
                timezones={{
                  ...allTimezones,
                }}
              />
              <p className="text-subtle mt-3 flex flex-row font-sans text-xs leading-tight">
                {dayjs()
                  .tz(selectedTimeZone)
                  .format("L LT")
                  .toString()
                  .toLowerCase()}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className=" mt-4">
        <Button
          disabled={!isValid}
          onClick={() => {
            router.push(
              pathname + "?" + createQueryString("type", "availability")
            );
          }}
        >
          Continue
        </Button>
      </div>
    </>
  );
}

export default Intro;
