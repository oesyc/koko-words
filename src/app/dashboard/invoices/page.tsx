import Link from "next/link";
import { Badge, Card, Field, Input, PageHeader, Select, Table, Td } from "@/components/ui";
import ModalButton from "@/components/ui/ModalButton";
import { getBrokers, getInvoices, getLoads } from "@/services";
import { fmtDate, money } from "@/lib/utils";

export default async function InvoicesPage() {
  const [invoices, brokers, loads] = await Promise.all([getInvoices(), getBrokers(), getLoads()]);
  return (
    <>
      <PageHeader title="Invoices" subtitle="Create invoices from loads and send them to brokers."
        action={
          <ModalButton label="+ Create from load" variant="accent" title="Create invoice from load" confirmLabel="Create invoice">
            <Field label="Select load"><Select>{loads.map((l) => <option key={l.id}>{l.loadNumber} – {l.pickup.city} → {l.delivery.city}</option>)}</Select></Field>
            <Field label="Extra charges (optional)"><Input placeholder="e.g. Detention $75" /></Field>
          </ModalButton>} />
      <Card>
        <div className="grid gap-3 border-b border-slate-100 p-4 sm:grid-cols-3"><Input placeholder="Search invoice or load #..." /><Select><option>All statuses</option><option>Draft</option><option>Sent</option><option>Paid</option><option>Overdue</option></Select></div>
        <Table heads={["Invoice #", "Load #", "Broker", "Issued", "Due", "Amount", "Status"]}>
          {invoices.map((i) => (
            <tr key={i.id} className="hover:bg-slate-50">
              <Td><Link href={`/dashboard/invoices/${i.id}`} className="font-semibold text-navy">{i.number}</Link></Td>
              <Td>{i.loadNumber}</Td><Td>{brokers.find((b) => b.id === i.brokerId)?.name}</Td>
              <Td>{fmtDate(i.issueDate)}</Td><Td>{fmtDate(i.dueDate)}</Td>
              <Td className="font-semibold">{money(i.linehaul + i.extras.reduce((a, e) => a + e.amount, 0))}</Td>
              <Td><Badge>{i.status}</Badge></Td>
            </tr>
          ))}
        </Table>
      </Card>
    </>
  );
}
