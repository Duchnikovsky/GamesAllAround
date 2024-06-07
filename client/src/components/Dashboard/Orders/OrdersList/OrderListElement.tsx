import { useContext, useState } from "react";
import { OrdersTypes, colorStatus } from "../../../../utils/orderValidators";
import { cn } from "../../../../utils/tailwindMerge";
import { SelectOrdersContext } from "./../OrdersDashboard";
import { useDispatch } from "react-redux";
import ListNavOption from "../../ListNavOption";
import { FaRegTrashAlt, FaUserEdit } from "react-icons/fa";
import { setModal } from "../../../../states/modal/modalSlice";
import { IoChevronDown } from "react-icons/io5";
import OrderElementDetails from "./OrderElementDetails";

interface OrderListElementProps {
  order: OrdersTypes;
}

export default function OrderListElement({ order }: OrderListElementProps) {
  const [showDetails, toggleDetails] = useState<boolean>(false);
  const select = useContext(SelectOrdersContext);
  const dispatch = useDispatch();
  let statusColor = colorStatus(order.status!);
  console.log(order);
  let date = new Date(order.createdAt);

  return (
    <div className="w-full flex flex-col border-b border-zinc-200/20">
      <div
        className={cn(
          "relative group w-full min-h-8 h-8 pr-4 flex items-center cursor-pointer",
          select.selectedOrders.includes(order.id!) && "bg-zinc-800/50"
        )}
        onClick={() => {
          if (select.selectedOrders.includes(order.id!)) {
            select.setSelectedOrders(
              select.selectedOrders.filter((id: string) => id !== order.id)
            );
          } else {
            select.setSelectedOrders([...select.selectedOrders, order.id!]);
          }
        }}
      >
        <div className="w-64 hidden sm:block md:w-[20rem] ml-2 text-crop">
          {order.id}
        </div>
        <div className="w-64 md:w-96 ml-4 text-crop">{order.customer}</div>
        <div
          className={cn(
            "w-24 ml-auto lg:m-0 text-right lg:text-left block md:block text-crop group-hover:hidden lg:group-hover:block",
            statusColor
          )}
        >
          {order.status}
        </div>
        <div className="w-32 hidden lg:block ml-auto text-right overflow-x-visible text-nowrap  text-crop group-hover:hidden">
          {date.toLocaleDateString()}
        </div>
        <div
          className="w-24 h-8 ml-auto bg-transparent hidden group-hover:flex justify-end"
          onClick={(e) => e.stopPropagation()}
        >
          <ListNavOption
            icon={<FaUserEdit size={18} />}
            subText="Edit status"
            variant="small"
            onClick={() =>
              dispatch(
                setModal({
                  isOpen: true,
                  modalType: "editOrder",
                  objectId: order.id,
                  optionalData: order.customer,
                })
              )
            }
          />
          <ListNavOption
            icon={<FaRegTrashAlt size={14} />}
            subText="Delete"
            variant="small"
            onClick={() =>
              dispatch(
                setModal({
                  isOpen: true,
                  modalType: "removeOrder",
                  objectId: order.id,
                  optionalData: order.customer,
                })
              )
            }
          />
          <ListNavOption
            icon={
              <IoChevronDown
                size={20}
                className={cn(
                  "transition-transform",
                  showDetails ? "rotate-0" : "rotate-180"
                )}
              />
            }
            subText="Details"
            variant="small"
            onClick={() => toggleDetails(!showDetails)}
          />
        </div>
      </div>
      <div
        className={cn(
          "flex flex-col h-0 overflow-y-auto no-scrollbar transition-resize duration-500",
          select.selectedOrders.includes(order.id!) && "bg-zinc-900/50"
        )}
        style={{
          height: showDetails ? order.products.length * 2 + 8 + "rem" : "0",
        }}
      >
        <OrderElementDetails order={order} />
      </div>
    </div>
  );
}
