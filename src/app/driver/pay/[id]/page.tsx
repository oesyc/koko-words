import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, FileDown } from "lucide-react";
import { Badge, Card, InfoRow, btn } from "@/components/ui";
import { getDriver, getPayStatement } from "@/services";
import { calcStatement } from "@/lib/pay";
import { money } from "@/lib/utils";

export default async function DriverStatementPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const s = await getPayStatement(id);
  if (!s) notFound();
  const d = (await getDriver(s.driverId))!;
  const c = calcStatement(s, d);
  return (
    <>
      <Link href="/driver/pay" className="mb-3 inline-flex items-center text-sm text-slate-500"><ChevronLeft size={18} /> My Pay</Link>
      <div className="mb-4 flex items-center justify-between"><h1 className="text-lg font-bold text-navy">{s.weekLabel}</h1><Badge>{s.status}</Badge></div>

      <Card className="mb-4 bg-navy p-5 text-white"><p className="text-sm text-white/70">Total pay</p><p className="text-3xl font-bold text-accent">{money(c.total)}</p></Card>

      <h2 className="mb-2 text-sm font-semibold uppercase text-slate-500">Loads</h2>
      <div className="mb-4 space-y-3">
        {s.lines.map((l) => (
          <Card key={l.loadNumber} className="p-4 text-sm">
            <p className="font-bold text-navy">{l.loadNumber}</p><p className="text-slate-500">{l.route}</p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <div><p className="text-xs text-slate-400">Loaded</p><p className="font-medium">{l.loadedMiles} mi · {money(l.loadedMiles * d.loadedRate)}</p></div>
              <div><p className="text-xs text-slate-400">Empty</p><p className="font-medium">{l.emptyMiles} mi · {money(l.emptyMiles * d.emptyRate)}</p></div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="mb-4 px-4 py-2">
        <InfoRow label="Loaded pay" value={money(c.loadedPay)} /><InfoRow label="Empty pay" value={money(c.emptyPay)} />
        {s.extras.map((e) => <InfoRow key={e.label} label={e.label} value={"+ " + money(e.amount)} />)}
        {s.deductions.map((e) => <InfoRow key={e.label} label={e.label} value={"− " + money(e.amount)} />)}
      </Card>
      <button className={btn("outline") + " w-full"}><FileDown size={16} /> Download PDF</button>
    </>
  );
}
