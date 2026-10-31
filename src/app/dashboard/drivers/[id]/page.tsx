import Link from "next/link";
import { notFound } from "next/navigation";
import { Truck, Container } from "lucide-react";
import { Badge, Card, CardHeader, Field, InfoRow, PageHeader, Select, Table, Td, btn } from "@/components/ui";
import ModalButton from "@/components/ui/ModalButton";
import { getDriver, getDrivers, getLoads, getPayStatements, getVehicles } from "@/services";
import { calcStatement } from "@/lib/pay";
import { expiryTone, fmtDate, money } from "@/lib/utils";

export default async function DriverDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const driver = await getDriver(id);
  if (!driver) notFound();
  const [vehicles, drivers, loads, statements] = await Promise.all([getVehicles(), getDrivers(), getLoads(), getPayStatements()]);
  const truck = vehicles.find((v) => v.id === driver.truckId);
  const trailer = vehicles.find((v) => v.id === driver.trailerId);
  const myLoads = loads.filter((l) => l.driverId === id);
  const myStatements = statements.filter((s) => s.driverId === id);
  const options = (type: "Truck" | "Trailer") =>
    vehicles.filter((v) => v.type === type).map((v) => {
      const owner = drivers.find((d) => (type === "Truck" ? d.truckId : d.trailerId) === v.id && d.id !== driver.id);
      return <option key={v.id} value={v.id}>{v.unit} – {v.plate}{owner ? ` (with ${owner.name})` : ""}</option>;
    });

  return (
    <>
      <PageHeader title={driver.name} subtitle={`${driver.phone} · ${driver.email}`} action={<><Badge>{driver.status}</Badge><Link href="/dashboard/drivers/new" className={btn("outline")}>Edit</Link></>} />
      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader title="Profile & documents" />
          <div className="px-5 py-2">
            <InfoRow label="CDL number" value={driver.cdlNumber} />
            <InfoRow label="CDL expiry" value={<>{fmtDate(driver.cdlExpiry)} <Badge>{expiryTone(driver.cdlExpiry)}</Badge></>} />
            <InfoRow label="Medical card expiry" value={<>{fmtDate(driver.medicalExpiry)} <Badge>{expiryTone(driver.medicalExpiry)}</Badge></>} />
            <InfoRow label="Loaded rate" value={money(driver.loadedRate) + " / mi"} />
            <InfoRow label="Empty rate" value={money(driver.emptyRate) + " / mi"} />
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader title="Assigned equipment (shows on the driver's portal)" />
          <div className="grid gap-4 p-5 sm:grid-cols-2">
            {[{ label: "Truck", item: truck, icon: Truck, type: "Truck" as const }, { label: "Trailer", item: trailer, icon: Container, type: "Trailer" as const }].map((e) => (
              <div key={e.label} className="rounded-xl border border-slate-200 p-4">
                <div className="flex items-center justify-between"><p className="flex items-center gap-2 text-sm font-semibold text-navy"><e.icon size={18} className="text-accent" /> {e.label}</p><Badge>{e.item ? "Assigned" : "Unassigned"}</Badge></div>
                {e.item ? <p className="mt-2 text-sm text-slate-600"><b className="text-slate-900">{e.item.unit}</b> · {e.item.plate}<br />{e.item.make}</p> : <p className="mt-2 text-sm text-slate-400">No {e.label.toLowerCase()} assigned</p>}
                <div className="mt-3 flex gap-2">
                  <ModalButton label={e.item ? `Change ${e.label.toLowerCase()}` : `Assign ${e.label.toLowerCase()}`} size="sm" variant="outline" title={`${e.item ? "Change" : "Assign"} ${e.label.toLowerCase()} for ${driver.name}`} confirmLabel="Save" description="The driver sees the update on their portal right away.">
                    <Field label={e.label}><Select defaultValue={e.item?.id ?? ""}><option value="">Select {e.label.toLowerCase()}</option>{options(e.type)}</Select></Field>
                  </ModalButton>
                  {e.item && <ModalButton label="Remove" size="sm" variant="danger" confirmLabel={`Remove ${e.label.toLowerCase()}`} title={`Remove ${e.label.toLowerCase()} from ${driver.name}?`} description={`${e.item.unit} will be unassigned and will disappear from the driver's portal. It stays in the vehicle list.`} />}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Assigned loads" />
          <Table heads={["Load #", "Route", "Pickup", "Miles (L / E)", "Status"]}>
            {myLoads.map((l) => (
              <tr key={l.id}>
                <Td><Link href={`/dashboard/loads/${l.id}`} className="font-semibold text-navy">{l.loadNumber}</Link></Td>
                <Td>{l.pickup.city} → {l.delivery.city}</Td><Td>{fmtDate(l.pickup.date)}</Td><Td>{l.loadedMiles} / {l.emptyMiles}</Td><Td><Badge>{l.status}</Badge></Td>
              </tr>
            ))}
          </Table>
        </Card>
        <Card>
          <CardHeader title="Weekly pay" />
          <ul className="divide-y divide-slate-100">
            {myStatements.map((s) => (
              <li key={s.id} className="flex items-center justify-between px-5 py-3 text-sm">
                <Link href={`/dashboard/pay/${s.id}`} className="font-medium text-navy">{s.weekLabel}</Link>
                <span>{money(calcStatement(s, driver).total)} <Badge>{s.status}</Badge></span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}
