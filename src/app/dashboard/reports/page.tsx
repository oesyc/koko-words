import { FileDown, FileSpreadsheet } from "lucide-react";
import { Badge, Card, CardHeader, PageHeader, Select, Table, Td, btn } from "@/components/ui";
import RevenueChart from "@/components/dashboard/RevenueChart";
import { getBrokers, getDriverPerformance, getDrivers, getInvoices, getLoads, getMonthlyFinance, getPayStatements } from "@/services";
import { calcStatement } from "@/lib/pay";
import { money } from "@/lib/utils";

const Export = () => <div className="flex gap-2"><button className={btn("outline", "sm")}><FileDown size={14} /> PDF</button><button className={btn("outline", "sm")}><FileSpreadsheet size={14} /> Excel</button></div>;

export default async function ReportsPage() {
  const [drivers, statements, loads, brokers, invoices, finance, perf] = await Promise.all([getDrivers(), getPayStatements(), getLoads(), getBrokers(), getInvoices(), getMonthlyFinance(), getDriverPerformance()]);
  const rows = statements.filter((s) => s.weekLabel.startsWith("Oct 26")).map((s) => { const d = drivers.find((x) => x.id === s.driverId)!; return { s, d, c: calcStatement(s, d) }; });
  const total = rows.reduce((a, r) => a + r.c.total, 0);
  const statuses = ["Booked", "At pickup", "Loaded", "In transit", "Delivered", "Delayed", "Other"] as const;
  const chips = [["Load summary", "load-summary"], ["Revenue and expenses", "revenue"], ["Driver performance", "performance"], ["Broker statements", "statements"], ["Weekly driver pay", "weekly-pay"]];

  return (
    <>
      <PageHeader title="Reports" subtitle="Filter by date, driver or customer." action={<Select className="!w-44"><option>Last 30 days</option><option>This month</option><option>This year</option></Select>} />
      <div className="mb-6 flex flex-wrap gap-2">{chips.map(([l, id]) => <a key={id} href={`#${id}`} className="rounded-full border border-slate-300 bg-white px-4 py-1.5 text-sm font-medium text-slate-700 hover:border-accent hover:text-accent">{l}</a>)}</div>

      <div className="space-y-6">
        <Card className="scroll-mt-20" >
          <div id="load-summary" />
          <CardHeader title="Load summary" action={<Export />} />
          <Table heads={["Status", "Loads", "Loaded miles", "Empty miles", "Revenue"]}>
            {statuses.map((st) => { const ls = loads.filter((l) => l.status === st); return (
              <tr key={st}><Td><Badge>{st}</Badge></Td><Td>{ls.length}</Td><Td>{ls.reduce((a, l) => a + l.loadedMiles, 0)}</Td><Td>{ls.reduce((a, l) => a + l.emptyMiles, 0)}</Td><Td>{money(ls.reduce((a, l) => a + l.rate, 0))}</Td></tr>
            ); })}
          </Table>
        </Card>

        <Card>
          <div id="revenue" />
          <CardHeader title="Revenue and expenses" action={<Export />} />
          <div className="grid gap-6 p-5 lg:grid-cols-2">
            <RevenueChart data={finance} />
            <Table heads={["Month", "Revenue", "Expenses", "Profit"]}>
              {finance.map((m) => <tr key={m.month}><Td>{m.month}</Td><Td>{money(m.revenue)}</Td><Td>{money(m.expenses)}</Td><Td className="font-semibold text-green-700">{money(m.revenue - m.expenses)}</Td></tr>)}
            </Table>
          </div>
        </Card>

        <Card>
          <div id="performance" />
          <CardHeader title="Driver performance" action={<Export />} />
          <Table heads={["Driver", "Loads", "Total miles", "Revenue", "On-time %", "Rating"]}>
            {drivers.map((d) => { const ls = loads.filter((l) => l.driverId === d.id); return (
              <tr key={d.id}><Td className="font-semibold">{d.name}</Td><Td>{ls.length}</Td><Td>{ls.reduce((a, l) => a + l.loadedMiles + l.emptyMiles, 0)}</Td><Td>{money(ls.reduce((a, l) => a + l.rate, 0))}</Td><Td>{perf[d.id]?.onTime}%</Td><Td>★ {perf[d.id]?.rating}</Td></tr>
            ); })}
          </Table>
        </Card>

        <Card>
          <div id="statements" />
          <CardHeader title="Customer and broker statements" action={<Export />} />
          <Table heads={["Broker", "Loads", "Billed", "Paid", "Outstanding", "Terms"]}>
            {brokers.map((b) => {
              const inv = invoices.filter((i) => i.brokerId === b.id); const amt = (i: (typeof inv)[number]) => i.linehaul + i.extras.reduce((a, e) => a + e.amount, 0);
              const billed = inv.reduce((a, i) => a + amt(i), 0), paid = inv.filter((i) => i.status === "Paid").reduce((a, i) => a + amt(i), 0);
              return <tr key={b.id}><Td className="font-semibold">{b.name}</Td><Td>{loads.filter((l) => l.brokerId === b.id).length}</Td><Td>{money(billed)}</Td><Td>{money(paid)}</Td><Td className="font-semibold text-accent-dark">{money(billed - paid)}</Td><Td>{b.paymentTerms}</Td></tr>;
            })}
          </Table>
        </Card>

        <Card>
          <div id="weekly-pay" />
          <CardHeader title="Weekly driver pay · Oct 26 – Nov 1, 2026" action={<Export />} />
          <Table heads={["Driver", "Loads", "Loaded miles", "Empty miles", "Loaded pay", "Empty pay", "Extras", "Deductions", "Total"]}>
            {rows.map(({ s, d, c }) => <tr key={s.id}><Td className="font-semibold">{d.name}</Td><Td>{s.lines.length}</Td><Td>{c.loadedMiles}</Td><Td>{c.emptyMiles}</Td><Td>{money(c.loadedPay)}</Td><Td>{money(c.emptyPay)}</Td><Td>{money(c.extras)}</Td><Td>{money(c.deductions)}</Td><Td className="font-semibold">{money(c.total)}</Td></tr>)}
            <tr className="bg-navy-50"><Td className="font-bold">Total</Td><Td /><Td /><Td /><Td /><Td /><Td /><Td /><Td className="font-bold text-navy">{money(total)}</Td></tr>
          </Table>
        </Card>
      </div>
    </>
  );
}
