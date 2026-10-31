import { notFound } from "next/navigation";
import { Lock, FileDown, FileSpreadsheet } from "lucide-react";
import { Badge, Card, CardHeader, Field, Input, InfoRow, PageHeader, Select, Table, Td, btn } from "@/components/ui";
import ModalButton from "@/components/ui/ModalButton";
import { getDriver, getPayStatement } from "@/services";
import { calcStatement } from "@/lib/pay";
import { fmtDate, money } from "@/lib/utils";

export default async function StatementPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const s = await getPayStatement(id);
  if (!s) notFound();
  const d = (await getDriver(s.driverId))!;
  const c = calcStatement(s, d);
  const locked = s.status === "Approved";

  return (
    <>
      <PageHeader
        title={`Pay statement · ${d.name}`}
        subtitle={`Week: ${s.weekLabel}`}
        action={
          <>
            <button className={btn("outline")}><FileDown size={16} /> PDF</button>
            <button className={btn("outline")}><FileSpreadsheet size={16} /> Excel</button>
            {!locked && (
              <ModalButton label="Add extra / deduction" variant="primary" title="Add extra or deduction" confirmLabel="Add">
                <Field label="Type"><Select><option>Extra – Detention</option><option>Extra – Stop pay</option><option>Extra – Bonus</option><option>Deduction – Advance</option></Select></Field>
                <Field label="Description"><Input placeholder="e.g. Detention – KW-1042" /></Field>
                <Field label="Amount (USD)"><Input type="number" /></Field>
              </ModalButton>
            )}
            {!locked && <ModalButton label="Approve week" variant="accent" title="Approve this week?" confirmLabel="Approve & lock" description="Once approved this week is locked. Later corrections go on the next week's statement." />}
          </>
        }
      />
      {locked && <div className="mb-4 flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-700"><Lock size={16} /> This week is approved and locked. Corrections must be added to the next week.</div>}

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Loads delivered this week" action={<Badge>{s.status}</Badge>} />
          <Table heads={["Load #", "Route", "Delivered", "Loaded mi", "Empty mi", "Loaded pay", "Empty pay"]}>
            {s.lines.map((l) => (
              <tr key={l.loadNumber}>
                <Td className="font-semibold text-navy">{l.loadNumber}</Td><Td>{l.route}</Td><Td>{fmtDate(l.deliveredOn)}</Td>
                <Td>{l.loadedMiles}</Td><Td>{l.emptyMiles}</Td>
                <Td>{money(l.loadedMiles * d.loadedRate)}</Td><Td>{money(l.emptyMiles * d.emptyRate)}</Td>
              </tr>
            ))}
          </Table>
          <div className="grid gap-6 border-t border-slate-100 p-5 sm:grid-cols-2">
            <div>
              <h3 className="mb-2 text-sm font-semibold text-green-700">Extras</h3>
              {s.extras.length === 0 && <p className="text-sm text-slate-400">None</p>}
              {s.extras.map((e) => <InfoRow key={e.label} label={e.label} value={"+ " + money(e.amount)} />)}
            </div>
            <div>
              <h3 className="mb-2 text-sm font-semibold text-red-600">Deductions</h3>
              {s.deductions.length === 0 && <p className="text-sm text-slate-400">None</p>}
              {s.deductions.map((e) => <InfoRow key={e.label} label={e.label} value={"− " + money(e.amount)} />)}
            </div>
          </div>
        </Card>
        <Card>
          <CardHeader title="Summary" />
          <div className="px-5 py-2">
            <InfoRow label="Loaded rate" value={money(d.loadedRate) + " / mi"} />
            <InfoRow label="Empty rate" value={money(d.emptyRate) + " / mi"} />
            <InfoRow label={`Loaded pay (${c.loadedMiles} mi)`} value={money(c.loadedPay)} />
            <InfoRow label={`Empty pay (${c.emptyMiles} mi)`} value={money(c.emptyPay)} />
            <InfoRow label="Extras" value={money(c.extras)} />
            <InfoRow label="Deductions" value={"− " + money(c.deductions)} />
          </div>
          <div className="flex items-center justify-between rounded-b-xl bg-navy px-5 py-4 text-white"><span className="font-semibold">Total pay</span><span className="text-2xl font-bold text-accent">{money(c.total)}</span></div>
        </Card>
      </div>
    </>
  );
}
