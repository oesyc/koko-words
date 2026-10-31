import NewLoadForm from "@/components/loads/NewLoadForm";
import { PageHeader } from "@/components/ui";
import { getBrokers, getDrivers, getVehicles } from "@/services";

export default async function NewLoadPage() {
  const [brokers, drivers, vehicles] = await Promise.all([getBrokers(), getDrivers(), getVehicles()]);
  return (
    <>
      <PageHeader title="New load" subtitle="Upload the rate confirmation, review the details, then save." />
      <NewLoadForm brokers={brokers} drivers={drivers} vehicles={vehicles} />
    </>
  );
}
