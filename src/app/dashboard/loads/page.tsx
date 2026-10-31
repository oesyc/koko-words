import Link from "next/link";
import { Badge, Card, FilterBar, Input, PageHeader, Select, Table, Td, btn } from "@/components/ui";
import { getBrokers, getDrivers, getLoads } from "@/services";
import { fmtDate, money } from "@/lib/utils";

export default async function LoadsPage() {
  const [loads, brokers, drivers] = await Promise.all([getLoads(), getBrokers(), getDrivers()]);
  const statuses = ["Booked", "At pickup", "Loaded", "In transit", "Delivered", "Delayed", "Other"];
  return (
    <>
      <PageHeader title="Loads" subtitle="Track every load from booking to delivery." action={<Link href="/dashboard/loads/new" className={btn("accent")}>+ New Load</Link>} />
      <Card>
        <FilterBar>
          <Input placeholder="Search load #..." />
          <Select><option>All drivers</option>{drivers.map((d) => <option key={d.id}>{d.name}</option>)}</Select>
          <Select><option>All brokers</option>{brokers.map((b) => <option key={b.id}>{b.name}</option>)}</Select>
          <Select><option>All statuses</option>{statuses.map((s) => <option key={s}>{s}</option>)}</Select>
          <Input type="date" />
        </FilterBar>
        <Table heads={["Load #", "Broker", "Route", "Pickup", "Delivery", "Driver", "Miles (L / E)", "Rate", "Status"]}>
          {loads.map((l) => (
            <tr key={l.id} className="hover:bg-slate-50">
              <Td><Link href={`/dashboard/loads/${l.id}`} className="font-semibold text-navy">{l.loadNumber}</Link></Td>
              <Td>{brokers.find((b) => b.id === l.brokerId)?.name}</Td>
              <Td>{l.pickup.city} → {l.delivery.city}</Td>
              <Td>{fmtDate(l.pickup.date)}</Td>
              <Td>{fmtDate(l.delivery.date)}</Td>
              <Td>{drivers.find((d) => d.id === l.driverId)?.name}</Td>
              <Td>{l.loadedMiles} / {l.emptyMiles}</Td>
              <Td>{money(l.rate)}</Td>
              <Td><Badge>{l.status}</Badge></Td>
            </tr>
          ))}
        </Table>
      </Card>
    </>
  );
}
