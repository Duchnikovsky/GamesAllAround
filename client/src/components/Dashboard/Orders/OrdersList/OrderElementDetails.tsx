import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";
import {
  OrderedItemsTypes,
  OrdersTypes,
  colorStatus,
} from "../../../../utils/orderValidators";
import { cn } from "../../../../utils/tailwindMerge";

interface OrderElementDetailsProps {
  order: OrdersTypes;
}

export default function OrderElementDetails({
  order,
}: OrderElementDetailsProps) {
  let statusColor = colorStatus(order.status!);

  return (
    <div>
      <div className="w-full h-6 px-4 flex items-center text-zinc-200/70 text-sm">
        <div className="w-72 hidden sm:block sm:w-[20rem] overflow-x-auto no-scrollbar whitespace-nowrap">
          Order ID
        </div>
        <div className="w-72 ml-auto text-right overflow-x-auto no-scrollbar whitespace-nowrap">
          Customer
        </div>
      </div>
      <div className="w-full h-6 px-4 flex items-center text-zinc-200">
        <div className="w-72 hidden sm:block sm:w-[20rem] overflow-x-auto no-scrollbar whitespace-nowrap">
          {order.id}
        </div>
        <div className="w-72 ml-auto text-right overflow-x-auto no-scrollbar whitespace-nowrap">
          {order.customer}
        </div>
      </div>
      <div className="w-full h-6 px-4 flex items-center text-zinc-200/70 text-sm">
        <div className="w-72 hidden sm:block sm:w-[20rem] overflow-x-auto no-scrollbar whitespace-nowrap">
          Status of order
        </div>
        <div className="w-72 ml-auto text-right overflow-x-auto no-scrollbar whitespace-nowrap">
          Total price
        </div>
      </div>
      <div className="w-full h-6 px-4 flex items-center text-zinc-200">
        <div
          className={cn(
            "w-72 sm:w-[20rem] hidden sm:block overflow-x-auto no-scrollbar whitespace-nowrap",
            statusColor
          )}
        >
          {order.status}
        </div>
        <div className="w-72 ml-auto text-right overflow-x-auto no-scrollbar whitespace-nowrap">
          {order.cost}
        </div>
      </div>
      <div className="w-full h-min-8 h-8 px-4 flex items-center bg-zinc-800 text-zinc-200/70">
      <div className="relative sm:w-8 w-12 h-8 flex items-center"></div>
        <div className="w-72 sm:w-[16rem] overflow-x-auto no-scrollbar whitespace-nowrap">
          Item ID
        </div>
        <div className="w-72 ml-auto text-right overflow-x-auto no-scrollbar whitespace-nowrap">
          Quantity x Item name
        </div>
      </div>
      {order.products.map((product: OrderedItemsTypes, index: number) => (
        <div className="w-full h-min-8 px-4 flex items-center">
          <div className="relative sm:w-8 w-12 h-8 flex items-center">
            {index + 1 === order.products.length ? (
              <div>
                <div className="absolute top-0 bg-zinc-300 h-4 w-[2px] ml-1"></div>
                <MdOutlineSubdirectoryArrowRight size={24} className="mb-2" />
              </div>
            ) : (
              <div className="bg-zinc-300 h-8 w-[2px] ml-1"></div>
            )}
          </div>
          <div className="w-72 sm:w-[22.5rem] overflow-x-auto no-scrollbar whitespace-nowrap">
            {product.id}
          </div>
          <div className="w-72 ml-auto text-right overflow-x-auto no-scrollbar whitespace-nowrap">
            {product.quantity} x {product.name}
          </div>
        </div>
      ))}
    </div>
  );
}
