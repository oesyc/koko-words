export default function PageHero({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy to-navy-dark text-white">
      <div className="anim-float absolute -right-16 -top-16 h-64 w-64 rounded-full bg-accent/20 blur-2xl" />
      <div className="absolute -bottom-20 left-10 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
      <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-20">
        <p className="mb-3 inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide text-accent">{eyebrow}</p>
        <h1 className="max-w-3xl text-4xl font-extrabold leading-tight md:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-200">{subtitle}</p>
      </div>
      <div className="h-1.5 bg-accent" />
    </section>
  );
}
