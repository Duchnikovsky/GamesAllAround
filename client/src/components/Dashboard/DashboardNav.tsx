import { BookOpenCheck, Briefcase, ClipboardList, FolderOpen, MapPin, Package, Settings, Users } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

interface PagesTypes {
  id: number;
  name: string;
  icon: React.ReactNode;
  route: string;
  access: string;
}

export default function DashboardNav() {
  const location = useLocation();
  const realLocation = location.pathname.split("/")[2];

  const pages: PagesTypes[] = [
    {
      id: 1,
      name: "Account settings",
      icon: <Settings size={24} strokeWidth={1.5} />,
      route: "account",
      access: "user",
    },
    {
      id: 2,
      name: "Your address",
      icon: <MapPin size={24} strokeWidth={1.5} />,
      route: "address",
      access: "user",
    },
    {
      id: 3,
      name: "Your orders",
      icon: <ClipboardList size={24} strokeWidth={1.5} />,
      route: "orders",
      access: "user",
    },
    {
      id: 4,
      name: "Your opinions",
      icon: <BookOpenCheck size={24} strokeWidth={1.5} />,
      route: "opinions",
      access: "user",
    },
    {
      id: 5,
      name: "Products",
      icon: <Package size={24} strokeWidth={1.5} />,
      route: "products",
      access: "admin",
    },
    {
      id: 6,
      name: "Categories",
      icon: <FolderOpen size={24} strokeWidth={1.5} />,
      route: "categories",
      access: "admin",
    },
    {
      id: 7,
      name: "Producents",
      icon: <Briefcase size={24} strokeWidth={1.5} />,
      route: "producents",
      access: "admin",
    },
    {
      id: 8,
      name: "Users",
      icon: <Users size={24} strokeWidth={1.5} />,
      route: "users",
      access: "admin",
    },
  ];

  return (
    <div className="absolute top-0 left-0 w-72 h-screen flex flex-col">
      {pages.map((page: PagesTypes) => (
        <NavLink
          className={`w-full h-14 flex items-center px-4 gap-4 text-sm font-semibold text-gray-500 cursor-pointer ${realLocation === page.route ? "bg-zinc-200/50" : "bg-zinc-50"} transition-colors`}
          key={page.id}
          to={page.route}
        >
          <div
            className={`${
              realLocation === page.route ? "text-black" : "text-gray-500"
            } transition-colors`}
          >
            {page.icon}
          </div>
          <div
            className={`${
              realLocation === page.route
                ? "text-black font-bold"
                : "text-gray-500 font-semibold"
            } transition-colors`}
          >
            {page.name}
          </div>
        </NavLink>
      ))}
    </div>
  );
}
