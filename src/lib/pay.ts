import type { Driver, PayStatement } from "@/types";

export function calcStatement(s: PayStatement, d: Driver) {
  const loadedMiles = s.lines.reduce((a, l) => a + l.loadedMiles, 0);
  const emptyMiles = s.lines.reduce((a, l) => a + l.emptyMiles, 0);
  const loadedPay = loadedMiles * d.loadedRate;
  const emptyPay = emptyMiles * d.emptyRate;
  const extras = s.extras.reduce((a, e) => a + e.amount, 0);
  const deductions = s.deductions.reduce((a, e) => a + e.amount, 0);
  return { loadedMiles, emptyMiles, loadedPay, emptyPay, extras, deductions, total: loadedPay + emptyPay + extras - deductions };
}
