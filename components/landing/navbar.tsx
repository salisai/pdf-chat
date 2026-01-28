"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navs = [
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center p-4 transition-all duration-300">
      <nav 
        className={`w-full max-w-5xl flex items-center justify-between px-6 py-3 rounded-full transition-all duration-300 ${
          scrolled 
            ? "bg-white/70 backdrop-blur-xl border border-neutral-200/50 shadow-[0_8px_32px_rgba(0,0,0,0.04)]" 
            : "bg-transparent"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="h-7 w-7 bg-black rounded-lg flex items-center justify-center transition-transform group-hover:rotate-6">
            <span className="text-white font-bold text-sm">C</span>
          </div>
          <span className="font-bold text-lg tracking-tight">ChatPDF</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navs.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-neutral-500 hover:text-black transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-6">
          <Link 
            href="/login" 
            className="text-sm font-semibold text-neutral-500 hover:text-black transition-all duration-200"
          >
            Log in
          </Link>
          
          <Link href="/signup">
            <Button 
              size="sm" 
              className="h-10 px-6 rounded-full bg-black text-white text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:bg-neutral-800 hover:shadow-lg active:scale-95"
            >
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden p-1">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 inset-x-4 bg-white border border-neutral-200 rounded-[24px] p-6 shadow-2xl md:hidden flex flex-col gap-6"
          >
            {navs.map((link) => (
              <Link key={link.name} href={link.href} onClick={() => setOpen(false)} className="text-lg font-semibold">
                {link.name}
              </Link>
            ))}
            <hr className="border-neutral-100" />
            <div className="flex flex-col gap-3">
              <Link href="/login" className="w-full">
                <Button variant="outline" className="w-full rounded-xl h-12">Log in</Button>
              </Link>
              <Link href="/signup">
                <Button className="w-full rounded-xl h-12 bg-black">Get Started</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}