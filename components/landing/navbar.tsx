"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null)

  const navs = ["Features", "Pricing", "About"]

  //close on scroll
  useEffect(() => {
    const handleScroll = () => {
        if(open) setOpen(false);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll)
  },[open]);

  //close on click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
        if(
            open && 
            menuRef.current && 
            !menuRef.current.contains(e.target as Node)
        ){setOpen(false)}
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside);
  },[open])



  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        
        <Link
          href="/"
          className="font-bold text-lg"
        >
          ChatPDF
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          {navs.map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="relative hover:text-foreground transition-colors after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-2">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 transition"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu - Dropdown from Top */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 md:hidden z-40"
              aria-hidden="true"
            />

            {/* Dropdown Menu */}
            <motion.div
              ref={menuRef}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-16 left-0 right-0 md:hidden bg-background z-50 shadow-lg"
            >
              <div className="container mx-auto px-4 py-6 flex flex-col gap-4 text-sm">
                {navs.map((item) => (
                  <Link
                    key={item}
                    href={`/${item.toLowerCase()}`}
                    onClick={() => setOpen(false)}
                    className="font-medium text-muted-foreground hover:text-foreground transition px-3 rounded-md"
                  >
                    {item}
                  </Link>
                ))}

                <div className="pt-4 flex flex-col gap-2">
                  <Link href="/login" onClick={() => setOpen(false)}>
                    <Button variant="ghost" className="w-full rounded-[2px] border cursor-pointer">
                      Login
                    </Button>
                  </Link>
                
                 <Link href="/signup" onClick={() => setOpen(false)}>
                    <Button className="w-full rounded-[2px] cursor-pointer">Get Started</Button>
                  </Link>

                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
