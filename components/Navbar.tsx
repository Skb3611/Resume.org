
import { FileText } from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";
import ThemeButton from "./ThemeButton";
import Connection from "./Connection";

const Navbar = () => {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center border-b sticky top-0 overflow-hidden z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Link className="flex items-center justify-center" href="/">
        <FileText className="h-6 w-6" />
        <span className="ml-2 text-2xl font-bold">resume.org</span>
      </Link>
      <nav className="ml-auto h-full flex gap-4 sm:gap-6 items-center">
        <Link
          href={"/"}
          className="text-sm font-medium hover:underline underline-offset-4"
        >
          Home
        </Link>
        <Link
          href={"/#features"}
          className="text-sm font-medium hover:underline underline-offset-4"
        >
          Features
        </Link>
        <Link
          href={"/#templates"}
          className="text-sm font-medium hover:underline underline-offset-4"
        >
          Templates
        </Link>
        <Suspense fallback={<div></div>}>
        <Connection/>
        </Suspense>
        <ThemeButton />
      </nav>
    
    </header>
  );
};

export default Navbar;
