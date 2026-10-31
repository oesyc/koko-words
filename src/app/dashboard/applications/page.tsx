import Link from "next/link";
import { Badge, Card, PageHeader, Table, Td } from "@/components/ui";
import { getApplications } from "@/services";
import { fmtDate } from "@/lib/utils";

export default async function ApplicationsPage() {
  const apps = await getApplications();
  return (
    <>
      <PageHeader title="Driver Applications" subtitle="Applications from the Drive for Us page." />
      <Card>
        <Table heads={["Received", "Name", "Phone", "CDL class", "Experience", "Endorsements", "Status"]}>
          {apps.map((a) => (
            <tr key={a.id} className="hover:bg-slate-50">
              <Td>{fmtDate(a.receivedAt)}</Td>
              <Td><Link href={`/dashboard/applications/${a.id}`} className="font-semibold text-navy">{a.name}</Link></Td>
              <Td>{a.phone}</Td><Td>{a.cdlClass}</Td><Td>{a.experience}</Td><Td>{a.endorsements}</Td><Td><Badge>{a.status}</Badge></Td>
            </tr>
          ))}
        </Table>
      </Card>
    </>
  );
}
