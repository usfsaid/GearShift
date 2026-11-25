import { useDispatch, useSelector } from "react-redux";
import useLoad from "@/hooks/useLoad";
import useModalState from "@/hooks/useModalState";
import { useRun } from "@/hooks/useActions";
import PageHeader from "@/components/common/PageHeader";
import Panel from "@/components/common/Panel";
import DataTable from "@/components/common/DataTable";
import AddButton from "@/components/common/AddButton";
import StatusBadge from "@/components/common/StatusBadge";
import CrudModals from "@/components/common/CrudModals";
import { fetchPeople, selectPeople } from "@/features/people";
import {
  fetchSpecializations,
  selectSpecializations,
} from "@/features/specializations";
import {
  createUser,
  deleteUser,
  fetchUsers,
  selectUsers,
  updateUser,
} from "./usersSlice";
import { ROLES, isTechnicalSpecialization } from "@/utils/constants";
import { fullName } from "@/utils/format";
import {
  accountStatusLabels,
  roleLabels,
  specializationLabels,
} from "@/utils/labels";
import { USERNAME_REGEX } from "@/utils/validators";

const columns = [
  { key: "name", header: "User", render: (u) => <b>{u.fullName}</b> },
  {
    key: "username",
    header: "Username",
    render: (u) => <span dir="ltr">{u.username}</span>,
  },
  { key: "role", header: "Role", render: (u) => roleLabels[u.role] ?? u.role },
  {
    key: "specialization",
    header: "Specialization",
    render: (u) =>
      specializationLabels[u.specializationName] ?? u.specializationName,
  },
  {
    key: "work",
    header: "Work status",
    render: (u) => {
      if (u.role !== ROLES.TECHNICIAN) return "—";
      return u.activeFault ? (
        <StatusBadge variant="warning">
          Busy: {u.activeFault.faultDescription}
        </StatusBadge>
      ) : (
        <StatusBadge variant="success">Available</StatusBadge>
      );
    },
  },
  {
    key: "account",
    header: "Account",
    render: (u) => (
      <StatusBadge variant={u.isActive ? "success" : "danger"}>
        {u.isActive ? accountStatusLabels.active : accountStatusLabels.inactive}
      </StatusBadge>
    ),
  },
];

const toInitial = (u) => ({
  personId: u.personId,
  username: u.username,
  password: "",
  role: u.role,
  specializationId: u.specializationId,
  isActive: u.isActive ? "1" : "0",
});

export default function UsersPage() {
  const dispatch = useDispatch();
  const run = useRun();
  const modal = useModalState();
  const { items, status } = useSelector(selectUsers);
  const { items: people } = useSelector(selectPeople);
  const { items: specializations = [] } = useSelector(selectSpecializations);
  useLoad(fetchUsers, fetchPeople, fetchSpecializations);

  const isEdit = modal.state?.mode === "edit";
  const technicalIds = specializations
    .filter(isTechnicalSpecialization)
    .map((s) => String(s.specializationId));

  const fields = [
    {
      name: "personId",
      label: "Person",
      type: "select",
      full: true,
      disabled: isEdit,
      options: people
        .filter((p) => isEdit || !p.isUser)
        .map((p) => ({
          value: p.personId,
          label: `${fullName(p)} · ${p.phone}`,
        })),
    },
    { name: "username", label: "Username", ltr: true },
    {
      name: "password",
      label: isEdit ? "Password (empty = unchanged)" : "Password",
      type: "password",
      ltr: true,
    },
    {
      name: "specializationId",
      label: "Specialization",
      type: "select",
      options: specializations.map((s) => ({
        value: s.specializationId,
        label:
          specializationLabels[s.specializationName] ?? s.specializationName,
      })),
    },
    {
      name: "role",
      label: "Role",
      type: "select",
      defaultValue: ROLES.TECHNICIAN,
      options: Object.values(ROLES).map((r) => ({
        value: r,
        label: roleLabels[r] ?? r,
      })),
    },
    {
      name: "isActive",
      label: "Account",
      type: "select",
      defaultValue: "1",
      options: [
        { value: "1", label: accountStatusLabels.active },
        { value: "0", label: accountStatusLabels.inactive },
      ],
    },
  ];

  const validate = (v) =>
    !USERNAME_REGEX.test(v.username)
      ? "Username must be 3 to 20 English letters, numbers, dots or underscores"
      : (!isEdit || v.password) && v.password.length < 4
        ? "Password must be at least 4 characters"
        : v.role === ROLES.TECHNICIAN &&
            !technicalIds.includes(v.specializationId)
          ? "A technician needs a technical specialization"
          : "";

  const toPayload = (v) => ({
    personId: Number(v.personId),
    username: v.username,
    ...(v.password ? { password: v.password } : {}),
    role: v.role,
    specializationId: Number(v.specializationId),
    isActive: v.isActive === "1",
  });

  return (
    <>
      <PageHeader eyebrow="" title="Emplyee" subtitle="" />
      <Panel
        title=" Accounts"
        subtitle=""
        extra={<AddButton onClick={modal.openAdd} />}
      >
        <DataTable
          columns={columns}
          rows={items}
          rowKey="userId"
          loading={status === "loading"}
          getActions={(user) => modal.crudActions(user)}
        />
      </Panel>

      <CrudModals
        modal={modal}
        entityLabel="User"
        fields={fields}
        validate={validate}
        toInitial={toInitial}
        onCreate={async (v) => {
          await run(createUser(toPayload(v)));
          dispatch(fetchPeople());
        }}
        onUpdate={(user, v) =>
          run(updateUser({ id: user.userId, payload: toPayload(v) }))
        }
        onDelete={(user) => run(deleteUser(user.userId))}
      />
    </>
  );
}
