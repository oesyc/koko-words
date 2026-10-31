export const cn = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");
export const money = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });
export const fmtDate = (d: string) =>
  new Date(d + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
// Demo "today" - backend ke waqt new Date() use karein
export const TODAY = "2026-10-31";
export const daysLeft = (d: string) =>
  Math.round((new Date(d + "T00:00:00").getTime() - new Date(TODAY + "T00:00:00").getTime()) / 86400000);
export function expiryTone(d: string) {
  const n = daysLeft(d);
  if (n < 0) return "Expired";
  if (n <= 7) return "Expiring in 7 days";
  if (n <= 30) return "Expiring in 30 days";
  return "Valid";
}
export function etaLabel(status: string, deliveryDate: string) {
  if (status === "Delivered") return "Done";
  if (status === "Delayed") return "+4 hrs";
  const n = daysLeft(deliveryDate);
  return n <= 0 ? "Today" : n === 1 ? "Tomorrow" : fmtDate(deliveryDate);
}
