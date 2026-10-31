"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LayoutDashboard, Package, Users, Wallet, Receipt, Truck, Building2, Bell, BarChart3, Inbox, UserPlus, ShieldCheck, Settings, Menu, X, LogOut, Smartphone, FolderOpen, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { DemoRole, canAccess } from "@/lib/roles";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/loads", label: "Loads", icon: Package },
  { href: "/dashboard/drivers", label: "Drivers", icon: Users },
  { href: "/dashboard/pay", label: "Driver Pay", icon: Wallet },
  { href: "/dashboard/invoices", label: "Invoices", icon: Receipt },
  { href: "/dashboard/documents", label: "Documents", icon: FolderOpen },
  { href: "/dashboard/vehicles", label: "Vehicles", icon: Truck },
  { href: "/dashboard/brokers", label: "Brokers", icon: Building2 },
  { href: "/dashboard/alerts", label: "Alerts", icon: Bell },
  { href: "/dashboard/reports", label: "Reports", icon: BarChart3 },
  { href: "/dashboard/quotes", label: "Quote Requests", icon: Inbox },
  { href: "/dashboard/applications", label: "Driver Applications", icon: UserPlus },
  { href: "/dashboard/users", label: "Users & Roles", icon: ShieldCheck },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];
const people: Record<DemoRole, string> = { Admin: "Fola", Dispatcher: "Aisha Khan", Driver: "Driver" };

export default function DashboardShell({ children, role }: { children: React.ReactNode; role: DemoRole }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const items = nav.filter((n) => canAccess(role, n.href));
  const active = (href: string) => (href === "/dashboard" ? path === href : path.startsWith(href));
  const allowed = canAccess(role, path);

  const sidebar = (
    <div className="flex h-full flex-col bg-white">
      <div className="flex justify-center border-b border-slate-100 p-3">
        <Image src="/logo-truck.png" alt="Koko's World LLC" width={96} height={96} priority />
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {items.map((n) => (
          <Link key={n.href} href={n.href} onClick={() => setOpen(false)}
            className={cn("flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition",
              active(n.href) ? "bg-navy text-white" : "text-slate-600 hover:bg-navy-50 hover:text-navy")}>
            <n.icon size={18} className={active(n.href) ? "text-accent" : ""} /> {n.label}
          </Link>
        ))}
      </nav>
      <div className="mx-3 mb-2 rounded-xl bg-navy p-3 text-white">
        <p className="text-xs font-semibold">Role-based access</p>
        <div className="mt-2 flex flex-wrap gap-1.5 text-[11px] font-semibold">
          {(["Admin", "Dispatcher", "Driver"] as DemoRole[]).map((r) => <span key={r} className={cn("rounded-full px-2 py-0.5", r === role ? "bg-accent" : "bg-white/20")}>{r}</span>)}
        </div>
        <p className="mt-2 text-[11px] text-white/70">Signed in as {role}</p>
      </div>
      <div className="border-t border-slate-100 p-3">
        <Link href="/login" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"><LogOut size={18} /> Log out</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-slate-200 lg:block">{sidebar}</aside>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-64 shadow-xl">{sidebar}</aside>
        </div>
      )}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
          <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X /> : <Menu />}</button>
          <div className="hidden text-sm text-slate-500 lg:block">Koko&apos;s World LLC · Fleet Dashboard</div>
          <div className="flex items-center gap-3">
            {role === "Admin" && <Link href="/driver" className="hidden items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 sm:flex"><Smartphone size={14} /> Driver view</Link>}
            <Link href="/login" className="hidden rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 sm:block">Switch account</Link>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent font-bold text-white">{people[role][0]}</div>
              <div className="hidden text-sm leading-tight sm:block"><p className="font-semibold text-slate-900">{people[role]}</p><p className="text-xs text-slate-500">{role}</p></div>
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-7xl p-4 sm:p-6">
          {allowed ? children : (
            <div className="mx-auto mt-10 max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600"><Lock /></div>
              <h1 className="text-xl font-bold text-navy">Access restricted</h1>
              <p className="mt-2 text-sm text-slate-600">Your role ({role}) does not have access to this screen. Please contact the admin if you need access.</p>
              <Link href={role === "Driver" ? "/driver" : "/dashboard"} className="mt-5 inline-block rounded-lg bg-navy px-4 py-2.5 text-sm font-semibold text-white">{role === "Driver" ? "Go to driver page" : "Back to dashboard"}</Link>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
