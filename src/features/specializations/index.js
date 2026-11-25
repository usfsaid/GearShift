import reducer from "./specializationsSlice";

export * from "./specializationsSlice";

// Data-only feature: no page, it feeds the users, faults and dashboard screens
const specializationsFeature = {
  key: "specializations",
  reducerKey: "specializations",
  reducer,
};

export default specializationsFeature;
