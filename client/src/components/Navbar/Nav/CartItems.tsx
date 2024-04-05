import { useEffect } from "react";
import useSession from "../../../hooks/Session";
import { useSelector } from "react-redux";
import { RootState } from "../../../states/store";
import useCart from "../../../hooks/Cart";
import { DropdownContent } from "../../Dropdown/DropdownContent";
import { TbLoader3 } from "react-icons/tb";
import { DropdownItem } from "../../Dropdown/DropdownItem";
import { useNavigate } from "react-router";
import { DropdownSeparator } from "../../Dropdown/DropdownSeparator";

export default function CartItems() {
  const session = useSession();
  const cart = useSelector((state: RootState) => state.cart.cart);
  const navigate = useNavigate();

  const { fetchCartData, isFetchingCart } = useCart();

  useEffect(() => {
    if (session.session.authenticated) fetchCartData();
  }, []);

  if (isFetchingCart)
    return (
      <DropdownContent>
        <TbLoader3 size={24} className="animate-spin" />
      </DropdownContent>
    );

  return (
    <>
      {cart.length === 0 ? (
        <DropdownContent>Your cart is empty</DropdownContent>
      ) : (
        <div className="w-full max-h-80 overflow-y-scroll no-scrollbar">
          {cart.map((item) => (
            <DropdownItem
              key={item.id}
              onClick={() =>
                navigate(
                  "/product/" +
                    encodeURIComponent(item.name.toString().replace(/ /g, "_"))
                )
              }
            >
              <div>{item.name}</div>
              <div className="text-sm">
                {item.quantity} x {item.price} PLN
              </div>
            </DropdownItem>
          ))}
          <DropdownSeparator />
        </div>
      )}
    </>
  );
}
