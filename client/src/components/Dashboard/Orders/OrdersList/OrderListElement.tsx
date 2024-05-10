import { useContext, useState } from "react";
import { OrdersTypes, colorStatus } from "../../../../utils/orderValidators";
import { cn } from "../../../../utils/tailwindMerge";
import { TbChevronDown } from "react-icons/tb";
import OrderElementDetails from "./OrderElementDetails";
import { SelectOrdersContext } from "./OrdersListCard";

interface OrderListElementProps {
  order: OrdersTypes;
}

export default function OrderListElement({ order }: OrderListElementProps) {
  let statusColor = colorStatus(order.status!);
  const [expandOrder, setExpandOrder] = useState<boolean>(false);
  const selectedOrders = useContext(SelectOrdersContext);

  return (
    <div className="w-full h-min-8 flex flex-col">
      <div className="w-full h-min-8 pr-4 flex items-center">
        <div className="w-8 h-8 flex items-center justify-center">
          <div
            className={cn(
              "w-4 h-4 border border-zinc-200 rounded cursor-pointer",
              selectedOrders.selectedOrders.includes(order.id) && "bg-zinc-300"
            )}
            onClick={() => {
              if (selectedOrders.selectedOrders.includes(order.id!)) {
                selectedOrders.setSelectedOrders(
                  selectedOrders.selectedOrders.filter((id) => id !== order.id)
                );
              } else {
                selectedOrders.setSelectedOrders([
                  ...selectedOrders.selectedOrders,
                  order.id!,
                ]);
              }
            }}
          ></div>
        </div>
        <div className="w-64 sm:w-[16rem] ml-2 overflow-x-auto no-scrollbar whitespace-nowrap">
          {order.id}
        </div>
        <div className="w-64 hidden sm:block ml-4 overflow-x-auto no-scrollbar whitespace-nowrap">
          {order.customer}
        </div>
        <div
          className={cn(
            "w-36 ml-4 overflow-x-auto no-scrollbar whitespace-nowrap",
            statusColor
          )}
        >
          {order.status}
        </div>
        <div className="w-8 h-8 ml-auto flex items-center justify-center">
          <TbChevronDown
            size={24}
            onClick={() => {
              setExpandOrder(!expandOrder);
            }}
            className={cn(
              "transition-transform cursor-pointer hover:text-zinc-500",
              expandOrder ? "rotate-0" : "rotate-180"
            )}
          />
        </div>
      </div>
      <div
        className={cn(
          "flex flex-col h-0 overflow-y-auto no-scrollbar transition-all"
        )}
        style={{
          height: expandOrder ? order.products.length * 2 + 8 + "rem" : "0",
        }}
      >
        <OrderElementDetails order={order} />
      </div>
    </div>
  );
}
