import { useState } from "react";
import { errorMessage } from "@/utils/errors";
import Modal from "./Modal";

// Component ConfirmModal for Delete btn
export default function ConfirmModal({
  message,
  confirmLabel,
  onConfirm,
  onClose,
}) {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const handleConfirm = async () => {
    setBusy(true);
    try {
      await onConfirm();
      onClose();
    } catch (err) {
      setError(errorMessage(err));
      setBusy(false);
    }
  };

  return (
    <Modal title="Confirm" onClose={onClose}>
      <div className="modal-body">
        {message}
        {error && (
          <div className="alert alert-danger py-2 mt-3 mb-0" role="alert">
            {error}
          </div>
        )}
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn btn-danger"
          disabled={busy}
          onClick={handleConfirm}
        >
          {confirmLabel ?? "Delete"}
        </button>
      </div>
    </Modal>
  );
}
