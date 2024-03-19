// import React, { createContext, useContext, useReducer } from 'react';

// // Define initial form data with initial values
// const initialFormData = {
//     username: '',
//     timezone: null,
//     start_time: '09:00', // Example initial value for start time
//     end_time: '17:00',   // Example initial value for end time
//     availability: {
//         Sunday: false,
//         Monday: true,
//         Tuesday: true,
//         Wednesday: true,
//         Thursday: true,
//         Friday: true,
//         Saturday: false
//     }
// };

// // Define action types
// const SET_USERNAME = 'SET_USERNAME';
// const SET_TIMEZONE = 'SET_TIMEZONE';
// const TOGGLE_DAY = 'TOGGLE_DAY';
// const SET_START_TIME = 'SET_START_TIME';
// const SET_END_TIME = 'SET_END_TIME';

// // Reducer function
// const formReducer = (state, action) => {
//     switch (action.type) {
//         case SET_USERNAME:
//             return { ...state, username: action.payload };
//         case SET_TIMEZONE:
//             return { ...state, timezone: action.payload };
//         case TOGGLE_DAY:
//             return { ...state, availability: { ...state.availability, [action.payload]: !state.availability[action.payload] } };
//         case SET_START_TIME:
//             return { ...state, start_time: action.payload };
//         case SET_END_TIME:
//             return { ...state, end_time: action.payload };
//         default:
//             return state;
//     }
// };

// // Create context
// const FormContext = createContext();

// // Form provider component
// export const OnboardProvider = ({ children }) => {
//     const [formData, dispatch] = useReducer(formReducer, initialFormData);

//     return (
//         <FormContext.Provider value={{ formData, dispatch }}>
//             {children}
//         </FormContext.Provider>
//     );
// };

// // Custom hook to use form context
// export const useOnboard = () => useContext(FormContext);

import {  dayjs } from "@/lib/extended-dayjs";
import {
  TimeFormat,
  detectBrowserTimeFormat,
  setIs24hClockInLocalStorage,
} from "@/lib/timeformat";
import { localStorage } from "@/lib/web-storage";
import { create } from "zustand";

const timezoneLocalStorageKey = "timeOption.preferredTimeZone";

export const timePreferencesStore = create((set) => ({
  username: "",
  setUsername: (username) => {
    set({ username });
  },
  timeFormat: detectBrowserTimeFormat,
  setTimeFormat: (format) => {
    setIs24hClockInLocalStorage(format === TimeFormat.TWENTY_FOUR_HOUR);
    set({ timeFormat: format });
  },
  timezone:
    localStorage.getItem(timezoneLocalStorageKey) ||
    dayjs.tz.guess() ||
    "Europe/London",
  setTimezone: (timezone) => {
    localStorage.setItem(timezoneLocalStorageKey, timezone);
    set({ timezone });
  },
}));

export const useTimePreferences = timePreferencesStore;
