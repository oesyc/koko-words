"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Field, Input, Badge, btn } from "@/components/ui";
import { demoAccounts } from "@/lib/roles";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const a = demoAccounts.find((x) => x.email === email.trim().toLowerCase() && x.password === pw);
    if (!a) return setErr("Wrong email or password.");
    document.cookie = `kw_role=${a.role}; path=/`;
    document.cookie = `kw_driver=${a.driverId}; path=/`;
    router.push(a.landing);
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-navy">Sign in</h1>
      <p className="mb-5 text-sm text-slate-500">Staff and drivers, welcome back.</p>
      <form onSubmit={submit} className="space-y-4">
        <Field label="Email"><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@kokosworldllc.com" required /></Field>
        <Field label="Password"><Input type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="••••••••" required /></Field>
        {err && <p className="text-sm text-red-600">{err}</p>}
        <div className="text-right"><Link href="/forgot-password" className="text-sm text-accent hover:underline">Forgot password?</Link></div>
        <button type="submit" className={btn("accent") + " w-full"}>Sign in</button>
      </form>

      <div className="mt-6 rounded-xl border border-dashed border-accent bg-accent-50 p-4">
        <p className="text-xs font-bold uppercase tracking-wide text-accent-dark">Demo accounts (for preview only)</p>
        <ul className="mt-3 space-y-2">
          {demoAccounts.map((a) => (
            <li key={a.email} className="flex items-center justify-between gap-2 rounded-lg bg-white p-2.5 text-xs">
              <div><Badge>{a.role}</Badge> <span className="font-semibold">{a.name}</span><p className="mt-1 text-slate-500">{a.email} · {a.password}</p></div>
              <button type="button" className={btn("outline", "sm")} onClick={() => { setEmail(a.email); setPw(a.password); setErr(""); }}>Use</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
