import { useSelector } from "react-redux";
import useLoad from "@/hooks/useLoad";
import usePermissions from "@/hooks/usePermissions";
import PageHeader from "@/components/common/PageHeader";
import Panel from "@/components/common/Panel";
import StatCard from "@/components/common/StatCard";
import DataTable from "@/components/common/DataTable";

import { date } from "@/utils/format";
import { specializationLabels } from "@/utils/labels";

export default function DashboardPage() {
  const { user } = usePermissions();

  return (
    <>
      {/* Start Page Header */}
      <PageHeader
        eyebrow={date(new Date(), {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
        title={`Welcome, ${user.firstName}`}
      />
      {/* End Page Header */}

      {/* Start Card */}
      <div className="row g-3 mb-3">
        <div className="col-6 col-lg-3">
          <StatCard
            label="Open job orders"
            value={[]}
            hint="Orders not completed yet"
          />
        </div>
        <div className="col-6 col-lg-3">
          <StatCard
            label="Awaiting customer approval"
            value={[]}
            hint="Pending decisions"
          />
        </div>
        <div className="col-6 col-lg-3">
          <StatCard label="Busy technicians" value={`${[]}  ${[]}`} hint="" />
        </div>
        <div className="col-6 col-lg-3">
          <StatCard label="Ready for release" value={[]} hint="" />
        </div>
      </div>
      {/* End Card */}

      {/* Start Table */}
      <div className="row g-3">
        <div className="col-12 col-xl-8">
          <Panel title="Active job orders" subtitle="">
            <DataTable columns={[]} rows={[]} rowKey="jobOrderId" />
          </Panel>
        </div>
        {/* End Table */}
      </div>
    </>
  );
}
