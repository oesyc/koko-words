import Link from "next/link";
import Image from "next/image";
import { Heart, ShieldCheck, Handshake, Gauge, Truck, FileText } from "lucide-react";
import { btn } from "@/components/ui";
import PageHero from "@/components/public/PageHero";
import Reveal from "@/components/public/Reveal";
import CountUp from "@/components/public/CountUp";
import SectionTitle from "@/components/public/SectionTitle";

const values = [
  { icon: Handshake, title: "Reliability", text: "We do what we say. Pickups on time, deliveries on time." },
  { icon: ShieldCheck, title: "Safety", text: "Safe driving, maintained equipment and full compliance." },
  { icon: Heart, title: "Respect", text: "For customers, for drivers and for every load we carry." },
  { icon: Gauge, title: "Communication", text: "Status updates and paperwork without you having to chase." },
];
const timeline = [
  ["Founded", "Koko's World LLC started in Richmond, Texas with one truck and a clear goal: be the carrier brokers trust."],
  ["Systems first", "We built digital paperwork and tracking from day one so nothing falls behind."],
  ["Growing carefully", "We add trucks and drivers as fast as we can keep service levels high."],
];

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="ABOUT US" title="A Texas carrier built on trust and communication" subtitle="Koko's World LLC moves interstate freight for brokers and shippers who want a partner, not just a truck." />

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2">
        <Reveal>
          <SectionTitle center={false} eyebrow="Our story" title="Who we are" />
          <p className="mt-4 text-slate-600">Koko&apos;s World LLC is a growing trucking company based in Richmond, Texas. We operate modern tractors and trailers on interstate lanes, with a focus on clean paperwork, honest communication and safe delivery.</p>
          <p className="mt-3 text-slate-600">We believe small carriers can deliver big-company service when the right systems and the right people are in place.</p>
          <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl bg-navy-50 p-4"><p className="text-slate-500">USDOT</p><p className="text-xl font-bold text-navy">0000000</p></div>
            <div className="rounded-xl bg-navy-50 p-4"><p className="text-slate-500">MC Number</p><p className="text-xl font-bold text-navy">000000</p></div>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <div className="relative rounded-3xl bg-gradient-to-br from-navy to-navy-dark p-8">
            <div className="anim-float mx-auto w-fit rounded-2xl bg-white p-4"><Image src="/logo-truck.png" alt="Koko's World LLC" width={260} height={260} /></div>
          </div>
        </Reveal>
      </section>

      <section className="bg-navy-dark py-12 text-white">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 text-center sm:grid-cols-2 lg:grid-cols-4">
          {[[48, "", "States covered"], [24, "/7", "Dispatch support"], [100, "%", "Digital paperwork"], [1, "", "Team, one standard"]].map(([e, s, l]) => (
            <div key={String(l)}><p className="text-4xl font-extrabold text-accent"><CountUp end={e as number} suffix={s as string} /></p><p className="text-sm text-slate-300">{l}</p></div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <SectionTitle eyebrow="What drives us" title="Our values" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 100}><div className="h-full rounded-xl border border-slate-200 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"><div className="mb-3 inline-flex rounded-lg bg-accent-50 p-3 text-accent"><v.icon size={24} /></div><h3 className="font-semibold text-navy">{v.title}</h3><p className="mt-1 text-sm text-slate-600">{v.text}</p></div></Reveal>
          ))}
        </div>
      </section>

      <section className="bg-navy-50 py-16">
        <div className="mx-auto max-w-4xl px-4">
          <SectionTitle eyebrow="Our journey" title="How we are growing" />
          <ol className="mt-10 space-y-6 border-l-4 border-accent pl-6">
            {timeline.map(([t, d], i) => (
              <Reveal key={t} delay={i * 100}><li className="relative"><span className="absolute -left-[34px] top-1 h-4 w-4 rounded-full border-4 border-white bg-accent" /><h3 className="font-semibold text-navy">{t}</h3><p className="text-sm text-slate-600">{d}</p></li></Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-16 md:grid-cols-2">
        <Reveal><div className="h-full rounded-2xl border border-slate-200 p-7 shadow-sm"><Truck className="mb-3 text-accent" size={30} /><h3 className="text-xl font-bold text-navy">Our equipment</h3><p className="mt-2 text-sm text-slate-600">Late-model tractors and 53&apos; trailers, inspected and serviced on schedule so your freight arrives safely.</p></div></Reveal>
        <Reveal delay={120}><div className="h-full rounded-2xl border border-slate-200 p-7 shadow-sm"><FileText className="mb-3 text-accent" size={30} /><h3 className="text-xl font-bold text-navy">Safety & compliance</h3><p className="mt-2 text-sm text-slate-600">Valid operating authority, active insurance, tracked driver qualifications and regular maintenance.</p></div></Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16"><div className="rounded-2xl bg-accent p-8 text-center text-white md:p-12"><h2 className="text-3xl font-bold">Let&apos;s move your freight</h2><div className="mt-5 flex flex-wrap justify-center gap-3"><Link href="/request-quote" className={btn("primary")}>Request a Quote</Link><Link href="/drive-for-us" className={btn("outline")}>Drive for Us</Link></div></div></section>
    </>
  );
}
