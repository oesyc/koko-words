import Link from "next/link";
import { Badge, Card, Input, PageHeader, Select, Table, Td, btn } from "@/components/ui";
import { getDrivers, getVehicles } from "@/services";
import { expiryTone, fmtDate, money } from "@/lib/utils";

export default async function DriversPage() {
  const [drivers, vehicles] = await Promise.all([getDrivers(), getVehicles()]);
  return (
    <>
      <PageHeader title="Drivers" subtitle="Profiles, documents and pay rates." action={<Link href="/dashboard/drivers/new" className={btn("accent")}>+ Add driver</Link>} />
      <Card>
        <div className="grid gap-3 border-b border-slate-100 p-4 sm:grid-cols-3"><Input placeholder="Search drivers..." /><Select><option>All statuses</option><option>On duty</option><option>Off duty</option><option>Inactive</option></Select></div>
        <Table heads={["Driver", "Phone", "Truck", "CDL expiry", "Medical expiry", "Loaded / Empty rate", "Status"]}>
          {drivers.map((d) => (
            <tr key={d.id} className="hover:bg-slate-50">
              <Td><Link href={`/dashboard/drivers/${d.id}`} className="font-semibold text-navy">{d.name}</Link></Td>
              <Td>{d.phone}</Td>
              <Td>{vehicles.find((v) => v.id === d.truckId)?.unit}</Td>
              <Td>{fmtDate(d.cdlExpiry)} <Badge>{expiryTone(d.cdlExpiry)}</Badge></Td>
              <Td>{fmtDate(d.medicalExpiry)} <Badge>{expiryTone(d.medicalExpiry)}</Badge></Td>
              <Td>{money(d.loadedRate)} / {money(d.emptyRate)}</Td>
              <Td><Badge>{d.status}</Badge></Td>
            </tr>
          ))}
        </Table>
      </Card>
    </>
  );
}
