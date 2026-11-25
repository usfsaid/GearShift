import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearToast, selectToast } from "@/app/uiSlice";

export default function Toaster() {
  const dispatch = useDispatch();
  const toast = useSelector(selectToast);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => dispatch(clearToast()), 2600);
    return () => clearTimeout(timer);
  }, [toast, dispatch]);

  if (!toast) return null;
  return (
    <div className="wf-toast">
      <div className={`alert alert-${toast.type} shadow mb-0`} role="status">
        {toast.message}
      </div>
    </div>
  );
}
