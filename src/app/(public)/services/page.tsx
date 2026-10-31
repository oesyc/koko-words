import Link from "next/link";
import { Truck, Snowflake, Boxes, Route, Factory, ShoppingCart, Hammer, Apple, Package, Cpu } from "lucide-react";
import { btn } from "@/components/ui";
import PageHero from "@/components/public/PageHero";
import Reveal from "@/components/public/Reveal";
import Faq from "@/components/public/Faq";
import SectionTitle from "@/components/public/SectionTitle";

const services = [
  { icon: Truck, title: "Dry Van Freight", text: "Our core service: 53' dry vans for palletized and boxed freight.", points: ["Up to 45,000 lbs", "Pallets and floor-loaded", "Live and drop options"] },
  { icon: Snowflake, title: "Temperature-Controlled", text: "Reefer capacity for freight that needs steady temperature.", points: ["Food and beverage", "Pharma-sensitive goods", "Temperature monitoring"] },
  { icon: Boxes, title: "Full Truckload (FTL)", text: "A dedicated truck for your freight, direct from A to B.", points: ["No handling in between", "Fast transit times", "Live status updates"] },
  { icon: Route, title: "Regional & Long Haul", text: "Short Texas runs to cross-country lanes.", points: ["Texas & Gulf Coast", "Midwest & Southeast", "Lower 48 coverage"] },
];
const industries = [
  [ShoppingCart, "Retail"], [Factory, "Manufacturing"], [Hammer, "Building materials"], [Apple, "Food & beverage"], [Package, "Consumer goods"], [Cpu, "Electronics"],
] as const;
const equipment = [["Trailer type", "53' dry van"], ["Max payload", "Up to 45,000 lbs"], ["Pallet positions", "Up to 26"], ["Trailer length", "53 ft"], ["Coverage", "Lower 48 states"]];
const faqs = [
  { q: "Do you haul partial loads (LTL)?", a: "We focus on full truckload freight. Contact us for special cases and we will tell you honestly if we are a good fit." },
  { q: "Can you do team or expedited runs?", a: "Please send details through the quote form and our team will review availability for your lane." },
  { q: "How do I track my load?", a: "Our dispatch team keeps you updated on pickup, in-transit and delivery status, and sends the signed BOL after delivery." },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="SERVICES" title="Freight services for brokers and shippers" subtitle="The freight we haul and the lanes we run. (Final content to be confirmed by Koko's World.)" />
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 2) * 120}>
              <div className="h-full rounded-2xl border border-slate-200 p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div className="mb-4 inline-flex rounded-xl bg-navy p-3 text-accent"><s.icon size={28} /></div>
                <h2 className="text-xl font-bold text-navy">{s.title}</h2><p className="mt-1 text-slate-600">{s.text}</p>
                <ul className="mt-4 space-y-1.5 text-sm text-slate-700">{s.points.map((p) => <li key={p} className="flex gap-2"><span className="text-accent">✔</span>{p}</li>)}</ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-navy-50 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <SectionTitle eyebrow="Who we haul for" title="Industries we serve" />
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {industries.map(([Icon, label], i) => (
              <Reveal key={label} delay={i * 70}><div className="rounded-xl bg-white p-5 text-center shadow-sm transition hover:-translate-y-1"><Icon className="mx-auto mb-2 text-accent" size={30} /><p className="text-sm font-semibold text-navy">{label}</p></div></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2">
        <Reveal>
          <SectionTitle center={false} eyebrow="Equipment" title="What we run" />
          <div className="mt-6 overflow-hidden rounded-xl border border-slate-200">
            {equipment.map(([k, v]) => <div key={k} className="flex justify-between border-b border-slate-100 px-4 py-3 text-sm last:border-0"><span className="text-slate-500">{k}</span><span className="font-semibold text-navy">{v}</span></div>)}
          </div>
        </Reveal>
        <Reveal delay={120}>
          <SectionTitle center={false} eyebrow="FAQ" title="Common questions" />
          <div className="mt-6"><Faq items={faqs} /></div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16"><div className="rounded-2xl bg-navy p-8 text-center text-white md:p-12"><h2 className="text-3xl font-bold">Need a rate on your lane?</h2><p className="mt-2 text-slate-200">Send us the details and we will reply fast.</p><Link href="/request-quote" className={btn("accent") + " mt-5"}>Get a Quote</Link></div></section>
    </>
  );
}
