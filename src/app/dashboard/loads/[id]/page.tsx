import Link from "next/link";
import { notFound } from "next/navigation";
import { Download, FileText, CheckCircle2, XCircle, MapPin } from "lucide-react";
import { Badge, Card, CardHeader, Field, InfoRow, Input, PageHeader, Select, Textarea, btn } from "@/components/ui";
import ModalButton from "@/components/ui/ModalButton";
import { getBroker, getDriver, getDrivers, getLoad, getVehicle, getVehicles } from "@/services";
import { fmtDate, money } from "@/lib/utils";

export default async function LoadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const load = await getLoad(id);
  if (!load) notFound();
  const [broker, driver, truck, drivers, vehicles] = await Promise.all([getBroker(load.brokerId), getDriver(load.driverId), getVehicle(load.truckId), getDrivers(), getVehicles()]);
  const statuses = ["Booked", "At pickup", "Loaded", "In transit", "Delivered", "Delayed", "Other"];
  const history = [["Booked", "Oct 28, 9:10 AM"], ["At pickup", "Oct 29, 7:45 AM"], ["Loaded", "Oct 29, 9:30 AM"], ["In transit", "Oct 29, 10:05 AM"]];

  return (
    <>
      <PageHeader
        title={`Load ${load.loadNumber}`}
        subtitle={`${broker?.name} · ${load.pickup.city} → ${load.delivery.city}`}
        action={
          <>
            <Badge>{load.status}</Badge>
            <ModalButton label="Update status" title="Update load status" confirmLabel="Update">
              <Field label="New status"><Select defaultValue={load.status}>{statuses.map((s) => <option key={s}>{s}</option>)}</Select></Field>
              <Field label="Note (required if “Other”)"><Textarea rows={3} placeholder="Add a note..." /></Field>
            </ModalButton>
            <Link href="/dashboard/invoices/i1" className={btn("accent")}>Create invoice</Link>
          </>
        }
      />
      {load.note && <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">⚠ {load.note}</div>}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader title="Route" />
            <div className="grid gap-4 p-5 sm:grid-cols-2">
              <div className="flex gap-3"><MapPin className="text-accent" /><div><p className="text-xs font-semibold uppercase text-slate-400">Pickup</p><p className="font-medium">{load.pickup.address}</p><p className="text-sm text-slate-500">{fmtDate(load.pickup.date)}</p></div></div>
              <div className="flex gap-3"><MapPin className="text-navy" /><div><p className="text-xs font-semibold uppercase text-slate-400">Delivery</p><p className="font-medium">{load.delivery.address}</p><p className="text-sm text-slate-500">{fmtDate(load.delivery.date)}</p></div></div>
            </div>
          </Card>
          <Card>
            <CardHeader title="Documents" action={<button className={btn("outline", "sm")}><Download size={16} /> Download all</button>} />
            <ul className="divide-y divide-slate-100">
              {[["Rate Confirmation", load.hasRateCon], ["Signed BOL", load.hasBol]].map(([name, ok]) => (
                <li key={String(name)} className="flex items-center justify-between px-5 py-3">
                  <div className="flex items-center gap-3"><FileText className="text-slate-400" /><span className="text-sm font-medium">{String(name)}</span></div>
                  <div className="flex items-center gap-3">
                    {ok ? <span className="flex items-center gap-1 text-sm text-green-700"><CheckCircle2 size={16} /> Uploaded</span> : <span className="flex items-center gap-1 text-sm text-red-600"><XCircle size={16} /> Missing</span>}
                    {ok ? <button className={btn("ghost", "sm")}>Download</button> : <button className={btn("outline", "sm")}>Upload</button>}
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-slate-100 px-5 py-3 text-sm">Paperwork: {load.hasBol && load.hasRateCon ? <Badge>Approved</Badge> : <Badge>Pending</Badge>} <span className="ml-1 text-slate-500">(signed BOL upload marks paperwork complete)</span></div>
          </Card>
          <Card>
            <CardHeader title="Status history" />
            <ol className="space-y-3 p-5">
              {history.map(([s, t]) => (
                <li key={s} className="flex items-center gap-3 text-sm"><span className="h-2.5 w-2.5 rounded-full bg-accent" /><span className="font-medium">{s}</span><span className="text-slate-500">{t}</span></li>
              ))}
            </ol>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader title="Rate & miles" action={
              <ModalButton label="Adjust miles" size="sm" variant="outline" title="Adjust miles" description="Miles are calculated automatically. Add a note when you change them.">
                <div className="grid grid-cols-2 gap-3"><Field label="Loaded miles"><Input type="number" defaultValue={load.loadedMiles} /></Field><Field label="Empty miles"><Input type="number" defaultValue={load.emptyMiles} /></Field></div>
                <Field label="Reason / note"><Textarea rows={3} /></Field>
              </ModalButton>} />
            <div className="px-5 py-2">
              <InfoRow label="Rate" value={money(load.rate)} />
              <InfoRow label="Loaded miles" value={load.loadedMiles} />
              <InfoRow label="Empty miles" value={load.emptyMiles} />
              <InfoRow label="Rate per mile" value={money(load.rate / load.loadedMiles)} />
            </div>
          </Card>
          <Card>
            <CardHeader title="Assignment" action={
              <ModalButton label="Change" size="sm" variant="outline" title="Assign driver and truck">
                <Field label="Driver"><Select defaultValue={load.driverId}>{drivers.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}</Select></Field>
                <Field label="Truck"><Select defaultValue={load.truckId}>{vehicles.filter((v) => v.type === "Truck").map((v) => <option key={v.id} value={v.id}>{v.unit} – {v.plate}</option>)}</Select></Field>
              </ModalButton>} />
            <div className="px-5 py-2">
              <InfoRow label="Driver" value={driver?.name} />
              <InfoRow label="Phone" value={driver?.phone} />
              <InfoRow label="Truck" value={`${truck?.unit} (${truck?.plate})`} />
            </div>
          </Card>
          <Card>
            <CardHeader title="Broker" />
            <div className="px-5 py-2">
              <InfoRow label="Name" value={broker?.name} />
              <InfoRow label="Contact" value={broker?.contact} />
              <InfoRow label="Payment terms" value={broker?.paymentTerms} />
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
