"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/lib/router-events";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form";
import { dayjs } from "@/lib/extended-dayjs";
import Select from "react-select";

export default function Availability() {
  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState(false);

  const { register, control, getValues } = useForm({
    defaultValues: {
      start: new Date(new Date().setUTCHours(9, 0, 0, 0)),
      end: new Date(new Date().setUTCHours(17, 0, 0, 0)),
    },
  });

  const values = getValues();

  console.log({ values });

  // const createAvailability = async () => {
  //   setLoading(true);
  //   try {
  //     const {
  //       data: { user },
  //     } = await supabase.auth.getUser();

  //     const { data, error } = await supabase
  //       .from("service_availability")
  //       .insert({
  //         title: "Work hours",
  //         timezone: formData.timezone,
  //         user_id: user.id,
  //       })
  //       .select();

  //     if (error) {
  //       setLoading(false);
  //       throw error;
  //     }

  //     return data[0].id;
  //   } catch (error) {
  //     setLoading(false);
  //     console.error("Unable to create availability: ", error);
  //     throw error;
  //   }
  // };

  // const updateAvailabilitySlots = async (id) => {
  //   const availableDays = Object.entries(formData.availability)
  //     .filter(([_, available]) => available)
  //     .map(([day]) => day);

  //   const availabilityData = availableDays.map((day) => ({
  //     day_of_week: day,
  //     start_time: formData.start_time,
  //     end_time: formData.end_time,
  //     service_availability_id: id,
  //   }));

  //   try {
  //     const { data, error } = await supabase
  //       .from("availability")
  //       .insert(availabilityData)
  //       .select();

  //     if (error) {
  //       setLoading(false);
  //       throw error;
  //     }
  //   } catch (error) {
  //     setLoading(false);
  //     console.log("Error creating availability slots:", error);
  //   }
  // };

  // const updateProfile = async () => {
  //   const availabilityId = await createAvailability();

  //   if (availabilityId) {
  //     updateAvailabilitySlots(availabilityId);
  //   }

  //   try {
  //     const {
  //       data: { user },
  //     } = await supabase.auth.getUser();

  //     const { data, error } = await supabase
  //       .from("profiles")
  //       .update({ username: formData.username })
  //       .eq("id", user.id);

  //     if (error) {
  //       setLoading(false);
  //       throw error;
  //     }
  //   } catch (error) {
  //     setLoading(false);
  //     console.log("Error updating profile:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const LazySelect = ({ value, min, max, ...props }) => {
    // Lazy-loaded options, otherwise adding a field has a noticeable redraw delay.
    const { options, filter } = useOptions();

    useEffect(() => {
      filter({ current: value });
    }, [filter, value]);

    return (
      <Select
        onMenuOpen={() => {
          if (min) filter({ offset: min });
          if (max) filter({ limit: max });
        }}
        value={options.find(
          (option) => option.value === dayjs(value).toDate().valueOf()
        )}
        onMenuClose={() => { console.log({value}); filter({ current: value })}}
        options={options}
        {...props}
      />
    );
  };

  const useOptions = () => {
    // Get user so we can determine 12/24 hour format preferences
    let INCREMENT = 30;
    const timeFormat = null;

    const [filteredOptions, setFilteredOptions] = useState([]);

    const options = useMemo(() => {
      const end = dayjs().utc().endOf("day");
      const options = [];
      for (
        let t = dayjs().utc().startOf("day");
        t.isBefore(end);
        t = t.add(
          INCREMENT + (!t.add(INCREMENT).isSame(t, "day") ? -1 : 0),
          "minutes"
        )
      ) {
        options.push({
          value: t.toDate().valueOf(),
          label: dayjs(t)
            .utc()
            .format(timeFormat === 12 ? "h:mma" : "HH:mm"),
        });
      }
      // allow 23:59
      options.push({
        value: end.toDate().valueOf(),
        label: dayjs(end)
          .utc()
          .format(timeFormat === 12 ? "h:mma" : "HH:mm"),
      });
      return options;
    }, [timeFormat]);

    const filter = useCallback(
      ({ offset, limit, current }) => {
        if (current) {
          const currentOption = options.find(
            (option) => option.value === dayjs(current).toDate().valueOf()
          );
          if (currentOption) setFilteredOptions([currentOption]);
        } else
          setFilteredOptions(
            options.filter((option) => {
              const time = dayjs(option.value);
              return (
                (!limit || time.isBefore(limit)) &&
                (!offset || time.isAfter(offset))
              );
            })
          );
      },
      [options]
    );

    return { options: filteredOptions, filter };
  };

  return (
    <>
      <div className="border-border border rounded-md shadow-md px-4  divide-y divide-border">
        <div>
          <h2 className="mt-10  text-2xl font-bold leading-9 tracking-tight">
            Set your availability
          </h2>
          <p className="text-sm mb-8 mt-2 leading-relaxed">
            We take the work out of connecting with others so you can accomplish
            more
          </p>
        </div>
        <div className="mb-6">
          <p className="text-medium ">Available hours</p>

          <div className="flex gap-2 mb-6 mt-2 items-center">
            <div>
              <Controller
                control={control}
                name="start"
                render={({ field: { onChange, value} }) => (
                  <LazySelect
                    max={values.end}
                 onChange={onChange}
                 value={value}
                  />
                )}
              />
            </div>
            <span className="text-center">to</span>
            <div className="text-sm">
              <Controller
                control={control}
                name="end"
                render={({ field: {onChange, value} }) => (
                  <LazySelect
                    min={values.start}
                   value={value}
                   onChange={onChange}
                  />
                )}
              />
            </div>
          </div>

          <p className="text-medium mt-2">Available days</p>
          <ul className="md:flex flex-row items-start md:space-x-3 space-y-0 rounded-md border mt-2  shadow">
            {/* {Object.keys(formData.availability).map((day) => (
              <li
                key={day}
                className="w-full border-b p-1.5 border sm:border-b-0 sm:border-r last:border-r-0 last:border-b-0 "
              >
                <div className="flex items-center gap-2 flex-row md:flex-col p-1 pl-3 md:pb-3 md:pr-3 md:pt-3">
                  <input
                    id={`checkbox-${day}`}
                    type="checkbox"
                    checked={formData.availability[day]}
                    onChange={() => handleDayToggle(day)}
                    className="w-4 h-4 bg-transparent text-blue-600  border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <Label htmlFor={`checkbox-${day}`}>{day}</Label>
                </div>
              </li>
            ))} */}
          </ul>
        </div>
      </div>
      <div className=" mt-4">
        <Button>Yes, let&apos;s finish</Button>
      </div>
    </>
  );
}
