import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuthStatus, selectUser } from "@/features/auth";
import FullPageSpinner from "@/components/common/FullPageSpinner";

// Requires a signed-in user and, optionally, one of the given roles
export default function ProtectedRoute({ roles }) {
  const user = useSelector(selectUser);
  const status = useSelector(selectAuthStatus);

  if (status === "loading") return <FullPageSpinner />;
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;
  return <Outlet />;
}
