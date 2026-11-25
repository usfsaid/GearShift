import DashboardPage from "./DashboardPage";
import { ALL_ROLES } from "@/utils/constants";

const dashboardFeature = {
  key: "dashboard",
  path: "/",
  label: "Dashboard",
  // icon:{<img src="/public/icon/chart-line-solid-full.svg" />},
  roles: ALL_ROLES,
  component: DashboardPage,
};

export default dashboardFeature;
