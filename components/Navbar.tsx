'use client'

import { FileText, Menu } from 'lucide-react'
import Link from "next/link"
import React, { Suspense, useState } from "react"
import ThemeButton from "./ThemeButton"
import Connection from "./Connection"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const NavItems = () => (
    <>
      <Link
        href={"/"}
        className="text-sm font-medium hover:underline underline-offset-4"
        onClick={() => setIsOpen(false)}
      >
        Home
      </Link>
      <Link
        href={"/#features"}
        className="text-sm font-medium hover:underline underline-offset-4"
        onClick={() => setIsOpen(false)}
      >
        Features
      </Link>
      <Link
        href={"/#templates"}
        className="text-sm font-medium hover:underline underline-offset-4"
        onClick={() => setIsOpen(false)}
      >
        Templates
      </Link>
      
    </>
  )

  return (
    <header className="px-4 lg:px-6 h-16 flex items-center border-b sticky top-0 overflow-hidden z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Link className="flex items-center justify-center" href="/">
        <FileText className="h-6 w-6" />
        <span className="ml-2 text-lg md:text-2xl font-bold">resume.org</span>
      </Link>
      <nav className="ml-auto h-full items-center hidden md:flex md:gap-4 lg:gap-6">
        <NavItems />
        <Suspense fallback={<div></div>}>
        <Connection />
      </Suspense>
        <ThemeButton />
      </nav>
      <div className="ml-auto md:hidden flex justify-center items-center gap-2">
      <Suspense fallback={<div></div>}>
        <Connection />
      </Suspense>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col gap-4 mt-4">
              <NavItems />
              <ThemeButton />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

export default Navbar

