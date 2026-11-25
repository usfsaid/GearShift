import { Outlet } from "react-router-dom";
import { features } from "@/app/features";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function MainLayout() {
  const extras = features.filter((feature) => feature.LayoutExtras);

  return (
    <>
      <Sidebar />
      <div className="wf-main">
        <Topbar />
        <main className="wf-content">
          <Outlet />
        </main>
      </div>
      {extras.map(({ key, LayoutExtras }) => (
        <LayoutExtras key={key} />
      ))}
    </>
  );
}
