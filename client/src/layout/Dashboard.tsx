import { Outlet, useNavigate } from "react-router";
import DashboardNav from "../components/Dashboard/DashboardNav";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Session } from "../hooks/Session";
import { toast } from "react-toastify";
import Modal from "../components/Modal/Modal";

async function fetchSession(navigate: (path: string) => void) {
  try {
    const url = `${import.meta.env.VITE_SERVER_URL}/auth/getAuth`;
    const { data } = await axios.get<Session>(url, {
      withCredentials: true,
    });
    if (data.role !== "ADMIN") {
      toast.error("You are not authorized to view this page");
      navigate("/");
      return {
        authenticated: false,
        email: "",
        id: "",
        role: undefined,
      };
    }
    return data as Session;
  } catch (error) {
    toast.error("You are not authorized to view this page");
    navigate("/");
    return {
      authenticated: false,
      email: "",
      id: "",
      role: undefined,
    };
  }
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { isLoading } = useQuery({
    queryKey: ["dashboard-middleware"],
    queryFn: () => fetchSession(navigate),
    enabled: true,
    retry: true,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="absolute top-0 inset-x-0 h-full bg-main bg-no-repeat bg-cover bg-fixed bg-center md:bg-top antialiased">
      <div className="absolute top-0 left-0 w-screen h-screen bg-blur z-50 backdrop-blur-[6px] font-ClashGrotesk overflow-y-auto no-scrollbar">
        <div className="relative max-w-7xl mx-auto flex">
          <DashboardNav />
          <Outlet />
        </div>
      </div>
      <Modal />
    </div>
  );
}
