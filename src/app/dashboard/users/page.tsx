import { Badge, Card, Field, Input, PageHeader, Select, Table, Td, btn } from "@/components/ui";
import ModalButton from "@/components/ui/ModalButton";
import { getUsers } from "@/services";

const roles = [
  { name: "Admin", text: "Everything: users, loads, drivers, pay, invoices, reports and settings." },
  { name: "Dispatcher", text: "Loads, documents and invoices." },
  { name: "Driver", text: "Own loads only: status updates, BOL upload, own pay and miles." },
];

export default async function UsersPage() {
  const users = await getUsers();
  return (
    <>
      <PageHeader title="Users & Roles" action={
        <ModalButton label="+ Add user" variant="accent" title="Add user" confirmLabel="Create user">
          <Field label="Full name"><Input /></Field><Field label="Email"><Input type="email" /></Field>
          <Field label="Role"><Select><option>Admin</option><option>Dispatcher</option><option>Driver</option></Select></Field>
        </ModalButton>} />
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        {roles.map((r) => <Card key={r.name} className="p-5"><Badge>{r.name}</Badge><p className="mt-2 text-sm text-slate-600">{r.text}</p></Card>)}
      </div>
      <Card>
        <Table heads={["Name", "Email", "Role", "Status", ""]}>
          {users.map((u) => (
            <tr key={u.id}>
              <Td className="font-semibold">{u.name}</Td><Td>{u.email}</Td><Td><Badge>{u.role}</Badge></Td>
              <Td><Badge>{u.active ? "Yes" : "No"}</Badge> <span className="text-xs text-slate-500">{u.active ? "Active" : "Deactivated"}</span></Td>
              <Td><button className={btn("ghost", "sm")}>Edit</button></Td>
            </tr>
          ))}
        </Table>
      </Card>
    </>
  );
}
