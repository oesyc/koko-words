import Link from "next/link";
import Image from "next/image";
import { Truck, ShieldCheck, Clock, MapPinned, Snowflake, Boxes, Route, FileCheck2, PhoneCall, PackageCheck, Star, CheckCircle2 } from "lucide-react";
import { btn } from "@/components/ui";
import Reveal from "@/components/public/Reveal";
import CountUp from "@/components/public/CountUp";
import RoadTruck from "@/components/public/RoadTruck";
import Faq from "@/components/public/Faq";
import SectionTitle from "@/components/public/SectionTitle";

const lanes = ["Houston, TX → Dallas, TX", "Dallas, TX → Memphis, TN", "San Antonio, TX → Austin, TX", "Houston, TX → New Orleans, LA", "Austin, TX → Oklahoma City, OK", "Memphis, TN → Atlanta, GA", "Houston, TX → Denver, CO", "Dallas, TX → Chicago, IL"];
const stats = [{ end: 48, suffix: "", label: "States covered" }, { end: 24, suffix: "/7", label: "Dispatch support" }, { end: 100, suffix: "%", label: "Digital paperwork" }, { end: 15, suffix: " min", label: "Avg. quote response" }];
const services = [
  { icon: Truck, title: "Dry Van", text: "53' dry van for palletized and general freight." },
  { icon: Snowflake, title: "Temperature-Controlled", text: "Reefer capacity for food and sensitive cargo." },
  { icon: Boxes, title: "Full Truckload", text: "Dedicated truck, direct pickup to delivery." },
  { icon: Route, title: "Regional & Long Haul", text: "Texas, Gulf Coast, Midwest and nationwide." },
];
const steps = [
  { icon: PhoneCall, title: "1. Request a quote", text: "Send your lane, date and load details. We reply fast with a clear rate." },
  { icon: PackageCheck, title: "2. We pick up & deliver", text: "A professional driver picks up on time and keeps you updated on status." },
  { icon: FileCheck2, title: "3. Paperwork done", text: "Signed BOL and documents are sent to you right after delivery." },
];
const why = ["Fast quotes and clear communication", "Live load status updates for brokers", "Signed BOL delivered right after drop-off", "Licensed, insured and safety-focused", "Professional, well-maintained equipment", "Direct line to our dispatch team"];
const reviews = [
  { name: "Sarah M.", role: "Freight Broker", text: "Great communication from pickup to delivery. Paperwork always arrives on time." },
  { name: "Tom R.", role: "Logistics Manager", text: "Reliable carrier. They actually answer the phone and update us without being asked." },
  { name: "Linda G.", role: "Dispatcher", text: "Easy to work with and always professional. We keep booking them." },
];
const faqs = [
  { q: "What areas do you serve?", a: "We are based in Richmond, Texas and run interstate freight across the lower 48 states, with strong coverage in Texas, the Gulf Coast and the Midwest." },
  { q: "What equipment do you run?", a: "We run 53' dry van trailers. Contact us for temperature-controlled or special requirements." },
  { q: "How fast can I get a quote?", a: "Most quote requests get a reply within the same business day. Use the Request a Quote form with your lane, date and load details." },
  { q: "How do I get the BOL and paperwork?", a: "Our drivers upload the signed BOL right after delivery and our office sends it to you, so you never need to chase us." },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-navy to-navy-dark text-white">
        <div className="anim-float absolute -left-20 top-10 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:py-20">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide text-accent"><span className="anim-pulse h-2 w-2 rounded-full bg-accent" /> RICHMOND, TEXAS · INTERSTATE FREIGHT</p>
            <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">Freight moved <span className="text-accent">safely</span>, on time, every time.</h1>
            <p className="mt-5 max-w-lg text-lg text-slate-200">Koko&apos;s World LLC hauls freight across the country for brokers and shippers who need a carrier they can count on.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/request-quote" className={btn("accent") + " !px-6 !py-3"}>Request a Quote</Link>
              <Link href="/drive-for-us" className={btn("outline") + " !border-white/40 !bg-transparent !px-6 !py-3 !text-white hover:!bg-white/10"}>Drive for Us</Link>
            </div>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-3xl border-4 border-white/20 shadow-2xl"><RoadTruck className="w-full" /></div>
            <div className="anim-float absolute -bottom-6 -left-4 hidden rounded-2xl bg-white p-2 shadow-xl sm:block"><Image src="/globe-mark.png" alt="" width={72} height={72} /></div>
            <div className="absolute -right-2 -top-4 rounded-xl bg-accent px-4 py-2 text-sm font-bold shadow-lg">USDOT · MC Verified</div>
          </div>
        </div>
      </section>

      <div className="overflow-hidden bg-accent py-3 text-sm font-semibold text-white">
        <div className="anim-marquee flex w-max gap-10 whitespace-nowrap">
          {[...lanes, ...lanes].map((l, i) => <span key={i} className="flex items-center gap-10">{l}<span className="opacity-60">●</span></span>)}
        </div>
      </div>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-12 text-center sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Reveal key={s.label}><p className="text-5xl font-extrabold text-navy"><CountUp end={s.end} suffix={s.suffix} /></p><p className="mt-1 text-sm font-medium text-slate-500">{s.label}</p></Reveal>
        ))}
      </section>

      <section className="bg-navy-50 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <SectionTitle eyebrow="What we haul" title="Freight services built around you" text="From a single pallet run to a full truckload across the country." />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 100}>
                <div className="h-full rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <div className="mb-4 inline-flex rounded-lg bg-accent-50 p-3 text-accent"><s.icon size={26} /></div>
                  <h3 className="font-semibold text-slate-900">{s.title}</h3><p className="mt-1 text-sm text-slate-600">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-8 text-center"><Link href="/services" className={btn("primary")}>View all services</Link></div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <SectionTitle eyebrow="How it works" title="Simple from quote to delivery" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 120}>
              <div className="relative h-full rounded-2xl border border-slate-200 p-6 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-navy text-white"><s.icon size={28} /></div>
                <h3 className="font-semibold text-navy">{s.title}</h3><p className="mt-2 text-sm text-slate-600">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-navy-dark text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2">
          <Reveal>
            <p className="mb-2 text-sm font-bold uppercase tracking-wider text-accent">Why Koko&apos;s World</p>
            <h2 className="text-3xl font-bold md:text-4xl">A carrier that keeps you in the loop</h2>
            <ul className="mt-6 space-y-3">
              {why.map((w) => <li key={w} className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 shrink-0 text-accent" size={20} /><span className="text-slate-200">{w}</span></li>)}
            </ul>
          </Reveal>
          <Reveal delay={150}>
            <div className="grid grid-cols-2 gap-4">
              {[[ShieldCheck, "Fully Insured"], [Clock, "On-Time Focus"], [MapPinned, "Lower 48 Coverage"], [Truck, "Modern Equipment"]].map(([Icon, label], i) => {
                const I = Icon as typeof Truck;
                return <div key={i} className="rounded-2xl bg-white/10 p-6 text-center backdrop-blur"><I className="mx-auto mb-2 text-accent" size={34} /><p className="font-semibold">{label as string}</p></div>;
              })}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <SectionTitle eyebrow="Testimonials" title="What brokers say" text="(Sample reviews. Replace with real client feedback.)" />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={i * 120}>
              <div className="h-full rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="mb-3 flex text-accent">{[0, 1, 2, 3, 4].map((n) => <Star key={n} size={18} fill="currentColor" />)}</div>
                <p className="text-sm text-slate-600">“{r.text}”</p>
                <p className="mt-4 font-semibold text-navy">{r.name}</p><p className="text-xs text-slate-500">{r.role}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-navy-50 py-16">
        <div className="mx-auto max-w-3xl px-4">
          <SectionTitle title="Frequently asked questions" />
          <div className="mt-8"><Faq items={faqs} /></div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-16 md:grid-cols-2">
        <Reveal><div className="h-full rounded-2xl bg-accent p-8 text-white"><h2 className="text-2xl font-bold">Have a load to move?</h2><p className="mt-2 text-white/90">Tell us about your freight and get a competitive quote fast.</p><Link href="/request-quote" className={btn("primary") + " mt-5"}>Request a Quote</Link></div></Reveal>
        <Reveal delay={120}><div className="h-full rounded-2xl bg-navy p-8 text-white"><h2 className="text-2xl font-bold">CDL driver? Join our team.</h2><p className="mt-2 text-white/90">Weekly pay by the mile, clear paperwork and a team that respects you.</p><Link href="/drive-for-us" className={btn("accent") + " mt-5"}>Drive for Us</Link></div></Reveal>
      </section>
    </>
  );
}
