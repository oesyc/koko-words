import Link from "next/link";
import { Bell, ChevronRight, FileDown, Lock } from "lucide-react";
import { Badge, Card, btn } from "@/components/ui";
import { getCurrentDriverId, getDriver, getPayStatements } from "@/services";
import { calcStatement } from "@/lib/pay";
import { money } from "@/lib/utils";

export default async function MyPayPage() {
  const id = await getCurrentDriverId();
  const driver = (await getDriver(id))!;
  const list = (await getPayStatements()).filter((s) => s.driverId === id);
  const ready = list.find((s) => s.status === "Approved");
  return (
    <>
      <h1 className="mb-1 text-xl font-bold text-navy">My Pay</h1>
      <p className="mb-4 text-sm text-slate-500">Weekly pay statements. You are paid every week.</p>
      {ready && <div className="mb-4 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-800"><Bell size={18} className="mt-0.5 shrink-0" /><p><b>Statement ready:</b> {ready.weekLabel} is approved. Open it or download the PDF.</p></div>}
      <div className="space-y-3">
        {list.map((s) => {
          const c = calcStatement(s, driver);
          return (
            <Card key={s.id} className="p-4">
              <Link href={`/driver/pay/${s.id}`} className="block">
                <div className="flex items-center justify-between"><p className="text-sm font-semibold text-slate-900">{s.weekLabel}</p><Badge>{s.status}</Badge></div>
                <div className="mt-2 flex items-end justify-between">
                  <p className="text-2xl font-bold text-navy">{money(c.total)}</p>
                  <p className="flex items-center gap-1 text-xs text-slate-500">{c.loadedMiles + c.emptyMiles} mi {s.status === "Approved" && <Lock size={12} />}<ChevronRight size={18} /></p>
                </div>
              </Link>
              {s.status === "Approved"
                ? <button className={btn("outline", "sm") + " mt-3 w-full"}><FileDown size={14} /> Download PDF</button>
                : <p className="mt-3 text-xs text-slate-400">PDF available once the office approves this week.</p>}
            </Card>
          );
        })}
      </div>
    </>
  );
}
