import Image from "next/image";
import { notFound } from "next/navigation";
import { FileDown, Paperclip } from "lucide-react";
import { Badge, Card, CardHeader, Field, Input, PageHeader, Select, Textarea, btn } from "@/components/ui";
import ModalButton from "@/components/ui/ModalButton";
import { getBroker, getInvoice } from "@/services";
import { fmtDate, money } from "@/lib/utils";

export default async function InvoiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const inv = await getInvoice(id);
  if (!inv) notFound();
  const broker = (await getBroker(inv.brokerId))!;
  const total = inv.linehaul + inv.extras.reduce((a, e) => a + e.amount, 0);

  return (
    <>
      <PageHeader title={inv.number} subtitle={`Load ${inv.loadNumber} · ${broker.name}`}
        action={
          <>
            <Badge>{inv.status}</Badge>
            <button className={btn("outline")}><FileDown size={16} /> Download PDF</button>
            <ModalButton label="Send to broker" variant="accent" title="Email invoice to broker" confirmLabel="Send email">
              <Field label="To"><Input defaultValue={broker.billingEmail} /></Field>
              <Field label="Subject"><Input defaultValue={`Invoice ${inv.number} – Load ${inv.loadNumber} – Koko's World LLC`} /></Field>
              <Field label="Message"><Textarea defaultValue={`Hello ${broker.contact},\n\nPlease find attached invoice ${inv.number} for load ${inv.loadNumber}.\n\nThank you,\nKoko's World LLC`} /></Field>
              <div className="rounded-lg bg-slate-50 p-3 text-sm text-slate-600">
                <p className="mb-1 font-medium">Attachments</p>
                {[`${inv.number}.pdf`, `RateConfirmation-${inv.loadNumber}.pdf`, `SignedBOL-${inv.loadNumber}.pdf`].map((f) => <p key={f} className="flex items-center gap-2"><Paperclip size={14} /> {f}</p>)}
              </div>
            </ModalButton>
            <ModalButton label="Change status" variant="outline" title="Change invoice status" confirmLabel="Update">
              <Field label="Status"><Select defaultValue={inv.status}><option>Draft</option><option>Sent</option><option>Paid</option><option>Overdue</option></Select></Field>
            </ModalButton>
          </>
        } />

      <Card>
        <CardHeader title="PDF preview" />
        <div className="bg-slate-100 p-4 sm:p-8">
          <div className="mx-auto max-w-3xl bg-white p-6 shadow-md sm:p-10">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b-4 border-accent pb-5">
              <div className="flex items-center gap-3">
                <Image src="/logo-truck.png" alt="Koko's World LLC" width={90} height={90} />
                <div className="text-sm text-slate-600"><p className="font-bold text-navy">Koko&apos;s World LLC</p><p>Richmond, Texas</p><p>USDOT 0000000 · MC 000000</p><p>admin@kokosworldllc.com</p></div>
              </div>
              <div className="text-right"><p className="text-3xl font-extrabold text-navy">INVOICE</p><p className="text-sm text-slate-600">{inv.number}</p><p className="text-sm text-slate-600">Issued: {fmtDate(inv.issueDate)}</p><p className="text-sm text-slate-600">Due: {fmtDate(inv.dueDate)}</p></div>
            </div>
            <div className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
              <div><p className="text-xs font-semibold uppercase text-slate-400">Bill to</p><p className="font-semibold">{broker.name}</p><p>{broker.contact}</p><p>{broker.billingEmail}</p></div>
              <div><p className="text-xs font-semibold uppercase text-slate-400">Load details</p><p>Load #: <b>{inv.loadNumber}</b></p><p>Route: {inv.route}</p><p>Terms: {broker.paymentTerms}</p></div>
            </div>
            <table className="mt-6 w-full text-sm">
              <thead><tr className="bg-navy text-left text-white"><th className="px-3 py-2">Description</th><th className="px-3 py-2 text-right">Amount</th></tr></thead>
              <tbody>
                <tr className="border-b"><td className="px-3 py-2">Linehaul – {inv.route}</td><td className="px-3 py-2 text-right">{money(inv.linehaul)}</td></tr>
                {inv.extras.map((e) => <tr key={e.label} className="border-b"><td className="px-3 py-2">{e.label}</td><td className="px-3 py-2 text-right">{money(e.amount)}</td></tr>)}
              </tbody>
            </table>
            <div className="mt-4 flex justify-end"><div className="w-56 rounded-lg bg-navy-50 p-3 text-right"><p className="text-xs text-slate-500">Total due</p><p className="text-2xl font-bold text-navy">{money(total)}</p></div></div>
            <p className="mt-8 text-center text-xs text-slate-400">Rate confirmation and signed BOL attached. Thank you for your business!</p>
          </div>
        </div>
      </Card>
    </>
  );
}
