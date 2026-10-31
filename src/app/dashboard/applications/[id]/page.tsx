import { notFound } from "next/navigation";
import { FileText } from "lucide-react";
import { Badge, Card, CardHeader, Field, InfoRow, PageHeader, Select, btn } from "@/components/ui";
import ModalButton from "@/components/ui/ModalButton";
import { getApplication } from "@/services";
import { fmtDate } from "@/lib/utils";

export default async function ApplicationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const a = await getApplication(id);
  if (!a) notFound();
  return (
    <>
      <PageHeader title={`Application · ${a.name}`} subtitle={`Received ${fmtDate(a.receivedAt)}`}
        action={<><Badge>{a.status}</Badge>
          <ModalButton label="Update status" variant="accent" title="Update application status" confirmLabel="Update"><Field label="Status"><Select defaultValue={a.status}><option>New</option><option>Reviewing</option><option>Hired</option><option>Rejected</option></Select></Field></ModalButton></>} />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card><CardHeader title="Applicant" /><div className="px-5 py-2"><InfoRow label="Name" value={a.name} /><InfoRow label="Phone" value={a.phone} /><InfoRow label="Email" value={a.email} /><InfoRow label="CDL class" value={a.cdlClass} /><InfoRow label="Experience" value={a.experience} /><InfoRow label="Endorsements" value={a.endorsements} /></div></Card>
        <Card><CardHeader title="Uploaded documents" />
          <ul className="divide-y divide-slate-100">
            {["CDL (front & back).jpg", "Medical card.pdf"].map((f) => (
              <li key={f} className="flex items-center justify-between px-5 py-3 text-sm"><span className="flex items-center gap-2"><FileText className="text-slate-400" size={18} /> {f}</span><button className={btn("ghost", "sm")}>View</button></li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}
