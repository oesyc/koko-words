import Link from "next/link";
import { ChevronRight, Lock } from "lucide-react";
import { Badge, Card } from "@/components/ui";
import { getCurrentDriverId, getDriver, getPayStatements } from "@/services";
import { calcStatement } from "@/lib/pay";
import { money } from "@/lib/utils";

export default async function MyPayPage() {
  const id = await getCurrentDriverId();
  const driver = (await getDriver(id))!;
  const list = (await getPayStatements()).filter((s) => s.driverId === id);
  return (
    <>
      <h1 className="mb-1 text-xl font-bold text-navy">My Pay</h1>
      <p className="mb-4 text-sm text-slate-500">Weekly pay statements</p>
      <div className="space-y-3">
        {list.map((s) => {
          const c = calcStatement(s, driver);
          return (
            <Link key={s.id} href={`/driver/pay/${s.id}`} className="block">
              <Card className="p-4">
                <div className="flex items-center justify-between"><p className="text-sm font-semibold text-slate-900">{s.weekLabel}</p><Badge>{s.status}</Badge></div>
                <div className="mt-2 flex items-end justify-between">
                  <p className="text-2xl font-bold text-navy">{money(c.total)}</p>
                  <p className="flex items-center gap-1 text-xs text-slate-500">{c.loadedMiles + c.emptyMiles} mi {s.status === "Approved" && <Lock size={12} />}<ChevronRight size={18} /></p>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </>
  );
}
