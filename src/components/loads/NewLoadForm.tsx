"use client";
import Link from "next/link";
import { useState } from "react";
import { UploadCloud, Sparkles, CheckCircle2 } from "lucide-react";
import { Card, CardHeader, Field, Input, Select, Textarea, btn } from "@/components/ui";
import type { Broker, Driver, Vehicle } from "@/types";

// Fake "extracted" data - Phase 2 mein rate-con reader (OCR/AI) ka result yahan aayega
const extracted = {
  loadNumber: "KW-1048", brokerId: "b1",
  pickupAddress: "Port Houston, 1500 Port Rd, Houston, TX 77015", pickupDate: "2026-11-04",
  deliveryAddress: "San Antonio DC, 5100 Fredericksburg Rd, San Antonio, TX 78229", deliveryDate: "2026-11-05", rate: "1250",
};

export default function NewLoadForm({ brokers, drivers, vehicles }: { brokers: Broker[]; drivers: Driver[]; vehicles: Vehicle[] }) {
  const [fileName, setFileName] = useState("");
  const [read, setRead] = useState(false);
  const [adjust, setAdjust] = useState(false);
  const v = read ? extracted : null;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader title="Step 1 · Upload rate confirmation" />
        <div className="p-5">
          <label className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-slate-300 p-8 text-center hover:border-accent">
            <UploadCloud size={36} className="text-accent" />
            <span className="font-medium text-slate-700">{fileName || "Click to upload PDF or photo"}</span>
            <span className="text-xs text-slate-500">The system reads it and fills in the load details for you</span>
            <input type="file" accept="application/pdf,image/*" className="hidden" onChange={(e) => { setFileName(e.target.files?.[0]?.name ?? ""); setRead(false); }} />
          </label>
          {fileName && !read && <button type="button" className={btn("accent") + " mt-4"} onClick={() => setRead(true)}><Sparkles size={16} /> Read rate confirmation</button>}
          {read && <p className="mt-4 flex items-center gap-2 text-sm text-green-700"><CheckCircle2 size={18} /> Details extracted. Please review and correct below before saving.</p>}
        </div>
      </Card>

      <Card>
        <CardHeader title="Step 2 · Review load details" />
        <div key={String(read)} className="grid gap-4 p-5 sm:grid-cols-2">
          <Field label="Load number"><Input defaultValue={v?.loadNumber} /></Field>
          <Field label="Broker"><Select defaultValue={v?.brokerId ?? ""}><option value="">Select broker</option>{brokers.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}</Select></Field>
          <Field label="Pickup address"><Input defaultValue={v?.pickupAddress} /></Field>
          <Field label="Pickup date"><Input type="date" defaultValue={v?.pickupDate} /></Field>
          <Field label="Delivery address"><Input defaultValue={v?.deliveryAddress} /></Field>
          <Field label="Delivery date"><Input type="date" defaultValue={v?.deliveryDate} /></Field>
          <Field label="Rate (USD)"><Input type="number" defaultValue={v?.rate} /></Field>
          <Field label="Status"><Select defaultValue="Booked">{["Booked", "At pickup", "Loaded", "In transit", "Delivered", "Delayed", "Other"].map((s) => <option key={s}>{s}</option>)}</Select></Field>
          <Field label="Driver"><Select><option value="">Assign driver</option>{drivers.map((d) => <option key={d.id}>{d.name}</option>)}</Select></Field>
          <Field label="Truck"><Select><option value="">Assign truck</option>{vehicles.filter((x) => x.type === "Truck").map((t) => <option key={t.id}>{t.unit} – {t.plate}</option>)}</Select></Field>
        </div>
      </Card>

      <Card>
        <CardHeader title="Step 3 · Miles (calculated automatically)" action={<button type="button" className={btn("outline", "sm")} onClick={() => setAdjust(!adjust)}>{adjust ? "Use calculated miles" : "Adjust miles"}</button>} />
        <div className="grid gap-4 p-5 sm:grid-cols-2">
          <Field label="Loaded miles (pickup → delivery)"><Input type="number" defaultValue={read ? 198 : undefined} readOnly={!adjust} className={adjust ? "" : "bg-slate-50"} /></Field>
          <Field label="Empty miles (last delivery → pickup)"><Input type="number" defaultValue={read ? 16 : undefined} readOnly={!adjust} className={adjust ? "" : "bg-slate-50"} /></Field>
          {adjust && <Field label="Reason for adjustment" className="sm:col-span-2"><Textarea rows={2} placeholder="Why are you changing the miles?" /></Field>}
        </div>
      </Card>

      <div className="flex justify-end gap-3">
        <Link href="/dashboard/loads" className={btn("outline")}>Cancel</Link>
        <Link href="/dashboard/loads" className={btn("accent")}>Save load</Link>
      </div>
    </div>
  );
}
