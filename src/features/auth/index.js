import LoginPage from "./LoginPage";
import reducer from "./authSlice";

export { default as LoginPage } from "./LoginPage";
export * from "./authSlice";

// Public feature: only the login route, no navigation entry
const authFeature = {
  key: "login",
  path: "/login",
  public: true,
  component: LoginPage,
  reducerKey: "auth",
  reducer,
};

export default authFeature;
