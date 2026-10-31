import { notFound } from "next/navigation";
import { Badge, Card, CardHeader, Field, InfoRow, PageHeader, Select, btn } from "@/components/ui";
import ModalButton from "@/components/ui/ModalButton";
import { getQuote } from "@/services";
import { fmtDate } from "@/lib/utils";

export default async function QuoteDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const q = await getQuote(id);
  if (!q) notFound();
  return (
    <>
      <PageHeader title={`Quote request · ${q.company}`} subtitle={`Received ${fmtDate(q.receivedAt)}`}
        action={<><Badge>{q.status}</Badge><a href={`mailto:${q.email}`} className={btn("outline")}>Reply by email</a>
          <ModalButton label="Update status" variant="accent" title="Update request status" confirmLabel="Update"><Field label="Status"><Select defaultValue={q.status}><option>New</option><option>Contacted</option><option>Quoted</option></Select></Field></ModalButton></>} />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card><CardHeader title="Contact" /><div className="px-5 py-2"><InfoRow label="Name" value={q.name} /><InfoRow label="Company" value={q.company} /><InfoRow label="Phone" value={q.phone} /><InfoRow label="Email" value={q.email} /></div></Card>
        <Card><CardHeader title="Load" /><div className="px-5 py-2"><InfoRow label="Pickup" value={q.pickup} /><InfoRow label="Delivery" value={q.delivery} /><InfoRow label="Date" value={fmtDate(q.date)} /></div><p className="border-t border-slate-100 p-5 text-sm text-slate-600">{q.details}</p></Card>
      </div>
    </>
  );
}
