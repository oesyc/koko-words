import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, MapPin } from "lucide-react";
import { Badge, Card, Field, InfoRow, Select, Textarea } from "@/components/ui";
import ModalButton from "@/components/ui/ModalButton";
import { getBroker, getLoad } from "@/services";
import DriverUploadCard from "@/components/loads/DriverUploadCard";
import { fmtDate } from "@/lib/utils";

export default async function DriverLoadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const l = await getLoad(id);
  if (!l) notFound();
  const broker = await getBroker(l.brokerId);
  const existing = [
    ...(l.hasRateCon ? [{ name: `RateConfirmation_${l.loadNumber}.pdf`, type: "Rate confirmation (from office)", status: "Available" }] : []),
    ...(l.hasBol ? [{ name: `BOL_${l.loadNumber}_signed.pdf`, type: "Signed BOL", status: "Received" }] : []),
    ...(l.id === "l6" ? [{ name: "FuelReceipt_blurry.jpg", type: "Fuel receipt", status: "Needs re-upload" }] : []),
  ];
  const statuses = ["At pickup", "Loaded", "In transit", "Delivered", "Delayed", "Other"];

  return (
    <>
      <Link href="/driver" className="mb-3 inline-flex items-center text-sm text-slate-500"><ChevronLeft size={18} /> My Loads</Link>
      <div className="mb-4 flex items-center justify-between"><h1 className="text-xl font-bold text-navy">{l.loadNumber}</h1><Badge>{l.status}</Badge></div>
      {l.note && <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">⚠ {l.note}</div>}

      <Card className="mb-4 space-y-4 p-4">
        <div className="flex gap-3"><MapPin className="shrink-0 text-accent" /><div><p className="text-xs font-semibold uppercase text-slate-400">Pickup · {fmtDate(l.pickup.date)}</p><p className="text-sm font-medium">{l.pickup.address}</p></div></div>
        <div className="flex gap-3"><MapPin className="shrink-0 text-navy" /><div><p className="text-xs font-semibold uppercase text-slate-400">Delivery · {fmtDate(l.delivery.date)}</p><p className="text-sm font-medium">{l.delivery.address}</p></div></div>
      </Card>

      <Card className="mb-4 px-4 py-2">
        <InfoRow label="Broker" value={broker?.name} /><InfoRow label="Broker contact" value={broker?.phone} />
        <InfoRow label="Loaded miles" value={l.loadedMiles} /><InfoRow label="Empty miles" value={l.emptyMiles} />
      </Card>

      <div className="mb-4">
        <ModalButton label="Update status" variant="accent" title="Update status" confirmLabel="Confirm">
          <Field label="New status"><Select>{statuses.map((s) => <option key={s}>{s}</option>)}</Select></Field>
          <Field label="Note (required if “Other”)"><Textarea rows={3} /></Field>
        </ModalButton>
      </div>

      <DriverUploadCard loadNumber={l.loadNumber} existing={existing} />
    </>
  );
}
