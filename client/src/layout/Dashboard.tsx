import { Outlet } from "react-router";
import DashboardNav from "../components/Dashboard/DashboardNav";

export default function Dashboard() {
  return (
    <div className="relative w-full pl-72">
      <DashboardNav />
      <Outlet />
    </div>
  )
}
