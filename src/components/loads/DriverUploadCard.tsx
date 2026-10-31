"use client";
import { useState } from "react";
import { Camera, FileText, X, CheckCircle2 } from "lucide-react";
import { Badge, Card, Field, Select, btn } from "@/components/ui";

type Doc = { name: string; type: string; status: string };

// Driver document upload. Phase 2: files storage par jayengay aur office ko notification milegi.
export default function DriverUploadCard({ loadNumber, existing }: { loadNumber: string; existing: Doc[] }) {
  const [type, setType] = useState("Signed BOL");
  const [pages, setPages] = useState<string[]>([]);
  const [docs, setDocs] = useState<Doc[]>(existing);
  const [sent, setSent] = useState(false);

  function send() {
    setDocs([{ name: `${type.replace(/ /g, "")}_${loadNumber}.pdf (${pages.length} page${pages.length > 1 ? "s" : ""})`, type, status: "Received" }, ...docs]);
    setPages([]); setSent(true);
  }

  return (
    <Card className="space-y-4 p-4">
      <h2 className="font-semibold">Upload documents</h2>
      <Field label="Document type">
        <Select value={type} onChange={(e) => { setType(e.target.value); setSent(false); }}>
          {["Signed BOL", "Lumper receipt", "Fuel receipt", "Other"].map((t) => <option key={t}>{t}</option>)}
        </Select>
      </Field>
      <label className={btn("primary") + " w-full cursor-pointer py-3"}>
        <Camera size={20} /> Take photo / choose files
        <input type="file" multiple accept="image/*,.pdf" capture="environment" className="hidden" onChange={(e) => { setPages([...pages, ...Array.from(e.target.files ?? []).map((f) => f.name)]); setSent(false); }} />
      </label>
      {pages.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-slate-500">Pages are combined into one PDF automatically.</p>
          {pages.map((p, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm"><span className="flex items-center gap-2"><FileText size={16} className="text-slate-400" /> Page {i + 1}: {p}</span><button onClick={() => setPages(pages.filter((_, x) => x !== i))} aria-label="Remove"><X size={16} /></button></div>
          ))}
          <button className={btn("accent") + " w-full py-3"} onClick={send}>Send to office</button>
        </div>
      )}
      {sent && <p className="flex items-center gap-2 rounded-lg bg-green-50 p-3 text-sm text-green-800"><CheckCircle2 size={18} /> Sent! The office has been notified.</p>}
      <div>
        <p className="mb-2 text-xs font-semibold uppercase text-slate-400">Documents on this load</p>
        <ul className="divide-y divide-slate-100">
          {docs.map((d, i) => (
            <li key={i} className="flex items-center justify-between gap-2 py-2 text-sm"><span className="flex items-center gap-2"><FileText size={16} className="text-slate-400" /><span><span className="font-medium">{d.type}</span><br /><span className="text-xs text-slate-500">{d.name}</span></span></span><Badge>{d.status}</Badge></li>
          ))}
        </ul>
        {docs.some((d) => d.status === "Needs re-upload") && <p className="mt-2 rounded-lg bg-red-50 p-3 text-xs text-red-700">The office flagged a document as blurry or missing. Please upload it again.</p>}
      </div>
    </Card>
  );
}
