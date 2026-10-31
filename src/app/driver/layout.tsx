import DriverShell from "@/components/layout/DriverShell";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DriverShell>{children}</DriverShell>;
}
