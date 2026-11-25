import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import usePermissions from "@/hooks/usePermissions";
import { logoutUser } from "@/features/auth";
import { navRoutes } from "@/app/features";

export default function Sidebar() {
  const dispatch = useDispatch();
  const { user } = usePermissions();

  return (
    <aside className="wf-sidebar">
      {/* Start icon & Title */}
      <div className="wf-brand d-flex align-items-center gap-2 px-2 pb-4">
        <div className="wf-logo">
          <img
            src="/public/img/car-repair-logo-icon-vector-22266860.jpg"
            alt=""
          />
        </div>
        <div>
          <b className="fs-5">GearShift</b>
        </div>
      </div>
      {/* End icon & Title */}

      {/* Start NavLink */}
      <nav>
        {navRoutes
          .filter((route) => route.roles.includes(user.role))
          .map(({ path, icon, label, Badge }) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/"}
              className={({ isActive }) =>
                `wf-nav-link ${isActive ? "active" : ""}`
              }
            >
              <span style={{ width: 26, textAlign: "center" }}>{icon}</span>
              <span>{label}</span>
              {/* {Badge && <Badge />} */}
            </NavLink>
          ))}
      </nav>
      {/* End NavLink */}

      {/* Start User & SignOut */}
      <div
        className="wf-sidebar-footer mt-auto rounded-3 p-3"
        style={{ background: "#131b25" }}
      >
        {/* user card */}
        <div className="d-flex align-items-center gap-2 mb-2 wf-user-card">
          <div className="wf-avatar">{user.fullName[0]}</div>
          <div>
            {user.fullName}
            <small className="d-block text-secondary">{user.role}</small>
          </div>
        </div>

        {/* btn sinout */}
        <button
          type="button"
          className="wf-btn is-ghost sm"
          onClick={() => dispatch(logoutUser())}
        >
          <i className="bi bi-box-arrow-right" />
          Sign out
        </button>
      </div>
      {/* End User & SignOut */}
    </aside>
  );
}
