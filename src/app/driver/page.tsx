import Link from "next/link";
import { ChevronRight, MapPin } from "lucide-react";
import { Badge, Card } from "@/components/ui";
import { getCurrentDriverId, getLoads } from "@/services";
import { fmtDate, money } from "@/lib/utils";

export default async function MyLoadsPage() {
  const driverId = await getCurrentDriverId();
  const loads = (await getLoads()).filter((l) => l.driverId === driverId);
  return (
    <>
      <h1 className="mb-1 text-xl font-bold text-navy">My Loads</h1>
      <p className="mb-4 text-sm text-slate-500">{loads.length} loads assigned to you</p>
      <div className="space-y-3">
        {loads.map((l) => (
          <Link key={l.id} href={`/driver/loads/${l.id}`} className="block">
            <Card className="p-4 active:bg-slate-50">
              <div className="flex items-center justify-between"><span className="font-bold text-navy">{l.loadNumber}</span><Badge>{l.status}</Badge></div>
              <div className="mt-3 space-y-1 text-sm">
                <p className="flex items-center gap-2"><MapPin size={15} className="text-accent" /> {l.pickup.city} <span className="text-slate-400">· {fmtDate(l.pickup.date)}</span></p>
                <p className="flex items-center gap-2"><MapPin size={15} className="text-navy" /> {l.delivery.city} <span className="text-slate-400">· {fmtDate(l.delivery.date)}</span></p>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-slate-500"><span>{l.loadedMiles} loaded · {l.emptyMiles} empty mi</span><ChevronRight size={18} /></div>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}
