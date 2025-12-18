import { useState } from "react";
import { Outlet, useLocation } from "react-router";
import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/Dashboard/Header";
import useRole from "../hooks/useRole";
import UserOverview from "../pages/Dashboards/UserDashboard/UserDashboard/UserOverview";
import CreatorOverview from "../pages/Dashboards/CreatorDashboard/CreatorDashboard/CreatorOverview";
import AdminOverview from "../pages/Dashboards/AdminDashboard/AdminOverview/AdminOverview ";


const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { role } = useRole();
  const location = useLocation();

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const isRootDashboard = location.pathname === "/dashboard";

  return (
    <div className="min-h-screen bg-base-100">
      <div className="flex items-start min-h-screen mx-auto overflow-hidden bg-base-100 max-w-7xl">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Main Content */}
        <section className="flex flex-col flex-1 min-w-0 min-h-screen transition-all duration-300">
          <Header toggleSidebar={toggleSidebar} />

          <main className="flex-1 pl-6 pr-1 overflow-y-auto bg-base-100">
            <div className="mt-3 animate-fade-in-up">
              {isRootDashboard ? (
                <>
                  {role === "user" && <UserOverview />}
                  {role === "creator" && <CreatorOverview />}
                  {role === "admin" && <AdminOverview />}
                </>
              ) : (
                <Outlet />
              )}
            </div>
          </main>
        </section>
      </div>
    </div>
  );
};

export default DashboardLayout;
