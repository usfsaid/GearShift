import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { showToast } from "@/app/uiSlice";
import { errorMessage } from "@/utils/errors";

// Shows a success/error toast
export function useNotify() {
  const dispatch = useDispatch();
  return useCallback(
    (message, type = "success") => dispatch(showToast({ message, type })),
    [dispatch],
  );
}

// Runs a thunk and throws { code } on failure (used by modals, which show the error inline)
export function useRun() {
  const dispatch = useDispatch();
  return useCallback((thunk) => dispatch(thunk).unwrap(), [dispatch]);
}

// Runs a thunk and reports the result with a toast (used by buttons and menus)
export function useAction() {
  const dispatch = useDispatch();
  return useCallback(
    async (thunk, successMessage) => {
      try {
        const result = await dispatch(thunk).unwrap();
        if (successMessage) dispatch(showToast({ message: successMessage }));
        return result;
      } catch (error) {
        dispatch(showToast({ message: errorMessage(error), type: "danger" }));
        return null;
      }
    },
    [dispatch],
  );
}
