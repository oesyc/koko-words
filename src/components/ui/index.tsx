import { ReactNode, InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "accent" | "outline" | "ghost" | "danger";
export const btn = (v: Variant = "primary", size: "md" | "sm" = "md") =>
  cn(
    "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition disabled:opacity-50",
    size === "sm" ? "px-3 py-1.5 text-sm" : "px-4 py-2.5 text-sm",
    {
      primary: "bg-navy text-white hover:bg-navy-dark",
      accent: "bg-accent text-white hover:bg-accent-dark",
      outline: "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50",
      ghost: "text-navy hover:bg-navy-50",
      danger: "bg-red-600 text-white hover:bg-red-700",
    }[v]
  );

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("rounded-xl border border-slate-200 bg-white shadow-sm", className)}>{children}</div>;
}
export function CardHeader({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
      <h2 className="font-semibold text-slate-900">{title}</h2>
      {action}
    </div>
  );
}

const tones: Record<string, string> = {
  Booked: "bg-slate-100 text-slate-700", "At pickup": "bg-amber-100 text-amber-800", Loaded: "bg-indigo-100 text-indigo-800",
  "In transit": "bg-navy-100 text-navy", Delivered: "bg-green-100 text-green-800", Delayed: "bg-red-100 text-red-700", Other: "bg-slate-200 text-slate-700",
  Draft: "bg-slate-100 text-slate-700", Sent: "bg-navy-100 text-navy", Paid: "bg-green-100 text-green-800", Overdue: "bg-red-100 text-red-700",
  Pending: "bg-amber-100 text-amber-800", Approved: "bg-green-100 text-green-800", Locked: "bg-slate-200 text-slate-700",
  Valid: "bg-green-100 text-green-800", Expired: "bg-red-100 text-red-700", "Expiring in 7 days": "bg-red-100 text-red-700", "Expiring in 30 days": "bg-amber-100 text-amber-800",
  "On duty": "bg-green-100 text-green-800", "Off duty": "bg-slate-100 text-slate-700", Inactive: "bg-slate-200 text-slate-600",
  High: "bg-red-100 text-red-700", Medium: "bg-amber-100 text-amber-800", Low: "bg-navy-100 text-navy",
  New: "bg-accent-50 text-accent-dark", Contacted: "bg-navy-100 text-navy", Quoted: "bg-green-100 text-green-800",
  Reviewing: "bg-amber-100 text-amber-800", Hired: "bg-green-100 text-green-800", Rejected: "bg-red-100 text-red-700",
  Admin: "bg-navy text-white", Dispatcher: "bg-accent-50 text-accent-dark", Driver: "bg-slate-100 text-slate-700",
  Yes: "bg-green-100 text-green-800", No: "bg-red-100 text-red-700",
};
export function Badge({ children }: { children: string }) {
  return <span className={cn("inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold", tones[children] ?? "bg-slate-100 text-slate-700")}>{children}</span>;
}

export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
      <div>
        <h1 className="text-2xl font-bold text-navy">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
      </div>
      {action && <div className="flex flex-wrap gap-2">{action}</div>}
    </div>
  );
}

export function StatCard({ label, value, hint, icon, accent }: { label: string; value: string | number; hint?: string; icon?: ReactNode; accent?: boolean }) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <p className="mt-1 text-3xl font-bold text-slate-900">{value}</p>
          {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
        </div>
        <div className={cn("rounded-lg p-2.5", accent ? "bg-accent-50 text-accent" : "bg-navy-50 text-navy")}>{icon}</div>
      </div>
    </Card>
  );
}

export function Table({ heads, children }: { heads: string[]; children: ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-slate-50">
          <tr>{heads.map((h) => <th key={h} className="whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">{h}</th>)}</tr>
        </thead>
        <tbody className="divide-y divide-slate-100">{children}</tbody>
      </table>
    </div>
  );
}
export const Td = ({ children, className }: { children?: ReactNode; className?: string }) => (
  <td className={cn("whitespace-nowrap px-4 py-3 text-sm text-slate-700", className)}>{children}</td>
);

export const inputCls = "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-navy focus:ring-2 focus:ring-navy/20";
export function Field({ label, children, className }: { label: string; children: ReactNode; className?: string }) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1 block text-sm font-medium text-slate-700">{label}</span>
      {children}
    </label>
  );
}
export const Input = (p: InputHTMLAttributes<HTMLInputElement>) => <input {...p} className={cn(inputCls, p.className)} />;
export const Select = (p: SelectHTMLAttributes<HTMLSelectElement>) => <select {...p} className={cn(inputCls, p.className)} />;
export const Textarea = (p: TextareaHTMLAttributes<HTMLTextAreaElement>) => <textarea rows={4} {...p} className={cn(inputCls, p.className)} />;

export function InfoRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex justify-between gap-4 border-b border-slate-100 py-2.5 text-sm last:border-0">
      <span className="text-slate-500">{label}</span>
      <span className="text-right font-medium text-slate-900">{value}</span>
    </div>
  );
}
export function FilterBar({ children }: { children: ReactNode }) {
  return <div className="grid gap-3 border-b border-slate-100 p-4 sm:grid-cols-2 lg:grid-cols-5">{children}</div>;
}
