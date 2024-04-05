import { DropdownRoot } from "../../Dropdown/DropdownRoot";
import { DropdownContent } from "../../Dropdown/DropdownContent";
import { DropdownSeparator } from "../../Dropdown/DropdownSeparator";
import { DropdownItem } from "../../Dropdown/DropdownItem";
import { FaUser, FaUserCircle } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router";
import useAuth from "../../../hooks/Auth";
import { Session } from "../../../hooks/Session";
import { MdOutlineManageSearch } from "react-icons/md";

interface ProfileNavProps {
  session: Session;
}

export default function ProfileNav({ session }: ProfileNavProps) {
  const navigate = useNavigate();

  const { signOut } = useAuth({ values: {} });

  return (
    <DropdownRoot width={12} theme="dark" trigger={<FaUserCircle size={32} />}>
      <DropdownContent>Username</DropdownContent>
      <DropdownSeparator />
      <DropdownItem onClick={() => navigate("/profile")}>
        <div>My Profile</div>
        <FaUser size={16} />
      </DropdownItem>
      {session.authenticated &&
        (session.role === "ADMIN" || session.role === "MODERATOR") && (
          <DropdownItem onClick={() => navigate("/dashboard")}>
            <div>Dashboard</div>
            <MdOutlineManageSearch size={16} />
          </DropdownItem>
        )}
      <DropdownItem onClick={() => signOut()}>
        <div>Sign Out</div>
        <CiLogout size={16} strokeWidth={2} />
      </DropdownItem>
    </DropdownRoot>
  );
}
