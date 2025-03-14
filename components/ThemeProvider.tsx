"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import Footer from "./Footer";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const pathname = usePathname();
  return (
    <NextThemesProvider {...props}>
      <div className={`${pathname==="/dashboard" ? "no-scrollbar" : "custom-scroll"}`}>
      {(pathname !== "/dashboard" && pathname !== "/forget" && !pathname.includes("/resetpassword")) && (
        <Navbar />
      )}
      {children}
      {
        !pathname.includes("/resetpassword") && pathname!=="/forget" && pathname !== "/dashboard" && (
          <Footer />
        )
      }
      </div>
    </NextThemesProvider>
  );
}
