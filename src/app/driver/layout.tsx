import DriverShell from "@/components/layout/DriverShell";
import { getCurrentDriverId, getDriver, getVehicle } from "@/services";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const driver = await getDriver(await getCurrentDriverId());
  const truck = driver?.truckId ? await getVehicle(driver.truckId) : undefined;
  return <DriverShell name={driver?.name ?? "Driver"} unit={truck?.unit ?? "No truck assigned"}>{children}</DriverShell>;
}
