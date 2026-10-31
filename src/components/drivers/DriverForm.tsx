import Link from "next/link";
import { Card, Field, Input, Select, btn } from "@/components/ui";
import type { Driver, Vehicle } from "@/types";

export default function DriverForm({ driver, vehicles }: { driver?: Driver; vehicles: Vehicle[] }) {
  return (
    <div className="space-y-6">
      <Card className="p-5">
        <h2 className="mb-4 font-semibold">Profile</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full name"><Input defaultValue={driver?.name} /></Field>
          <Field label="Phone"><Input defaultValue={driver?.phone} /></Field>
          <Field label="Email (login)"><Input type="email" defaultValue={driver?.email} /></Field>
          <Field label="Assigned truck"><Select defaultValue={driver?.truckId}>{vehicles.filter((v) => v.type === "Truck").map((v) => <option key={v.id} value={v.id}>{v.unit} – {v.plate}</option>)}</Select></Field>
          <Field label="Status"><Select defaultValue={driver?.status ?? "On duty"}><option>On duty</option><option>Off duty</option><option>Inactive</option></Select></Field>
        </div>
      </Card>
      <Card className="p-5">
        <h2 className="mb-4 font-semibold">Documents</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="CDL number"><Input defaultValue={driver?.cdlNumber} /></Field>
          <Field label="CDL expiry"><Input type="date" defaultValue={driver?.cdlExpiry} /></Field>
          <Field label="Medical card expiry"><Input type="date" defaultValue={driver?.medicalExpiry} /></Field>
        </div>
      </Card>
      <Card className="p-5">
        <h2 className="mb-4 font-semibold">Pay rates (per mile)</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Loaded miles rate ($)"><Input type="number" step="0.01" defaultValue={driver?.loadedRate} /></Field>
          <Field label="Empty miles rate ($)"><Input type="number" step="0.01" defaultValue={driver?.emptyRate} /></Field>
        </div>
      </Card>
      <div className="flex justify-end gap-3">
        <Link href="/dashboard/drivers" className={btn("outline")}>Cancel</Link>
        <Link href="/dashboard/drivers" className={btn("accent")}>Save driver</Link>
      </div>
    </div>
  );
}
