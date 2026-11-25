import uiReducer from "./uiSlice";
import authFeature from "@/features/auth";
import dashboardFeature from "@/features/dashboard";
import peopleFeature from "@/features/people";
import customersFeature from "@/features/customers";
import usersFeature from "@/features/users";
import specializationsFeature from "@/features/specializations";

export const features = [
  authFeature,
  dashboardFeature,
  peopleFeature,
  customersFeature,
  usersFeature,
  specializationsFeature,
];

export const publicRoutes = features.filter((feature) => feature.public);

export const navRoutes = features.filter(
  (feature) => feature.path && !feature.public,
);

export const reducers = {
  ui: uiReducer,
  ...Object.fromEntries(
    features
      .filter((feature) => feature.reducer && feature.reducerKey)
      .map((feature) => [feature.reducerKey, feature.reducer]),
  ),
};
