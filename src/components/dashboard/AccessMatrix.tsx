import { Card, CardHeader } from "@/components/ui";
import { cn } from "@/lib/utils";

const rows: [string, string, string, string][] = [
  ["Dashboard (summary, alerts)", "Full", "Limited", "—"],
  ["Loads: list, new load, detail", "Full", "Full", "Own loads only"],
  ["Documents (rate con, BOL)", "Full", "Full", "Upload own BOL"],
  ["Invoices", "Full", "Full", "—"],
  ["Brokers & customers", "Full", "Full", "—"],
  ["Alerts & reminders", "Full", "Full", "—"],
  ["Quote requests inbox", "Full", "Full", "—"],
  ["Drivers & profiles", "Full", "—", "Own profile"],
  ["Driver pay & statements", "Full", "—", "Own pay only"],
  ["Vehicles (assign / remove)", "Full", "—", "Own truck (view)"],
  ["Reports & revenue", "Full", "—", "—"],
  ["Driver applications inbox", "Full", "—", "—"],
  ["Users & roles", "Full", "—", "—"],
  ["Settings", "Full", "—", "—"],
];
const tone = (v: string) => v === "Full" ? "bg-green-100 text-green-800" : v === "—" ? "bg-slate-100 text-slate-400" : v === "Limited" ? "bg-amber-100 text-amber-800" : "bg-navy-100 text-navy";

export default function AccessMatrix() {
  return (
    <Card>
      <CardHeader title="Who sees which screens" />
      <div className="grid gap-3 border-b border-slate-100 p-5 sm:grid-cols-4">
        {[["Admin", "24 screens"], ["Dispatcher", "12 screens"], ["Driver", "6 mobile screens"], ["Brokers / public", "Website only (no login)"]].map(([r, c]) => (
          <div key={r} className="rounded-xl bg-navy-50 p-3"><p className="text-xs text-slate-500">{r}</p><p className="font-bold text-navy">{c}</p></div>
        ))}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="px-4 py-3">Screen</th><th className="px-4 py-3">Admin</th><th className="px-4 py-3">Dispatcher</th><th className="px-4 py-3">Driver</th></tr></thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map(([s, a, d, dr]) => (
              <tr key={s}><td className="px-4 py-2.5 font-medium text-slate-800">{s}</td>{[a, d, dr].map((v, i) => <td key={i} className="px-4 py-2.5"><span className={cn("rounded-full px-2.5 py-0.5 text-xs font-semibold", tone(v))}>{v}</span></td>)}</tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
