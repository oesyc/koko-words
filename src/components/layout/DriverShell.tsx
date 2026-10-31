"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Package, Wallet, User, FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/driver", label: "My Loads", icon: Package },
  { href: "/driver/documents", label: "Documents", icon: FolderOpen },
  { href: "/driver/pay", label: "My Pay", icon: Wallet },
  { href: "/driver/profile", label: "Profile", icon: User },
];

export default function DriverShell({ children, name, unit }: { children: React.ReactNode; name: string; unit: string }) {
  const path = usePathname();
  const active = (h: string) => (h === "/driver" ? path === h || path.startsWith("/driver/loads") : path.startsWith(h));
  return (
    <div className="mx-auto min-h-screen max-w-md bg-slate-50 pb-20 shadow-xl">
      <header className="sticky top-0 z-30 flex items-center justify-between bg-navy px-4 py-2 text-white">
        <div className="rounded-lg bg-white p-0.5"><Image src="/logo-truck.png" alt="Koko's World" width={44} height={44} priority /></div>
        <div className="text-right text-sm leading-tight"><p className="font-semibold">{name}</p><p className="text-xs text-white/70">{unit}</p></div>
      </header>
      <main className="p-4">{children}</main>
      <nav className="fixed bottom-0 left-1/2 z-30 grid w-full max-w-md -translate-x-1/2 grid-cols-4 border-t border-slate-200 bg-white">
        {tabs.map((t) => (
          <Link key={t.href} href={t.href} className={cn("flex flex-col items-center gap-1 py-2.5 text-xs font-medium", active(t.href) ? "text-accent" : "text-slate-500")}>
            <t.icon size={22} /> {t.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
