// Demo roles/accounts - Phase 2 mein real auth se replace hoga
export type DemoRole = "Admin" | "Dispatcher" | "Driver";
export const ROLE_COOKIE = "kw_role";
export const DRIVER_COOKIE = "kw_driver";

export const demoAccounts = [
  { role: "Admin" as DemoRole, name: "Fola (Owner)", email: "admin@kokosworldllc.com", password: "Admin@123", landing: "/dashboard", driverId: "" },
  { role: "Dispatcher" as DemoRole, name: "Aisha Khan", email: "dispatch@kokosworldllc.com", password: "Dispatch@123", landing: "/dashboard", driverId: "" },
  { role: "Driver" as DemoRole, name: "Marcus Johnson", email: "marcus@kokosworldllc.com", password: "Driver@123", landing: "/driver", driverId: "d1" },
  { role: "Driver" as DemoRole, name: "Carlos Rivera", email: "carlos@kokosworldllc.com", password: "Driver@123", landing: "/driver", driverId: "d2" },
];

export const parseRole = (v?: string): DemoRole => (v === "Dispatcher" || v === "Driver" ? v : "Admin");

const dispatcherPaths = ["/dashboard/loads", "/dashboard/documents", "/dashboard/invoices", "/dashboard/brokers", "/dashboard/alerts", "/dashboard/quotes"];
export function canAccess(role: DemoRole, path: string) {
  if (role === "Admin") return true;
  if (role === "Driver") return false;
  return path === "/dashboard" || dispatcherPaths.some((p) => path === p || path.startsWith(p + "/"));
}
