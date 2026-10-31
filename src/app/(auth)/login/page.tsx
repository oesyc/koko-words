import Link from "next/link";
import { Field, Input, btn } from "@/components/ui";

export default function LoginPage() {
  return (
    <>
      <h1 className="text-2xl font-bold text-navy">Sign in</h1>
      <p className="mb-5 text-sm text-slate-500">Staff and drivers, welcome back.</p>
      <div className="space-y-4">
        <Field label="Email"><Input type="email" placeholder="you@kokosworldllc.com" /></Field>
        <Field label="Password"><Input type="password" placeholder="••••••••" /></Field>
        <div className="text-right"><Link href="/forgot-password" className="text-sm text-accent hover:underline">Forgot password?</Link></div>
      </div>
      {/* DEMO ONLY: Phase 2 mein asli login se replace hoga, role ke hisab se redirect */}
      <div className="mt-5 space-y-2 border-t border-slate-100 pt-5">
        <p className="text-xs font-semibold uppercase text-slate-400">Demo login (role switcher)</p>
        <Link href="/dashboard" className={btn("primary") + " w-full"}>Continue as Admin / Dispatcher</Link>
        <Link href="/driver" className={btn("accent") + " w-full"}>Continue as Driver</Link>
      </div>
    </>
  );
}
