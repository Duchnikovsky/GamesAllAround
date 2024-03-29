import { DropdownRoot } from "../../Dropdown/DropdownRoot";
import { DropdownContent } from "../../Dropdown/DropdownContent";
import { DropdownSeparator } from "../../Dropdown/DropdownSeparator";
import { DropdownItem } from "../../Dropdown/DropdownItem";
import { FaUser, FaUserCircle } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useSession from "../../../hooks/Session";
import { toast } from "react-toastify";

export default function ProfileNav() {
  const navigate = useNavigate();
  const { refetch } = useSession();

  function onQuerySuccess() {
    refetch();
    toast.success("Signed out successfully");
  }

  const {
    refetch: signOut,
  } = useQuery({
    queryKey: ["sign-out"],
    queryFn: async () => {
      const url = `${import.meta.env.VITE_SERVER_URL}/auth/signOut`;
      const { data } = await axios.get(url, { withCredentials: true });
      onQuerySuccess();
      return data;
    },
    enabled: false,
    retry: false,
  });

  return (
    <DropdownRoot width={12} theme="dark" trigger={<FaUserCircle size={32} />}>
      <DropdownContent>Username</DropdownContent>
      <DropdownSeparator />
      <DropdownItem onClick={() => navigate("/profile")}>
        <div>My Profile</div>
        <FaUser size={16} />
      </DropdownItem>
      <DropdownItem onClick={() => signOut()}>
        <div>Sign Out</div>
        <CiLogout size={16} strokeWidth={2} />
      </DropdownItem>
    </DropdownRoot>
  );
}
