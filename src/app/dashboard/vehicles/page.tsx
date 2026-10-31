import Link from "next/link";
import { Badge, Card, Field, PageHeader, Select, Table, Td, btn } from "@/components/ui";
import ModalButton from "@/components/ui/ModalButton";
import { getDrivers, getVehicles } from "@/services";
import { expiryTone, fmtDate } from "@/lib/utils";

export default async function VehiclesPage() {
  const [vehicles, drivers] = await Promise.all([getVehicles(), getDrivers()]);
  return (
    <>
      <PageHeader title="Vehicles" subtitle="Trucks and trailers, and who they are assigned to." action={<Link href="/dashboard/vehicles/new" className={btn("accent")}>+ Add vehicle</Link>} />
      <Card>
        <Table heads={["Unit", "Type", "Make / model", "Plate", "Assigned driver", "Next service", "Registration", "Insurance", ""]}>
          {vehicles.map((v) => {
            const owner = drivers.find((d) => (v.type === "Truck" ? d.truckId : d.trailerId) === v.id);
            return (
              <tr key={v.id} className="hover:bg-slate-50">
                <Td className="font-semibold text-navy">{v.unit}</Td><Td>{v.type}</Td><Td>{v.make}</Td><Td>{v.plate}</Td>
                <Td>{owner ? <Link href={`/dashboard/drivers/${owner.id}`} className="font-medium text-navy">{owner.name}</Link> : <Badge>Unassigned</Badge>}</Td>
                <Td>{fmtDate(v.nextServiceDate)}</Td>
                <Td>{fmtDate(v.registrationExpiry)} <Badge>{expiryTone(v.registrationExpiry)}</Badge></Td>
                <Td>{fmtDate(v.insuranceExpiry)} <Badge>{expiryTone(v.insuranceExpiry)}</Badge></Td>
                <Td>
                  {owner ? (
                    <ModalButton label="Unassign" size="sm" variant="danger" confirmLabel="Unassign" title={`Unassign ${v.unit}?`} description={`${v.unit} will be removed from ${owner.name}'s portal.`} />
                  ) : (
                    <ModalButton label="Assign" size="sm" variant="outline" confirmLabel="Assign" title={`Assign ${v.unit} to a driver`}>
                      <Field label="Driver"><Select>{drivers.map((d) => <option key={d.id}>{d.name}</option>)}</Select></Field>
                    </ModalButton>
                  )}
                </Td>
              </tr>
            );
          })}
        </Table>
      </Card>
    </>
  );
}
