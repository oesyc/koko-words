// Simple SVG bar chart. Phase 2 mein data services se aayega.
export default function RevenueChart({ data }: { data: { month: string; revenue: number; expenses: number }[] }) {
  const max = Math.max(...data.map((d) => d.revenue)) * 1.1;
  const H = 150, W = 400, bw = 16, gap = W / data.length;
  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H + 24}`} className="w-full" role="img" aria-label="Revenue and expenses chart">
        {[0.25, 0.5, 0.75, 1].map((p) => <line key={p} x1="0" x2={W} y1={H - H * p} y2={H - H * p} stroke="#e2e8f0" strokeDasharray="3 3" />)}
        {data.map((d, i) => {
          const x = i * gap + gap / 2 - bw;
          const rh = (d.revenue / max) * H, eh = (d.expenses / max) * H;
          return (
            <g key={d.month}>
              <rect x={x} y={H - rh} width={bw} height={rh} rx="3" fill="#05358f" />
              <rect x={x + bw + 3} y={H - eh} width={bw} height={eh} rx="3" fill="#ff7a0d" opacity=".75" />
              <text x={x + bw} y={H + 16} textAnchor="middle" fontSize="11" fill="#64748b">{d.month}</text>
            </g>
          );
        })}
      </svg>
      <div className="mt-2 flex gap-4 text-xs text-slate-500">
        <span className="flex items-center gap-1"><i className="h-2.5 w-2.5 rounded-sm bg-navy" /> Revenue</span>
        <span className="flex items-center gap-1"><i className="h-2.5 w-2.5 rounded-sm bg-accent" /> Expenses</span>
      </div>
    </div>
  );
}
