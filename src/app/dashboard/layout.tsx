import DashboardShell from "@/components/layout/DashboardShell";
import { getCurrentRole } from "@/services";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const role = await getCurrentRole();
  return <DashboardShell role={role}>{children}</DashboardShell>;
}
