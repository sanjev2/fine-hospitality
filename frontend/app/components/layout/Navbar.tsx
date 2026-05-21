// src/components/layout/Navbar.tsx

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const navItems = [
  { label: "Home", href: "#" },
  { label: "School", href: "#school" },
  { label: "Courses", href: "#courses" },
  { label: "Instructors", href: "#instructors" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    function handleScroll() {
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 40);

      // Hide when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 120) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      lastScrollY = currentScrollY;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 top-0 z-[999] w-full transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)]
      ${hidden ? "-translate-y-full" : "translate-y-0"}
      ${
        scrolled
          ? "border-b border-white/10 bg-[#090909]/80 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
          : "border-b border-white/5 bg-[#090909]/35 backdrop-blur-xl"
      }`}
    >
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6">
        {/* Logo only - no written Fine Hospitality Group */}
        <a href="#" className="group flex items-center">
          <div className="relative h-16 w-32 overflow-hidden">
            <Image
              src="/logo/fine-logo.png"
              alt="Fine Hospitality Group"
              fill
              priority
              className="object-contain object-left transition duration-500 group-hover:scale-105"
            />
          </div>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative text-[11px] font-medium uppercase tracking-[0.32em] text-white/60 transition duration-300 hover:text-[#D7A6A8]"
            >
              {item.label}
              <span className="absolute -bottom-2 left-0 h-px w-0 bg-[#D7A6A8] transition-all duration-300 hover:w-full" />
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="group relative hidden overflow-hidden rounded-full bg-[#D7A6A8] px-7 py-3 text-[11px] font-bold uppercase tracking-[0.32em] text-black shadow-[0_0_40px_rgba(215,166,168,0.35)] transition duration-500 hover:bg-[#F7F1EA] md:inline-flex md:items-center md:gap-3"
        >
          <span className="relative z-10">Enquire</span>
          <ArrowUpRight
            size={16}
            className="relative z-10 transition duration-300 group-hover:rotate-45"
          />
        </a>
      </div>
    </header>
  );
}