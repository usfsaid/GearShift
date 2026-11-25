import UsersPage from "./UsersPage";
import reducer from "./usersSlice";
import { ROLES } from "@/utils/constants";

export * from "./usersSlice";

const usersFeature = {
  key: "users",
  path: "/users",
  label: "Emplyee",
  icon: "",
  roles: [ROLES.ADMIN],
  component: UsersPage,
  reducerKey: "users",
  reducer,
};

export default usersFeature;
