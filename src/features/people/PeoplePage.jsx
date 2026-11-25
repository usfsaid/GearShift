import { useSelector } from "react-redux";
import useLoad from "@/hooks/useLoad";
import useModalState from "@/hooks/useModalState";
import usePermissions from "@/hooks/usePermissions";
import { useRun } from "@/hooks/useActions";
import PageHeader from "@/components/common/PageHeader";
import Panel from "@/components/common/Panel";
import DataTable from "@/components/common/DataTable";
import AddButton from "@/components/common/AddButton";
import StatusBadge from "@/components/common/StatusBadge";
import CrudModals from "@/components/common/CrudModals";

import {
  createPerson,
  deletePerson,
  fetchPeople,
  selectPeople,
  updatePerson,
} from "./peopleSlice";
import { fullName } from "@/utils/format";
import { EMAIL_REGEX, NAME_REGEX, PHONE_REGEX } from "@/utils/validators";

// data table
const columns = [
  { key: "name", header: "Person", render: (p) => <b>{fullName(p)}</b> },
  { key: "phone", header: "Phone" },
  { key: "email", header: "Email", render: (p) => p.email || "—" },
  { key: "address", header: "Address", render: (p) => p.address || "—" },
  {
    key: "roles",
    header: "Roles",
    render: (p) => (
      <span className="d-inline-flex gap-1">
        {p.isCustomer && <StatusBadge variant="success">Customer</StatusBadge>}
        {p.isUser && <StatusBadge variant="info">Emplyee</StatusBadge>}
        {!p.isCustomer && !p.isUser && "—"}
      </span>
    ),
  },
];

const validate = (v) =>
  !NAME_REGEX.test(v.firstName)
    ? "First name must be letters only (2 to 40)"
    : !NAME_REGEX.test(v.lastName)
      ? "Last name must be letters only (2 to 40)"
      : !PHONE_REGEX.test(v.phone)
        ? "Phone must be 11 digits starting with 010, 011, 012 or 015"
        : v.email && !EMAIL_REGEX.test(v.email)
          ? "Email address is not valid"
          : "";

const toPayload = (v) => ({
  firstName: v.firstName,
  lastName: v.lastName,
  phone: v.phone,
  email: v.email || null,
  address: v.address || null,
  nationalId: v.nationalId || null,
  isCustomer: v.isCustomer === "1",
});

const toInitial = (p) => ({
  ...p,
  email: p.email ?? "",
  address: p.address ?? "",
  nationalId: p.nationalId ?? "",
  isCustomer: p.isCustomer ? "1" : "0",
});

export default function PeoplePage() {
  const run = useRun();
  const modal = useModalState();
  const { canManage } = usePermissions();
  const { items, status } = useSelector(selectPeople);
  useLoad(fetchPeople);

  //data filed
  const fields = [
    { name: "firstName", label: "First name" },
    { name: "lastName", label: "Last name" },
    { name: "phone", label: "Phone", type: "tel", ltr: true },
    { name: "email", label: "Email (optional)", type: "email", ltr: true },
    { name: "address", label: "Address" },
    { name: "nationalId", label: "National ID (optional)", ltr: true },
    {
      name: "isCustomer",
      label: "Customer role",
      type: "select",
      full: true,
      defaultValue: "1",
      options: [
        { value: "1", label: "Yes" },
        { value: "0", label: "No" },
      ],
    },
  ];

  return (
    <>
      <PageHeader eyebrow="" title="All User " subtitle="" />

      {/* Add People */}
      <Panel
        title="User records"
        subtitle=""
        extra={canManage && <AddButton onClick={modal.openAdd} />}
      >
        {/* Table people */}
        <DataTable
          columns={columns}
          rows={items}
          rowKey="personId"
          loading={status === "loading"}
          getActions={
            canManage ? (person) => modal.crudActions(person) : undefined
          }
        />
      </Panel>

      <CrudModals
        modal={modal}
        entityLabel="Person"
        fields={fields}
        validate={validate}
        toInitial={toInitial}
        onCreate={(v) => run(createPerson(toPayload(v)))}
        onUpdate={(person, v) =>
          run(updatePerson({ id: person.personId, payload: toPayload(v) }))
        }
        onDelete={(person) => run(deletePerson(person.personId))}
      />
    </>
  );
}
