import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge, Card, CardHeader, InfoRow, PageHeader, Table, Td, btn } from "@/components/ui";
import { getDriver, getLoads, getPayStatements, getVehicle } from "@/services";
import { calcStatement } from "@/lib/pay";
import { expiryTone, fmtDate, money } from "@/lib/utils";

export default async function DriverDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const driver = await getDriver(id);
  if (!driver) notFound();
  const [truck, loads, statements] = await Promise.all([getVehicle(driver.truckId), getLoads(), getPayStatements()]);
  const myLoads = loads.filter((l) => l.driverId === id);
  const myStatements = statements.filter((s) => s.driverId === id);

  return (
    <>
      <PageHeader title={driver.name} subtitle={`${driver.phone} · ${driver.email}`} action={<><Badge>{driver.status}</Badge><Link href={`/dashboard/drivers/new`} className={btn("outline")}>Edit</Link></>} />
      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader title="Profile & documents" />
          <div className="px-5 py-2">
            <InfoRow label="Truck" value={`${truck?.unit} (${truck?.plate})`} />
            <InfoRow label="CDL number" value={driver.cdlNumber} />
            <InfoRow label="CDL expiry" value={<>{fmtDate(driver.cdlExpiry)} <Badge>{expiryTone(driver.cdlExpiry)}</Badge></>} />
            <InfoRow label="Medical card expiry" value={<>{fmtDate(driver.medicalExpiry)} <Badge>{expiryTone(driver.medicalExpiry)}</Badge></>} />
          </div>
        </Card>
        <Card>
          <CardHeader title="Pay rates" />
          <div className="px-5 py-2">
            <InfoRow label="Loaded miles" value={money(driver.loadedRate) + " / mile"} />
            <InfoRow label="Empty miles" value={money(driver.emptyRate) + " / mile"} />
          </div>
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
      <Card className="mt-6">
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
    </>
  );
}
