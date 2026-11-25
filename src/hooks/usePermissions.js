import { useSelector } from "react-redux";
import { selectUser } from "@/features/auth/authSlice";
import { ROLES } from "@/utils/constants";

export default function usePermissions() {
  const user = useSelector(selectUser);
  return {
    user,
    isAdmin: user?.role === ROLES.ADMIN,
    isTechnician: user?.role === ROLES.TECHNICIAN,
    canManage: user?.role !== ROLES.TECHNICIAN,
  };
}
