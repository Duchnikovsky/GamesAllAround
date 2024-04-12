import { NavLink, useLocation } from "react-router-dom";
import { cn } from "../../utils/tailwindMerge";

interface NavOptionsTypes {
  id: number;
  name: string;
  path: string;
}

const NavOptions: NavOptionsTypes[] = [
  {
    id: 1,
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    id: 2,
    name: "Products",
    path: "/dashboard/products",
  },
  {
    id: 3,
    name: "Orders",
    path: "/dashboard/orders",
  },
  {
    id: 4,
    name: "Customers",
    path: "/dashboard/customers",
  },
];

export default function DashboardNav() {
  const pathname = useLocation().pathname;

  return (
    <div className="fixed top-0 w-full inset-x-0 z-[10] px-4">
      <div className="max-w-6xl w-fit mx-auto mt-2 px-3 py-3 bg-zinc-900/60 grid grid-cols-2 sm:flex items-center justify-center gap-2 rounded-2xl border border-px border-zinc-200/20">
        {NavOptions.map((option: NavOptionsTypes) => (
          <NavLink
            to={option.path}
            key={option.id}
            className={cn(
              "px-3 py-1 flex items-center justify-center rounded-md text-center text-zinc-200 text-lg transition-all duration-300 hover:bg-zinc-700/70",
              pathname === option.path
                ? "bg-zinc-700/70 hover:cursor-default"
                : "bg-transparent hover:cursor-pointer"
            )}
          >
            {option.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
