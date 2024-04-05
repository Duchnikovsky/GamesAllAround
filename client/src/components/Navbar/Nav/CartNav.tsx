import { DropdownRoot } from "../../Dropdown/DropdownRoot";
import { DropdownContent } from "../../Dropdown/DropdownContent";
import { DropdownSeparator } from "../../Dropdown/DropdownSeparator";
import { DropdownItem } from "../../Dropdown/DropdownItem";
import { BsCart4 } from "react-icons/bs";
import CartItems from "./CartItems";

export default function CartNav() {
  return (
    <DropdownRoot width={14} theme="dark" trigger={<BsCart4 size={32} />}>
      <DropdownContent>Your cart</DropdownContent>
      <DropdownSeparator />
        <CartItems />
      <DropdownItem>
        <div>Cart page</div>
        <BsCart4 size={16} strokeWidth={0.1} />
      </DropdownItem>
    </DropdownRoot>
  );
}
