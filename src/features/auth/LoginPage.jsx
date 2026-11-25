import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "./authSlice";
import { showToast } from "@/app/uiSlice";
import { errorMessage } from "@/utils/errors";

const SHOW_DEMO = import.meta.env.VITE_SHOW_DEMO === "true";

export default function LoginPage() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  if (user) return <Navigate to="/" replace />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.username.trim() || !form.password) {
      return setError("Enter your username and password");
    }

    setBusy(true);
    setError("");
    try {
      const sessionUser = await dispatch(
        login({ username: form.username.trim(), password: form.password }),
      ).unwrap();
      dispatch(showToast({ message: `Welcome ${sessionUser.firstName}` }));
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  const setField = (name) => (event) =>
    setForm({ ...form, [name]: event.target.value });

  return (
    <div className="wf-login">
      <form
        className="card shadow-lg w-100"
        style={{ maxWidth: 400 }}
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="card-body p-4 d-flex flex-column gap-3">
          <div className="d-flex align-items-center gap-2">
            <div className="wf-logo">
              <img
                src="/public/img/car-repair-logo-icon-vector-22266860.jpg"
                alt=""
              />
            </div>
            <div>
              <b className="fs-4">GearShift</b>
            </div>
          </div>

          <div>
            <h1 className="h4 fw-bold mb-1">Sign in</h1>
            <p className="text-secondary mb-0">
              Enter your account to access the system.
            </p>
          </div>

          <div>
            <label
              htmlFor="username"
              className="form-label small fw-bold text-secondary"
            >
              Username
            </label>
            <input
              id="username"
              className="form-control"
              dir="ltr"
              autoComplete="username"
              value={form.username}
              onChange={setField("username")}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="form-label small fw-bold text-secondary"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="form-control"
              dir="ltr"
              autoComplete="current-password"
              value={form.password}
              onChange={setField("password")}
            />
          </div>

          {error && (
            <div className="alert alert-danger py-2 mb-0" role="alert">
              {error}
            </div>
          )}

          <button type="submit" className="btn btn-gold py-2" disabled={busy}>
            Sign in
          </button>

          {SHOW_DEMO && (
            <div
              className="small bg-body-tertiary rounded p-2"
              style={{ lineHeight: 1.9 }}
            >
              Demo accounts:
              <br />
              Admin: <b>usfA</b> / <b>1234</b>
              <br />
              Reception: <b>usfR</b> / <b>1234</b>
              <br />
              Technician: <b>usfT</b> / <b>1234</b>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
