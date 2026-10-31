"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { btn } from "@/components/ui";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/request-quote", label: "Request a Quote" },
  { href: "/drive-for-us", label: "Drive for Us" },
];

export default function PublicHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo-truck.png" alt="Koko's World LLC" width={64} height={64} priority />
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm font-medium text-slate-700 hover:text-accent">{l.label}</Link>
          ))}
          <Link href="/login" className={btn("accent", "sm")}>Login</Link>
        </nav>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X /> : <Menu />}</button>
      </div>
      {open && (
        <nav className="space-y-1 border-t border-slate-100 bg-white px-4 py-3 md:hidden">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-navy-50">{l.label}</Link>
          ))}
          <Link href="/login" className={btn("accent") + " w-full"}>Login</Link>
        </nav>
      )}
    </header>
  );
}
