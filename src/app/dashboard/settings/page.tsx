import Image from "next/image";
import { Card, CardHeader, Field, Input, PageHeader, Select, Textarea, btn } from "@/components/ui";

export default function SettingsPage() {
  return (
    <>
      <PageHeader title="Settings" action={<button className={btn("accent")}>Save changes</button>} />
      <div className="space-y-6">
        <Card>
          <CardHeader title="Company info" />
          <div className="grid gap-4 p-5 sm:grid-cols-2">
            <div className="flex items-center gap-4 sm:col-span-2"><Image src="/logo-truck.png" alt="Logo" width={80} height={80} /><button className={btn("outline", "sm")}>Change logo</button></div>
            <Field label="Company name"><Input defaultValue="Koko's World LLC" /></Field>
            <Field label="Business email"><Input defaultValue="admin@kokosworldllc.com" /></Field>
            <Field label="Phone"><Input defaultValue="(832) 555-0100" /></Field>
            <Field label="Address"><Input defaultValue="Richmond, TX" /></Field>
            <Field label="USDOT number"><Input defaultValue="0000000" /></Field>
            <Field label="MC number"><Input defaultValue="000000" /></Field>
          </div>
        </Card>
        <Card>
          <CardHeader title="Driver pay week" />
          <div className="grid gap-4 p-5 sm:grid-cols-2">
            <Field label="Pay week starts on"><Select defaultValue="Monday"><option>Monday</option><option>Sunday</option></Select></Field>
            <Field label="Pay day"><Select defaultValue="Friday"><option>Thursday</option><option>Friday</option></Select></Field>
          </div>
        </Card>
        <Card>
          <CardHeader title="Invoice details" />
          <div className="grid gap-4 p-5 sm:grid-cols-2">
            <Field label="Invoice number prefix"><Input defaultValue="INV-2026-" /></Field>
            <Field label="Default payment terms"><Select defaultValue="Net 30"><option>Net 15</option><option>Net 30</option><option>Net 45</option></Select></Field>
            <Field label="Remit-to / bank details" className="sm:col-span-2"><Textarea defaultValue={"Koko's World LLC\nRichmond, TX"} /></Field>
          </div>
        </Card>
      </div>
    </>
  );
}
