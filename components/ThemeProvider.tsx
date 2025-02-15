"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const pathname = usePathname();
  return (
    <NextThemesProvider {...props}>
      {pathname !== "/dashboard" && <Navbar />}
      {children}
    </NextThemesProvider>
  );
}
