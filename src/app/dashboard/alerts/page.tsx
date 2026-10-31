import { Bell, AlertTriangle, CalendarClock } from "lucide-react";
import { Badge, Card, PageHeader, StatCard } from "@/components/ui";
import { getAlerts } from "@/services";
import { fmtDate } from "@/lib/utils";

export default async function AlertsPage() {
  const alerts = await getAlerts();
  return (
    <>
      <PageHeader title="Alerts & Reminders" subtitle="Late loads, expiring documents, insurance and service." />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="High priority" value={alerts.filter((a) => a.severity === "High").length} icon={<AlertTriangle />} accent />
        <StatCard label="Medium priority" value={alerts.filter((a) => a.severity === "Medium").length} icon={<Bell />} />
        <StatCard label="Upcoming" value={alerts.filter((a) => a.severity === "Low").length} icon={<CalendarClock />} />
      </div>
      <Card>
        <ul className="divide-y divide-slate-100">
          {alerts.map((a) => (
            <li key={a.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
              <div className="flex items-start gap-3"><Badge>{a.severity}</Badge><div><p className="font-medium text-slate-900">{a.title}</p><p className="text-sm text-slate-500">{a.type} · {a.detail}</p></div></div>
              <span className="text-sm text-slate-500">{fmtDate(a.date)}</span>
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
}
