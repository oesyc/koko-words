import Link from "next/link";
import { Badge, Card, PageHeader, Table, Td } from "@/components/ui";
import { getQuotes } from "@/services";
import { fmtDate } from "@/lib/utils";

export default async function QuotesPage() {
  const quotes = await getQuotes();
  return (
    <>
      <PageHeader title="Quote Requests" subtitle="Requests from the public website." />
      <Card>
        <Table heads={["Received", "Name", "Company", "Lane", "Pickup date", "Status"]}>
          {quotes.map((q) => (
            <tr key={q.id} className="hover:bg-slate-50">
              <Td>{fmtDate(q.receivedAt)}</Td>
              <Td><Link href={`/dashboard/quotes/${q.id}`} className="font-semibold text-navy">{q.name}</Link></Td>
              <Td>{q.company}</Td><Td>{q.pickup} → {q.delivery}</Td><Td>{fmtDate(q.date)}</Td><Td><Badge>{q.status}</Badge></Td>
            </tr>
          ))}
        </Table>
      </Card>
    </>
  );
}
