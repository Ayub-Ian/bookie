"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children, ...props }) {
 
  // if (!mounted) return <React.Fragment>{children}</React.Fragment>;
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
