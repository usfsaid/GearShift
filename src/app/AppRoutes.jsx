import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import { navRoutes, publicRoutes } from "./features";

export default function AppRoutes() {
  return (
    <Routes>
      {publicRoutes.map(({ path, component: Page }) => (
        <Route key={path} path={path} element={<Page />} />
      ))}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          {navRoutes.map(({ path, roles, component: Page }) => (
            <Route key={path} element={<ProtectedRoute roles={roles} />}>
              <Route path={path} element={<Page />} />
            </Route>
          ))}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Route>
    </Routes>
  );
}
