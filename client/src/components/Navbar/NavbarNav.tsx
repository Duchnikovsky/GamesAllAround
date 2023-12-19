import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ShoppingCart, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function NavbarNav() {
  const navigate = useNavigate();

  const { refetch, isSuccess } = useQuery({
    queryKey: ["auth-query"],
    queryFn: async () => {
      const url = `${import.meta.env.VITE_SERVER_URL}/auth/getAuth`;
      const { data } = await axios.get(url, { withCredentials: true });
      return data;
    },
    enabled: false,
    retry: false,
  });

  useEffect(() => {
    if (isSuccess) {
      navigate("/profile");
    }
  }, [isSuccess]);
  

  return (
    <div className="flex items-center gap-2">
      <Link
        to="/cart"
        className="w-16 sm:w-20 h-14 bg-zinc-50 rounded-md flex flex-col items-center justify-center cursor-pointer hover:box-outline-sm transition-all"
      >
        <ShoppingCart
          size={30}
          strokeWidth={1.25}
          className="hidden sm:block"
        />
        <ShoppingCart
          size={20}
          strokeWidth={1.25}
          className="block sm:hidden"
        />
        <div className="text-xs">Your cart</div>
      </Link>
      <div
        className="w-16 sm:w-20 h-14 bg-zinc-50 rounded-md flex flex-col items-center justify-center cursor-pointer hover:box-outline-sm transition-all"
        onClick={() => refetch()}
      >
        <User size={30} strokeWidth={1.25} className="hidden sm:block" />
        <User size={20} strokeWidth={1.25} className="block sm:hidden" />
        <div className="text-xs">Dashboard</div>
      </div>
    </div>
  );
}
