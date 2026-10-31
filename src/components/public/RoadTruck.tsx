// Animated truck illustration (SVG + CSS). Real photo lagani ho to is component ko <Image> se replace karein.
export default function RoadTruck({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 360" className={className} role="img" aria-label="Koko's World truck driving on the road">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0a4ab8" /><stop offset="1" stopColor="#8fb8ff" /></linearGradient>
      </defs>
      <rect width="600" height="360" fill="url(#sky)" />
      <circle cx="480" cy="80" r="34" fill="#ff7a0d" opacity=".95" />
      <g fill="#fff" opacity=".85">
        <g className="anim-cloud"><ellipse cx="40" cy="70" rx="46" ry="14" /><ellipse cx="70" cy="62" rx="28" ry="14" /></g>
        <g className="anim-cloud-slow"><ellipse cx="-60" cy="120" rx="52" ry="14" /><ellipse cx="-30" cy="112" rx="30" ry="13" /></g>
      </g>
      <path d="M0 250 L90 170 L170 240 L260 150 L360 245 L450 175 L600 255 L600 290 L0 290Z" fill="#05358f" opacity=".55" />
      <path d="M0 270 L110 205 L210 262 L330 200 L440 265 L520 220 L600 270 L600 295 L0 295Z" fill="#032561" opacity=".8" />
      <rect y="285" width="600" height="75" fill="#1e293b" />
      <rect y="285" width="600" height="6" fill="#ff7a0d" />
      <line x1="0" y1="326" x2="600" y2="326" stroke="#fff" strokeWidth="5" strokeDasharray="40 40" className="anim-road" />
      <g className="anim-bob">
        <rect x="110" y="142" width="270" height="120" rx="6" fill="#fff" />
        <rect x="110" y="142" width="270" height="12" rx="4" fill="#ff7a0d" />
        <text x="245" y="212" textAnchor="middle" fontSize="30" fontWeight="900" fill="#05358f" fontFamily="Arial Black, Arial, sans-serif">KOKO&apos;S</text>
        <text x="245" y="240" textAnchor="middle" fontSize="22" fontWeight="900" fill="#ff7a0d" fontFamily="Arial Black, Arial, sans-serif">WORLD</text>
        <rect x="386" y="190" width="14" height="60" fill="#334155" />
        <path d="M400 168 H466 L500 205 V262 H400Z" fill="#05358f" />
        <path d="M412 178 H462 L486 205 H412Z" fill="#bfdbfe" />
        <rect x="496" y="226" width="14" height="30" rx="3" fill="#032561" />
        <rect x="506" y="238" width="8" height="10" fill="#fde68a" />
        <rect x="120" y="262" width="390" height="10" fill="#0f172a" />
        {[170, 214, 438, 482].map((x) => (
          <g key={x}>
            <circle cx={x} cy="278" r="21" fill="#0f172a" />
            <circle cx={x} cy="278" r="9" fill="#cbd5e1" />
            <g className="anim-wheel"><line x1={x - 8} y1="278" x2={x + 8} y2="278" stroke="#475569" strokeWidth="3" /></g>
          </g>
        ))}
      </g>
    </svg>
  );
}
