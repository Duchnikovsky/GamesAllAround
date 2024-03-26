import { DropdownRoot } from "../../Dropdown/DropdownRoot";
import { DropdownContent } from "../../Dropdown/DropdownContent";
import { DropdownSeparator } from "../../Dropdown/DropdownSeparator";
import { DropdownItem } from "../../Dropdown/DropdownItem";
import { FaUser, FaUserCircle } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router";

export default function ProfileNav() {
  const navigate = useNavigate();

  function logout() {
    // Logout logic
  }

  return (
    <DropdownRoot width={12} theme="dark" trigger={<FaUserCircle size={32} />}>
      <DropdownContent>Username</DropdownContent>
      <DropdownSeparator />
      <DropdownItem onClick={() => navigate("/profile")}>
        <div>My Profile</div>
        <FaUser size={16} />
      </DropdownItem>
      <DropdownItem onClick={() => logout()}>
        <div>Sign Out</div>
        <CiLogout size={16} strokeWidth={2} />
      </DropdownItem>
    </DropdownRoot>
  );
}
