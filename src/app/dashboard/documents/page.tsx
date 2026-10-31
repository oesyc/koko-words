import Link from "next/link";
import { Download, FileText, UploadCloud, CheckCircle2, AlertCircle } from "lucide-react";
import { Badge, Card, CardHeader, FilterBar, Input, PageHeader, Select, StatCard, Table, Td, btn } from "@/components/ui";
import { getBrokers, getDrivers, getLoads } from "@/services";
import { fmtDate } from "@/lib/utils";

export default async function DocumentsPage() {
  const [loads, brokers, drivers] = await Promise.all([getLoads(), getBrokers(), getDrivers()]);
  const docs = loads.flatMap((l) => [
    ...(l.hasRateCon ? [{ id: l.id + "rc", load: l, name: `RateConfirmation_${l.loadNumber}.pdf`, type: "Rate con", date: l.pickup.date }] : []),
    ...(l.hasBol ? [{ id: l.id + "bol", load: l, name: `BOL_${l.loadNumber}_signed.pdf`, type: "BOL", date: l.delivery.date }] : []),
  ]);
  const missing = loads.filter((l) => l.status === "Delivered" && !l.hasBol);
  const complete = loads.filter((l) => l.hasRateCon && l.hasBol).length;

  return (
    <>
      <PageHeader title="Documents" subtitle="Rate confirmations and signed BOLs for every load." action={<button className={btn("accent")}><UploadCloud size={16} /> Upload document</button>} />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Total documents" value={docs.length} icon={<FileText />} />
        <StatCard label="Paperwork complete" value={complete} hint="Rate con + signed BOL" icon={<CheckCircle2 />} />
        <StatCard label="Missing signed BOL" value={missing.length} hint="Delivered loads" icon={<AlertCircle />} accent />
      </div>

      {missing.length > 0 && (
        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <p className="font-semibold">Paperwork needed</p>
          {missing.map((l) => <p key={l.id}>Load <Link href={`/dashboard/loads/${l.id}`} className="font-semibold underline">{l.loadNumber}</Link> is delivered but the signed BOL is missing ({drivers.find((d) => d.id === l.driverId)?.name}).</p>)}
        </div>
      )}

      <Card>
        <CardHeader title="All documents" />
        <FilterBar>
          <Input placeholder="Search file or load #..." />
          <Select><option>All types</option><option>Rate con</option><option>BOL</option></Select>
          <Select><option>All brokers</option>{brokers.map((b) => <option key={b.id}>{b.name}</option>)}</Select>
          <Select><option>All drivers</option>{drivers.map((d) => <option key={d.id}>{d.name}</option>)}</Select>
          <Input type="date" />
        </FilterBar>
        <Table heads={["File", "Type", "Load", "Broker", "Date", "Status", ""]}>
          {docs.map((d) => (
            <tr key={d.id} className="hover:bg-slate-50">
              <Td><span className="flex items-center gap-2 font-medium"><FileText size={16} className="text-slate-400" />{d.name}</span></Td>
              <Td>{d.type}</Td>
              <Td><Link href={`/dashboard/loads/${d.load.id}`} className="font-semibold text-navy">{d.load.loadNumber}</Link></Td>
              <Td>{brokers.find((b) => b.id === d.load.brokerId)?.name}</Td>
              <Td>{fmtDate(d.date)}</Td>
              <Td><Badge>{d.load.hasBol && d.load.hasRateCon ? "Approved" : "Pending"}</Badge></Td>
              <Td><button className={btn("ghost", "sm")}><Download size={14} /> Download</button></Td>
            </tr>
          ))}
        </Table>
      </Card>
    </>
  );
}
