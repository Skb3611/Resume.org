"use client";
import { motion } from "motion/react";
import { FileText, Menu } from "lucide-react";
import Link from "next/link";
import React, { Suspense, useState } from "react";
import ThemeButton from "./ThemeButton";
import Connection from "./Connection";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Image from "next/image";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const NavItems = () => (
    <>
      <motion.span
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -10 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <Link
          href={"/"}
          className="xl:text-lg font-medium hover:underline underline-offset-4"
          onClick={() => setIsOpen(false)}
        >
          Home
        </Link>
      </motion.span>
      <motion.span
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -10 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <Link
          href={"/#features"}
          className="xl:text-lg font-medium hover:underline underline-offset-4"
          onClick={() => setIsOpen(false)}
        >
          Features
        </Link>
      </motion.span>
      <motion.span
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -10 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <Link
          href={"/#templates"}
          className="xl:text-lg font-medium hover:underline underline-offset-4"
          onClick={() => setIsOpen(false)}
        >
          Templates
        </Link>
      </motion.span>
      <motion.span
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -10 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <Link
          href={"/#pricing"}
          className="xl:text-lg font-medium hover:underline underline-offset-4"
          onClick={() => setIsOpen(false)}
        >
          Pricing
        </Link>
      </motion.span>
    </>
  );

  return (
    <motion.header
      initial={{ opacity: 0, y: -10, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="px-3 lg:px-6 md:h-16 h-14 flex items-center justify-between xl:w-[80%] md:w-[90%] w-[95%] md:ml-[5%] ml-[2.5%] xl:ml-[10%] border-b fixed top-0 mt-2 overflow-hidden z-50 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70 rounded-2xl  border border-neutral-300 dark:border-neutral-900 shadow-lg shadow-secondary-foreground/20  "
    >
      <Link className="flex items-center justify-center" href="/">
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Image
            src="https://resume-org.vercel.app/favicon.ico"
            alt="logo"
            width={25}
            height={25}
            className="dark:invert"
          />
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className=" text-lg md:text-2xl font-bold"
        >
          esume.org
        </motion.span>
      </Link>
      <div className=" items-center gap-4 hidden md:flex">
        <NavItems />
      </div>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className=" items-center gap-2 hidden md:flex"
      >
        <Suspense fallback={<div></div>}>
          <Connection />
        </Suspense>
        <ThemeButton />
      </motion.div>
      {/* <nav className="ml-auto h-full items-center hidden md:flex md:gap-4 lg:gap-6">
        
        </nav> */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="ml-auto md:hidden flex justify-center items-center gap-1"
      >
        <Suspense fallback={<div></div>}>
          <Connection />
        </Suspense>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-xl">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col gap-4 mt-4">
              <NavItems />
              <div className="flex justify-between items-center gap-2">
                <p className="text-base font-se hover:underline underline-offset-4">
                  Change Theme
                </p>
                <ThemeButton />
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </motion.div>
    </motion.header>
  );
};

export default Navbar;
