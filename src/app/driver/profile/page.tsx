import Link from "next/link";
import { LogOut } from "lucide-react";
import { Badge, Card, InfoRow, btn } from "@/components/ui";
import { getCurrentDriverId, getDriver, getVehicle } from "@/services";
import { expiryTone, fmtDate, money } from "@/lib/utils";

export default async function ProfilePage() {
  const d = (await getDriver(await getCurrentDriverId()))!;
  const truck = d.truckId ? await getVehicle(d.truckId) : undefined;
  const trailer = d.trailerId ? await getVehicle(d.trailerId) : undefined;
  return (
    <>
      <div className="mb-5 flex flex-col items-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent text-3xl font-bold text-white">{d.name[0]}</div>
        <h1 className="mt-3 text-xl font-bold text-navy">{d.name}</h1><Badge>{d.status}</Badge>
      </div>
      <Card className="mb-4 px-4 py-2">
        <InfoRow label="Phone" value={d.phone} /><InfoRow label="Email" value={d.email} /><InfoRow label="Truck" value={truck ? `${truck.unit} (${truck.plate})` : "Not assigned"} /><InfoRow label="Trailer" value={trailer ? `${trailer.unit} (${trailer.plate})` : "Not assigned"} />
      </Card>
      <Card className="mb-4 px-4 py-2">
        <InfoRow label="CDL number" value={d.cdlNumber} />
        <InfoRow label="CDL expiry" value={<>{fmtDate(d.cdlExpiry)} <Badge>{expiryTone(d.cdlExpiry)}</Badge></>} />
        <InfoRow label="Medical card expiry" value={<>{fmtDate(d.medicalExpiry)} <Badge>{expiryTone(d.medicalExpiry)}</Badge></>} />
      </Card>
      <p className="mb-4 text-center text-xs text-slate-400">Truck and trailer are assigned by the office.</p>
      <Card className="mb-4 px-4 py-2"><InfoRow label="Loaded rate" value={money(d.loadedRate) + " / mi"} /><InfoRow label="Empty rate" value={money(d.emptyRate) + " / mi"} /></Card>
      <Link href="/login" className={btn("outline") + " w-full"}><LogOut size={16} /> Log out</Link>
    </>
  );
}
