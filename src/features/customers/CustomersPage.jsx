import { useSelector } from "react-redux";
import useLoad from "@/hooks/useLoad";
import PageHeader from "@/components/common/PageHeader";
import Panel from "@/components/common/Panel";
import DataTable from "@/components/common/DataTable";
import { fetchCustomers, selectCustomers } from "./customersSlice";

const columns = [
  { key: "name", header: "Customer", render: (c) => <b>{c.fullName}</b> },
  { key: "phone", header: "Phone" },
  {
    key: "vehicles",
    header: "Vehicles",
    render: (c) =>
      c.vehicles.length
        ? c.vehicles.map((v) => (
            <span key={v.vehicleId} className="d-block">
              {v.make} {v.model} · {v.plateNumber}
            </span>
          ))
        : "—",
  },
  { key: "jobOrdersCount", header: "Job orders" },
];

export default function CustomersPage() {
  const { items, status } = useSelector(selectCustomers);
  useLoad(fetchCustomers);

  return (
    <>
      <PageHeader eyebrow="" title="Customers & Vehicles" subtitle="" />
      <Panel title="Customers">
        <DataTable
          columns={columns}
          rows={items}
          rowKey="customerId"
          loading={status === "loading"}
        />
      </Panel>
    </>
  );
}
