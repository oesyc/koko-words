import Link from "next/link";
import { Card, Field, Input, PageHeader, Select, btn } from "@/components/ui";

export default function NewBrokerPage() {
  return (
    <>
      <PageHeader title="Add / edit broker" />
      <Card className="p-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Broker / company name"><Input /></Field>
          <Field label="Contact person"><Input /></Field>
          <Field label="Phone"><Input type="tel" /></Field>
          <Field label="Billing email"><Input type="email" /></Field>
          <Field label="Payment terms"><Select><option>Net 15</option><option>Net 30</option><option>Net 45</option><option>Quick pay</option></Select></Field>
        </div>
        <div className="mt-6 flex justify-end gap-3"><Link href="/dashboard/brokers" className={btn("outline")}>Cancel</Link><Link href="/dashboard/brokers" className={btn("accent")}>Save broker</Link></div>
      </Card>
    </>
  );
}
