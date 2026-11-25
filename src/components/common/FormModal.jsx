import { useState } from "react";
import { errorMessage } from "@/utils/errors";
import Modal from "./Modal";

/*
 * Config-driven form dialog.
 * field: { name, label, type, options?, full?, disabled?, hidden?(values), ltr?, defaultValue? }
 * validate(values) -> error message, or '' when valid
 * onFieldChange(values, name) -> optional patch object merged into the values
 * notice(values) -> optional info text
 */
export default function FormModal({
  title,
  fields,
  initialValues = {},
  validate,
  onSubmit,
  onClose,
  onFieldChange,
  notice,
  submitLabel,
}) {
  //entiry input
  const [values, setValues] = useState(() =>
    Object.fromEntries(
      fields.map((f) => [
        f.name,
        String(
          initialValues[f.name] ??
            f.defaultValue ??
            (f.type === "select" ? (f.options[0]?.value ?? "") : ""),
        ),
      ]),
    ),
  );
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  // onChange in input
  const handleChange = (name, value) => {
    const next = { ...values, [name]: value };
    const patch = onFieldChange?.(next, name);
    setValues(patch ? { ...next, ...patch } : next);
  };

  //Send data
  const handleSubmit = async (event) => {
    event.preventDefault();
    const clean = Object.fromEntries(
      Object.entries(values).map(([k, v]) => [k, v.trim()]),
    );
    const invalid = validate?.(clean);
    if (invalid) return setError(invalid);

    setBusy(true);
    try {
      await onSubmit(clean);
      onClose();
    } catch (err) {
      setError(errorMessage(err));
      setBusy(false);
    }
  };

  // input Filed
  const renderControl = (field) => {
    const props = {
      id: `f-${field.name}`,
      value: values[field.name],
      disabled: field.disabled,
      dir: field.ltr ? "ltr" : undefined,
      onChange: (e) => handleChange(field.name, e.target.value),
    };

    //select filed
    if (field.type === "select") {
      return (
        <select className="form-select" {...props}>
          {field.options.map((o) => (
            <option key={o.value} value={o.value} disabled={o.disabled}>
              {o.label}
            </option>
          ))}
        </select>
      );
    }

    // textarea filed
    if (field.type === "textarea")
      return <textarea className="form-control" rows={2} {...props} />;
    return (
      <input
        className="form-control"
        type={field.type || "text"}
        min={field.type === "number" ? 0 : undefined}
        step={field.type === "number" ? "any" : undefined}
        {...props}
      />
    );
  };

  const noticeText = notice?.(values);

  return (
    <Modal title={title} onClose={onClose}>
      <form onSubmit={handleSubmit} noValidate>
        <div className="modal-body">
          <div className="row g-3">
            {/* fields  */}
            {fields
              .filter((f) => !f.hidden?.(values))
              .map((field) => (
                <div
                  key={field.name}
                  className={field.full ? "col-12" : "col-12 col-md-6"}
                >
                  {/* labels */}
                  <label
                    htmlFor={`f-${field.name}`}
                    className="form-label small fw-bold text-secondary"
                  >
                    {field.label}
                  </label>

                  {/* input fields  */}
                  {renderControl(field)}
                </div>
              ))}
            {noticeText && (
              <div className="col-12">
                <div className="alert alert-info py-2 mb-0">{noticeText}</div>
              </div>
            )}
            {error && (
              <div className="col-12">
                <div className="alert alert-danger py-2 mb-0" role="alert">
                  {error}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="modal-footer">
          {/* btn Cancel */}
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={onClose}
          >
            Cancel
          </button>

          {/* btn Save */}
          <button type="submit" className="btn btn-gold" disabled={busy}>
            {submitLabel ?? "Save"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
