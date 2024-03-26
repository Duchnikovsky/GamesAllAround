import { DropdownRoot } from "../../Dropdown/DropdownRoot";
import { DropdownContent } from "../../Dropdown/DropdownContent";
import { DropdownSeparator } from "../../Dropdown/DropdownSeparator";
import { DropdownItem } from "../../Dropdown/DropdownItem";
import { useDispatch } from "react-redux";
import { FaUser, FaUserCircle, FaUserPlus } from "react-icons/fa";
import { setModal } from "../../../states/modal/modalSlice";

export default function AuthNav() {
  const dispatch = useDispatch();
  
  return (
    <DropdownRoot width={10} theme="dark" trigger={<FaUserCircle size={32}/>}>
      <DropdownContent>Welcome to Games All Around</DropdownContent>
      <DropdownSeparator />
      <DropdownItem
        onClick={() => {
          dispatch(setModal({ isOpen: true, modalType: "signIn" }));
        }}
      >
        <div>Sign In</div>
        <FaUser size={16} />
      </DropdownItem>
      <DropdownItem
        onClick={() => {
          dispatch(setModal({ isOpen: true, modalType: "signUp" }));
        }}
      >
        <div>Sign up</div>
        <FaUserPlus size={16} />
      </DropdownItem>
    </DropdownRoot>
  );
}
