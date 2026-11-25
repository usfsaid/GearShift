import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AppRoutes from "@/app/AppRoutes";
import Toaster from "@/components/common/Toaster";
import { fetchCurrentUser } from "@/features/auth";
import { getToken } from "@/utils/storage";

export default function App() {
  const dispatch = useDispatch();

  // Restore the session when a token exists
  useEffect(() => {
    if (getToken()) dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <>
      <AppRoutes />
      <Toaster />
    </>
  );
}
