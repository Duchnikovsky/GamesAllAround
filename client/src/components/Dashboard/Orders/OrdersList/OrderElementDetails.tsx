import {
  OrderedItemsTypes,
  OrdersTypes,
  colorStatus,
} from "../../../../utils/orderValidators";
import { cn } from "../../../../utils/tailwindMerge";

interface OrdersArrayTypes {
  label: string;
  value: string;
}

export default function OrderElementDetails({ order }: { order: OrdersTypes }) {
  let statusColor = colorStatus(order.status!);

  const orderDetails: OrdersArrayTypes[] = Object.entries(order)
    .filter(([key]) => key !== "products" && key !== "createdAt")
    .map(([key, value]) => ({
      label: key.substring(0, 1).toUpperCase() + key.substring(1),
      value: value,
    }));

  return (
    <div className=" grid grid-cols-2">
      {orderDetails.map((item: OrdersArrayTypes) => (
        <div className="flex flex-col h-12 odd:text-left odd:pl-4 sm:odd:pl-2 even:pr-4 even:text-right">
          <span className="text-sm text-zinc-400">{item.label}</span>
          <span
            className={cn("text-crop", item.label === "Status" && statusColor)}
          >
            {item.value}
          </span>
        </div>
      ))}
      <div className="col-span-2 h-min-8 h-8 flex items-center bg-zinc-950/60 pr-4 text-zinc-200/70">
        <div className="w-64 ml-2 hidden sm:block md:w-[24rem]">Item ID</div>
        <div className="w-96 ml-4">Item name</div>
        <div className="w-12 hidden lg:block ml-4 overflow-x-visible text-nowrap">
          Quantity
        </div>
        <div className="w-32 ml-auto text-right block sm:hidden md:block">
          Price
        </div>
      </div>
      <div className="col-span-2 flex flex-col">
        {order.products.map((product: OrderedItemsTypes) => (
          <div key={product.id} className="h-min-8 h-8 pr-4 flex items-center">
            <div className="w-64 ml-2 hidden sm:block md:w-[24rem]">
              {product.id}
            </div>
            <div className="w-96 ml-4">{product.name}</div>
            <div className="w-12 hidden lg:block ml-4 overflow-x-visible text-nowrap">
              {product.quantity}
            </div>
            <div className="w-32 ml-auto text-right block sm:hidden md:block">
              {product.price}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
