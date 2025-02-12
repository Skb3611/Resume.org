import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-5 w-full shrink-0 items-center px-4 md:px-6 border-t">
      <p className="text-xs text-center text-gray-500 dark:text-gray-400 w-full">
        © {new Date().getFullYear()} resume.org. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
