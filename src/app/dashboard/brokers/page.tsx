import Link from "next/link";
import { Card, PageHeader, Table, Td, btn } from "@/components/ui";
import { getBrokers } from "@/services";

export default async function BrokersPage() {
  const brokers = await getBrokers();
  return (
    <>
      <PageHeader title="Brokers & Customers" action={<Link href="/dashboard/brokers/new" className={btn("accent")}>+ Add broker</Link>} />
      <Card>
        <Table heads={["Broker", "Contact", "Phone", "Billing email", "Payment terms"]}>
          {brokers.map((b) => (
            <tr key={b.id} className="hover:bg-slate-50">
              <Td className="font-semibold text-navy">{b.name}</Td><Td>{b.contact}</Td><Td>{b.phone}</Td><Td>{b.billingEmail}</Td><Td>{b.paymentTerms}</Td>
            </tr>
          ))}
        </Table>
      </Card>
    </>
  );
}
