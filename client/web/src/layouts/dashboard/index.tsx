import DashboardSidebar from "./components/sidebar";
import { Outlet } from "react-router";
import CurrentUserProvider from "./hooks/useCurrentUser/provider";

function DashboardLayout() {
  return (
    <main className="flex w-screen bg-[#151918] text-white flex flex-row">
      <CurrentUserProvider>
        <DashboardSidebar />
        <Outlet />
      </CurrentUserProvider>
    </main>
  );
}

export default DashboardLayout;