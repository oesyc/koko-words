import Link from "next/link";
import { CheckCircle2, FileDown, FileText, UploadCloud } from "lucide-react";
import { Badge, Card, btn } from "@/components/ui";
import { getCurrentDriverId, getDriver, getLoads, getPayStatements } from "@/services";
import { calcStatement } from "@/lib/pay";
import { money } from "@/lib/utils";

export default async function DriverDocumentsPage() {
  const id = await getCurrentDriverId();
  const driver = (await getDriver(id))!;
  const loads = (await getLoads()).filter((l) => l.driverId === id);
  const statements = (await getPayStatements()).filter((s) => s.driverId === id && s.status === "Approved");
  return (
    <>
      <h1 className="mb-1 text-xl font-bold text-navy">Documents</h1>
      <p className="mb-4 text-sm text-slate-500">Upload paperwork for your loads and download your pay statements.</p>

      <h2 className="mb-2 text-sm font-semibold uppercase text-slate-500">Load paperwork</h2>
      <div className="mb-6 space-y-3">
        {loads.map((l) => (
          <Card key={l.id} className="p-4">
            <div className="mb-2 flex items-center justify-between"><span className="font-bold text-navy">{l.loadNumber}</span><span className="text-xs text-slate-500">{l.pickup.city} → {l.delivery.city}</span></div>
            <ul className="space-y-1.5 text-sm">
              <li className="flex items-center justify-between"><span className="flex items-center gap-2"><FileText size={16} className="text-slate-400" /> Rate confirmation</span><Badge>{l.hasRateCon ? "Available" : "Pending"}</Badge></li>
              <li className="flex items-center justify-between"><span className="flex items-center gap-2"><FileText size={16} className="text-slate-400" /> Signed BOL</span>{l.hasBol ? <span className="flex items-center gap-1 text-green-700"><CheckCircle2 size={16} /> Uploaded</span> : <Link href={`/driver/loads/${l.id}`} className={btn("accent", "sm")}><UploadCloud size={14} /> Upload</Link>}</li>
              <li className="flex items-center justify-between"><span className="flex items-center gap-2"><FileText size={16} className="text-slate-400" /> Receipts (lumper / fuel)</span><Link href={`/driver/loads/${l.id}`} className={btn("outline", "sm")}>Add</Link></li>
            </ul>
          </Card>
        ))}
      </div>

      <h2 className="mb-2 text-sm font-semibold uppercase text-slate-500">Pay statements</h2>
      <div className="space-y-3">
        {statements.map((s) => (
          <Card key={s.id} className="flex items-center justify-between p-4">
            <div><p className="text-sm font-semibold">{s.weekLabel}</p><p className="text-xs text-slate-500">{money(calcStatement(s, driver).total)}</p></div>
            <button className={btn("outline", "sm")}><FileDown size={14} /> PDF</button>
          </Card>
        ))}
        {statements.length === 0 && <p className="text-sm text-slate-500">No approved statements yet.</p>}
      </div>
    </>
  );
}
