import { brokers } from "@/lib/mock-data";
import Link from "next/link";
import { Package, Users, Receipt, DollarSign, ChevronRight, UploadCloud, FileText, AlertTriangle, Clock, FileWarning } from "lucide-react";
import { Badge, Card, CardHeader, PageHeader, Select, StatCard, Table, Td, btn } from "@/components/ui";
import RevenueChart from "@/components/dashboard/RevenueChart";
import { getAlerts, getCurrentRole, getDrivers, getInvoices, getLoads, getMonthlyFinance, getVehicles } from "@/services";
import { TODAY, etaLabel, expiryTone, fmtDate, money } from "@/lib/utils";
import { cn } from "@/lib/utils";

const initials = (n: string) => n.split(" ").map((x) => x[0]).join("");
const avatarCls = ["bg-navy-100 text-navy", "bg-accent-50 text-accent-dark", "bg-green-100 text-green-800", "bg-red-100 text-red-700"];
const reportLinks = [["Load summary", "load-summary"], ["Revenue and expenses", "revenue"], ["Driver performance", "performance"], ["Customer and broker statements", "statements"], ["Weekly driver pay", "weekly-pay"]];

export default async function DashboardPage() {
  const role = await getCurrentRole();
  const isAdmin = role === "Admin";
  const [loads, drivers, invoices, alerts, finance, vehicles] = await Promise.all([getLoads(), getDrivers(), getInvoices(), getAlerts(), getMonthlyFinance(), getVehicles()]);
  const active = loads.filter((l) => l.status !== "Delivered");
  const deliveringToday = loads.filter((l) => l.delivery.date === TODAY && l.status !== "Delivered").length;
  const onDuty = drivers.filter((d) => d.status === "On duty").length;
  const unpaid = invoices.filter((i) => i.status === "Sent" || i.status === "Overdue");
  const overdue = invoices.filter((i) => i.status === "Overdue").length;
  const amt = (i: (typeof invoices)[number]) => i.linehaul + i.extras.reduce((a, e) => a + e.amount, 0);
  const unpaidTotal = unpaid.reduce((a, i) => a + amt(i), 0);
  const thisMonth = finance[finance.length - 1], prev = finance[finance.length - 2];
  const growth = Math.round(((thisMonth.revenue - prev.revenue) / prev.revenue) * 100);
  const missingBol = loads.filter((l) => l.status === "Delivered" && !l.hasBol);
  const alertStyle = { High: "bg-red-50 border-red-200 text-red-800", Medium: "bg-amber-50 border-amber-200 text-amber-800", Low: "bg-navy-50 border-navy-100 text-navy" };

  return (
    <>
      <PageHeader title="Fleet overview" subtitle={isAdmin ? "Loads, drivers, invoices and documents in one place." : "Dispatcher view: loads, documents and invoices."}
        action={<><Select className="!w-40"><option>Last 30 days</option><option>Last 7 days</option><option>This month</option><option>This year</option></Select><Link href="/dashboard/loads/new" className={btn("accent")}>+ New load</Link></>} />

      <div className={cn("grid gap-4 sm:grid-cols-2", isAdmin ? "xl:grid-cols-4" : "xl:grid-cols-3")}>
        <StatCard label="Active loads" value={active.length} hint={`${deliveringToday} delivering today`} icon={<Package />} />
        <StatCard label="Drivers on duty" value={`${onDuty} / ${drivers.length}`} hint={`${drivers.length - onDuty} off duty`} icon={<Users />} />
        {isAdmin && <StatCard label="Revenue this month" value={money(thisMonth.revenue)} hint={`${growth >= 0 ? "Up" : "Down"} ${Math.abs(growth)}% on last month`} icon={<DollarSign />} />}
        <StatCard label="Unpaid invoices" value={money(unpaidTotal)} hint={`${overdue} overdue`} icon={<Receipt />} accent />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <Card className={isAdmin ? "xl:col-span-2" : "xl:col-span-3"}>
          <CardHeader title="Load tracking" action={<Link href="/dashboard/loads" className="text-sm font-semibold text-accent">View all</Link>} />
          <Table heads={["Load", "Route", "Driver", "Status", "ETA"]}>
            {loads.slice(0, 5).map((l) => (
              <tr key={l.id} className="hover:bg-slate-50">
                <Td><Link href={`/dashboard/loads/${l.id}`} className="font-semibold text-navy">#{l.loadNumber}</Link></Td>
                <Td>{l.pickup.city} → {l.delivery.city}</Td>
                <Td>{drivers.find((d) => d.id === l.driverId)?.name}</Td>
                <Td><Badge>{l.status}</Badge></Td>
                <Td className={l.status === "Delayed" ? "font-semibold text-red-600" : ""}>{etaLabel(l.status, l.delivery.date)}</Td>
              </tr>
            ))}
          </Table>
        </Card>
        {isAdmin && <Card>
          <CardHeader title="Revenue and expenses" action={<span className="text-xs text-slate-400">Last 6 months</span>} />
          <div className="p-5"><RevenueChart data={finance} /></div>
        </Card>}
      </div>

      <div className={cn("mt-6 grid gap-6", isAdmin && "lg:grid-cols-2")}>
        {isAdmin && <Card>
          <CardHeader title="Driver management" action={<Link href="/dashboard/drivers" className="text-sm font-semibold text-navy">View all</Link>} />
          <ul className="divide-y divide-slate-100">
            {drivers.map((d, i) => (
              <li key={d.id}>
                <Link href={`/dashboard/drivers/${d.id}`} className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50">
                  <span className={cn("flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold", avatarCls[i % 4])}>{initials(d.name)}</span>
                  <div className="flex-1"><p className="text-sm font-semibold text-slate-900">{d.name}</p><p className="text-xs text-slate-500">{vehicles.find((v) => v.id === d.truckId)?.unit} · CDL valid till {fmtDate(d.cdlExpiry)}</p></div>
                  <div className="text-right"><Badge>{d.status}</Badge>{expiryTone(d.medicalExpiry) !== "Valid" && <p className="mt-1 text-[11px] text-amber-700">Medical card due soon</p>}</div>
                </Link>
              </li>
            ))}
          </ul>
        </Card>}
        <Card>
          <CardHeader title="Invoices" action={<Link href="/dashboard/invoices" className="text-sm font-semibold text-navy">Create invoice</Link>} />
          <ul className="divide-y divide-slate-100">
            {invoices.map((i) => (
              <li key={i.id}>
                <Link href={`/dashboard/invoices/${i.id}`} className="flex items-center justify-between gap-3 px-5 py-3 hover:bg-slate-50">
                  <div><p className="text-sm font-semibold text-slate-900">{i.number} · {getBrokerName(i.brokerId)}</p><p className="text-xs text-slate-500">Load #{i.loadNumber}</p></div>
                  <div className="flex items-center gap-3"><span className="text-sm font-semibold">{money(amt(i))}</span><Badge>{i.status}</Badge></div>
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className={cn("mt-6 grid gap-6", isAdmin ? "lg:grid-cols-3" : "lg:grid-cols-2")}>
        <Card>
          <CardHeader title="Load documents" action={<Link href="/dashboard/documents" className="text-sm font-semibold text-navy">Open</Link>} />
          <div className="space-y-3 p-5">
            <label className="flex cursor-pointer flex-col items-center gap-1 rounded-xl border-2 border-dashed border-navy-100 bg-navy-50/50 p-5 text-center hover:border-accent">
              <UploadCloud className="text-navy" /><span className="text-sm font-semibold text-slate-800">Upload Rate Confirmation or BOL</span><span className="text-xs text-slate-500">PDF or photo, attached to the load</span>
              <input type="file" className="hidden" />
            </label>
            {loads.filter((l) => l.hasRateCon).slice(0, 2).map((l) => (
              <p key={l.id} className="flex items-center justify-between text-sm"><span className="flex items-center gap-2"><FileText size={16} className="text-slate-400" /> RateConfirmation_{l.loadNumber}.pdf</span><span className="text-xs text-slate-500">Rate con</span></p>
            ))}
            {loads.filter((l) => l.hasBol).slice(0, 1).map((l) => (
              <p key={l.id} className="flex items-center justify-between text-sm"><span className="flex items-center gap-2"><FileText size={16} className="text-slate-400" /> BOL_{l.loadNumber}_signed.pdf</span><span className="text-xs text-slate-500">BOL</span></p>
            ))}
          </div>
        </Card>
        <Card>
          <CardHeader title="Alerts and reminders" action={<Link href="/dashboard/alerts" className="text-sm font-semibold text-navy">All</Link>} />
          <div className="space-y-2 p-4">
            {alerts.slice(0, 3).map((a) => (
              <div key={a.id} className={cn("flex items-start gap-3 rounded-lg border p-3", alertStyle[a.severity])}>
                {a.type === "Late load" ? <AlertTriangle size={18} /> : a.type === "Service due" ? <Clock size={18} /> : <FileWarning size={18} />}
                <div><p className="text-sm font-semibold">{a.title}</p><p className="text-xs opacity-80">{a.detail}</p></div>
              </div>
            ))}
            {missingBol.length > 0 && <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-amber-800"><FileWarning size={18} /><div><p className="text-sm font-semibold">{missingBol.length} delivered load(s) missing signed BOL</p><p className="text-xs opacity-80">Paperwork not complete</p></div></div>}
          </div>
        </Card>
        {isAdmin && <Card>
          <CardHeader title="Reports" />
          <p className="px-5 pt-3 text-xs text-slate-500">Filter by date, driver or customer</p>
          <div className="space-y-2 p-4">
            {reportLinks.map(([label, id]) => (
              <Link key={id} href={`/dashboard/reports#${id}`} className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-800 hover:border-accent hover:bg-accent-50">{label}<ChevronRight size={16} className="text-slate-400" /></Link>
            ))}
          </div>
        </Card>}
      </div>
    </>
  );
}

// helper (sync, mock). Phase 2 mein broker name API/DB se join hoga.
function getBrokerName(id: string) { return brokers.find((b) => b.id === id)?.name; }
