"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/nav";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 md:px-10 md:py-6">
      <Link href="/" className="relative z-10 flex items-center" data-cursor-hover>
        <Image
          src="/images/icon.png"
          alt="Ghaya Films"
          width={90}
          height={47}
          className="h-8 w-auto"
          priority
        />
      </Link>

      <nav className="hidden items-center gap-8 md:flex">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            data-cursor-hover
            className={`font-brandon text-sm tracking-wide uppercase transition-opacity hover:opacity-70 ${
              pathname === link.href ? "opacity-100" : "opacity-70"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <button
        type="button"
        data-cursor-hover
        onClick={() => setOpen((v) => !v)}
        className="relative z-10 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        aria-label="Toggle menu"
        aria-expanded={open}
      >
        <span
          className={`h-px w-6 bg-cream transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
        />
        <span
          className={`h-px w-6 bg-cream transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
        />
      </button>

      <div
        className={`fixed inset-0 z-0 flex flex-col items-center justify-center gap-8 bg-navy-deep transition-opacity duration-300 md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            className="font-display text-3xl"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
