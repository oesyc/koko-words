import Link from "next/link";
import { Badge, Card, PageHeader, Table, Td, btn } from "@/components/ui";
import { getVehicles } from "@/services";
import { expiryTone, fmtDate } from "@/lib/utils";

export default async function VehiclesPage() {
  const vehicles = await getVehicles();
  return (
    <>
      <PageHeader title="Vehicles" subtitle="Trucks and trailers." action={<Link href="/dashboard/vehicles/new" className={btn("accent")}>+ Add vehicle</Link>} />
      <Card>
        <Table heads={["Unit", "Type", "Make / model", "Plate", "VIN", "Last inspection", "Next service", "Registration", "Insurance"]}>
          {vehicles.map((v) => (
            <tr key={v.id} className="hover:bg-slate-50">
              <Td className="font-semibold text-navy">{v.unit}</Td><Td>{v.type}</Td><Td>{v.make}</Td><Td>{v.plate}</Td><Td>{v.vin}</Td>
              <Td>{fmtDate(v.inspectionDate)}</Td><Td>{fmtDate(v.nextServiceDate)}</Td>
              <Td>{fmtDate(v.registrationExpiry)} <Badge>{expiryTone(v.registrationExpiry)}</Badge></Td>
              <Td>{fmtDate(v.insuranceExpiry)} <Badge>{expiryTone(v.insuranceExpiry)}</Badge></Td>
            </tr>
          ))}
        </Table>
      </Card>
    </>
  );
}
