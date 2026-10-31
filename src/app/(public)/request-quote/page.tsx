import { Phone, Mail, Clock, ShieldCheck, FileCheck2, Zap } from "lucide-react";
import MockForm from "@/components/ui/MockForm";
import { Field, Input, Textarea, btn } from "@/components/ui";
import PageHero from "@/components/public/PageHero";
import Reveal from "@/components/public/Reveal";

const steps = ["Send your load details", "We review and reply with a rate", "Book the load and we handle the rest"];

export default function RequestQuotePage() {
  return (
    <>
      <PageHero eyebrow="REQUEST A QUOTE" title="Get a fast, clear rate on your freight" subtitle="Brokers and shippers: tell us about your load and our team will get back to you quickly." />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <MockForm success="Thank you! Your quote request was sent. Our team will contact you shortly.">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Your name"><Input required placeholder="John Smith" /></Field>
              <Field label="Company"><Input required placeholder="ABC Logistics" /></Field>
              <Field label="Phone"><Input required type="tel" placeholder="(555) 555-5555" /></Field>
              <Field label="Email"><Input required type="email" placeholder="you@company.com" /></Field>
              <Field label="Pickup city / state"><Input required placeholder="Houston, TX" /></Field>
              <Field label="Delivery city / state"><Input required placeholder="Dallas, TX" /></Field>
              <Field label="Pickup date" className="sm:col-span-2"><Input required type="date" /></Field>
            </div>
            <Field label="Load details"><Textarea placeholder="Commodity, weight, pallets, special requirements..." /></Field>
            <button type="submit" className={btn("accent") + " w-full sm:w-auto"}>Send Request</button>
          </MockForm>
        </div>
        <aside className="space-y-5">
          <Reveal><div className="rounded-2xl bg-navy p-6 text-white"><h2 className="font-bold">What happens next</h2><ol className="mt-4 space-y-4">{steps.map((s, i) => <li key={s} className="flex items-start gap-3 text-sm"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent font-bold">{i + 1}</span>{s}</li>)}</ol></div></Reveal>
          <Reveal delay={100}><div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h2 className="font-bold text-navy">Talk to us directly</h2><div className="mt-3 space-y-2 text-sm text-slate-600"><p className="flex items-center gap-2"><Phone size={16} className="text-accent" /> (832) 555-0100</p><p className="flex items-center gap-2"><Mail size={16} className="text-accent" /> admin@kokosworldllc.com</p><p className="flex items-center gap-2"><Clock size={16} className="text-accent" /> Dispatch available 24/7</p></div></div></Reveal>
          <Reveal delay={200}><div className="grid grid-cols-3 gap-2 text-center text-xs font-medium text-navy">{[[Zap, "Fast reply"], [ShieldCheck, "Insured"], [FileCheck2, "Clean paperwork"]].map(([Icon, l], i) => { const I = Icon as typeof Zap; return <div key={i} className="rounded-xl bg-navy-50 p-3"><I className="mx-auto mb-1 text-accent" size={22} />{l as string}</div>; })}</div></Reveal>
        </aside>
      </div>
    </>
  );
}
