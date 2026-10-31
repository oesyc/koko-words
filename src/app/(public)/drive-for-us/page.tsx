import { DollarSign, Truck, CalendarCheck, Smartphone, HeartHandshake, FileCheck2, CheckCircle2 } from "lucide-react";
import MockForm from "@/components/ui/MockForm";
import { Field, Input, Select, Textarea, btn } from "@/components/ui";
import PageHero from "@/components/public/PageHero";
import Reveal from "@/components/public/Reveal";
import Faq from "@/components/public/Faq";
import SectionTitle from "@/components/public/SectionTitle";

const benefits = [
  { icon: DollarSign, title: "Weekly pay by the mile", text: "Separate loaded and empty mile rates, paid every week with a clear statement." },
  { icon: Truck, title: "Modern equipment", text: "Well-maintained trucks and trailers, serviced on schedule." },
  { icon: Smartphone, title: "Easy driver page", text: "Update status, upload your BOL and see your pay from your phone." },
  { icon: CalendarCheck, title: "Fair planning", text: "Loads assigned with clear pickup and delivery details." },
  { icon: HeartHandshake, title: "Respectful team", text: "Direct line to dispatch. You are a person, not a number." },
  { icon: FileCheck2, title: "Clear paperwork", text: "Extras like detention and stop pay are tracked and paid." },
];
const requirements = ["Valid Class A CDL", "Current DOT medical card", "Clean driving record", "Good communication", "Ability to pass drug screening", "Experience preferred"];
const steps = ["Submit the application below", "We review your CDL and medical card", "Quick phone interview", "Road test and onboarding"];
const faqs = [
  { q: "How and when will I be paid?", a: "Drivers are paid weekly. Pay is calculated from your loaded and empty miles for loads delivered that week, plus extras minus deductions." },
  { q: "Do I need experience?", a: "Experienced drivers are preferred. Tell us about your experience in the form and we will review every application." },
  { q: "What documents do I need to upload?", a: "A photo or PDF of your CDL and your DOT medical card." },
];

export default function DriveForUsPage() {
  return (
    <>
      <PageHero eyebrow="CAREERS" title="Drive for Koko's World" subtitle="Fair weekly pay, modern equipment and a team that respects its drivers." />

      <section className="mx-auto max-w-6xl px-4 py-16">
        <SectionTitle eyebrow="Why drive with us" title="What you get" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => (
            <Reveal key={b.title} delay={(i % 3) * 100}><div className="h-full rounded-xl border border-slate-200 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"><div className="mb-3 inline-flex rounded-lg bg-accent-50 p-3 text-accent"><b.icon size={24} /></div><h3 className="font-semibold text-navy">{b.title}</h3><p className="mt-1 text-sm text-slate-600">{b.text}</p></div></Reveal>
          ))}
        </div>
      </section>

      <section className="bg-navy-50 py-14">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2">
          <Reveal><h2 className="text-2xl font-bold text-navy">Requirements</h2><ul className="mt-4 space-y-2">{requirements.map((r) => <li key={r} className="flex items-center gap-2 text-slate-700"><CheckCircle2 className="text-accent" size={20} />{r}</li>)}</ul></Reveal>
          <Reveal delay={120}><h2 className="text-2xl font-bold text-navy">Hiring process</h2><ol className="mt-4 space-y-3">{steps.map((s, i) => <li key={s} className="flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy font-bold text-white">{i + 1}</span><span className="text-slate-700">{s}</span></li>)}</ol></Reveal>
        </div>
      </section>

      <section id="apply" className="mx-auto grid max-w-6xl gap-10 px-4 py-16 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="mb-4 text-2xl font-bold text-navy">Apply now</h2>
          <MockForm success="Application received! Our office will review it and contact you soon.">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name"><Input required /></Field>
              <Field label="Phone"><Input required type="tel" /></Field>
              <Field label="Email"><Input required type="email" /></Field>
              <Field label="CDL class"><Select defaultValue="Class A"><option>Class A</option><option>Class B</option></Select></Field>
              <Field label="Years of experience"><Input required placeholder="e.g. 5" /></Field>
              <Field label="Endorsements"><Input placeholder="Hazmat, Tanker, Doubles..." /></Field>
              <Field label="Upload CDL (photo or PDF)"><Input required type="file" accept="image/*,.pdf" /></Field>
              <Field label="Upload medical card"><Input required type="file" accept="image/*,.pdf" /></Field>
            </div>
            <Field label="Anything else we should know?"><Textarea /></Field>
            <button type="submit" className={btn("accent") + " w-full sm:w-auto"}>Submit Application</button>
          </MockForm>
        </div>
        <div><h2 className="mb-4 text-xl font-bold text-navy">Driver FAQ</h2><Faq items={faqs} /></div>
      </section>
    </>
  );
}
