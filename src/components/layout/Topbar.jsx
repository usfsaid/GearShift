import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectSearchTerm, setSearchTerm } from "@/app/uiSlice";
import { features, navRoutes } from "@/app/features";

export default function Topbar() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const term = useSelector(selectSearchTerm);
  const current = navRoutes.find((route) => route.path === pathname);
  const actions = features.filter((feature) => feature.TopbarAction);

  // The global search applies to the current page only
  useEffect(() => {
    dispatch(setSearchTerm(""));
  }, [pathname, dispatch]);

  return (
    <header className="wf-topbar">
      <span className="wf-breadcrumb text-secondary text-nowrap">
        Workspace / <b className="text-body">{current?.label}</b>
      </span>

      <input
        type="search"
        className="form-control"
        style={{ maxWidth: 360 }}
        placeholder="Search for a person, job order, plate..."
        aria-label="Search"
        value={term}
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
      />

      <div className="ms-auto d-flex align-items-center gap-2">
        {actions.map(({ key, TopbarAction }) => (
          <TopbarAction key={key} />
        ))}
      </div>
    </header>
  );
}
