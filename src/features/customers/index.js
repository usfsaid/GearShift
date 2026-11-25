import CustomersPage from "./CustomersPage";
import reducer from "./customersSlice";
import { STAFF_ROLES } from "@/utils/constants";

export * from "./customersSlice";

const customersFeature = {
  key: "customers",
  path: "/customers",
  label: "Customers & Vehicles",
  icon: "",
  roles: STAFF_ROLES,
  component: CustomersPage,
  reducerKey: "customers",
  reducer,
};

export default customersFeature;
