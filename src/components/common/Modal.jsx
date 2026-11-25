import { useEffect } from "react";
import { createPortal } from "react-dom";

// Modal Form Shap

export default function Modal({ title, onClose, children }) {
  useEffect(() => {
    const onKeyDown = (event) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return createPortal(
    <>
      <div
        className="modal d-block"
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        onMouseDown={(event) =>
          event.target === event.currentTarget && onClose()
        }
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              {/* title form */}
              <h5 className="modal-title fs-6 fw-bold">{title}</h5>

              {/* btn close form < X > */}
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={onClose}
              />
            </div>

            {/* content Form */}
            {children}
          </div>
        </div>
      </div>

      {/* back show darker */}
      <div className="modal-backdrop show" />
    </>,
    document.body,
  );
}
