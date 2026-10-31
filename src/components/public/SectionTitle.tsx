export default function SectionTitle({ eyebrow, title, text, center = true }: { eyebrow?: string; title: string; text?: string; center?: boolean }) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && <p className="mb-2 text-sm font-bold uppercase tracking-wider text-accent">{eyebrow}</p>}
      <h2 className="text-3xl font-bold text-navy md:text-4xl">{title}</h2>
      {text && <p className="mt-3 text-slate-600">{text}</p>}
    </div>
  );
}
