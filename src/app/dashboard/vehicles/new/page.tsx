import Link from "next/link";
import { Card, Field, Input, PageHeader, Select, btn } from "@/components/ui";

export default function NewVehiclePage() {
  return (
    <>
      <PageHeader title="Add / edit vehicle" />
      <Card className="p-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Type"><Select><option>Truck</option><option>Trailer</option></Select></Field>
          <Field label="Unit number"><Input placeholder="Unit 104" /></Field>
          <Field label="Make / model / year"><Input /></Field>
          <Field label="License plate"><Input /></Field>
          <Field label="VIN" className="sm:col-span-2"><Input /></Field>
          <Field label="Last inspection date"><Input type="date" /></Field>
          <Field label="Next service due"><Input type="date" /></Field>
          <Field label="Registration expiry"><Input type="date" /></Field>
          <Field label="Insurance expiry"><Input type="date" /></Field>
        </div>
        <div className="mt-6 flex justify-end gap-3"><Link href="/dashboard/vehicles" className={btn("outline")}>Cancel</Link><Link href="/dashboard/vehicles" className={btn("accent")}>Save vehicle</Link></div>
      </Card>
    </>
  );
}
