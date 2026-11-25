import PeoplePage from "./PeoplePage";
import reducer from "./peopleSlice";
import { STAFF_ROLES } from "@/utils/constants";

export * from "./peopleSlice";

const peopleFeature = {
  key: "people",
  path: "/people",
  label: "All User",
  icon: "",
  roles: STAFF_ROLES,
  component: PeoplePage,
  reducerKey: "people",
  reducer,
};

export default peopleFeature;
