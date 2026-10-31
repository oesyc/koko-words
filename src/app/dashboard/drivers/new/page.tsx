import DriverForm from "@/components/drivers/DriverForm";
import { PageHeader } from "@/components/ui";
import { getVehicles } from "@/services";

export default async function NewDriverPage() {
  const vehicles = await getVehicles();
  return (
    <>
      <PageHeader title="Add / edit driver" subtitle="Same form is used for adding and editing a driver." />
      <DriverForm vehicles={vehicles} />
    </>
  );
}
