import Link from "next/link";
import { Lock } from "lucide-react";
import { Badge, Card, PageHeader, Select, Table, Td } from "@/components/ui";
import { FilterBar } from "@/components/ui";
import { getDrivers, getPayStatements } from "@/services";
import { calcStatement } from "@/lib/pay";
import { money } from "@/lib/utils";

export default async function PayPage() {
  const [statements, drivers] = await Promise.all([getPayStatements(), getDrivers()]);
  return (
    <>
      <PageHeader title="Driver Pay" subtitle="Weekly pay statements. Approved weeks are locked." />
      <Card>
        <FilterBar>
          <Select><option>All weeks</option><option>Oct 26 – Nov 1, 2026</option><option>Oct 19 – Oct 25, 2026</option></Select>
          <Select><option>All drivers</option>{drivers.map((d) => <option key={d.id}>{d.name}</option>)}</Select>
        </FilterBar>
        <Table heads={["Week", "Driver", "Loads", "Loaded miles", "Empty miles", "Total pay", "Status"]}>
          {statements.map((s) => {
            const d = drivers.find((x) => x.id === s.driverId)!;
            const c = calcStatement(s, d);
            return (
              <tr key={s.id} className="hover:bg-slate-50">
                <Td><Link href={`/dashboard/pay/${s.id}`} className="font-semibold text-navy">{s.weekLabel}</Link></Td>
                <Td>{d.name}</Td><Td>{s.lines.length}</Td><Td>{c.loadedMiles}</Td><Td>{c.emptyMiles}</Td>
                <Td className="font-semibold">{money(c.total)}</Td>
                <Td><span className="flex items-center gap-1">{s.status === "Approved" && <Lock size={14} className="text-slate-400" />}<Badge>{s.status}</Badge></span></Td>
              </tr>
            );
          })}
        </Table>
      </Card>
    </>
  );
}
