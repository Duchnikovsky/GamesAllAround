import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { forwardRef, useImperativeHandle, useState } from "react";
import { TbChevronDown, TbLoader3 } from "react-icons/tb";
import {
  OrderedItemsTypes,
  OrdersTypes,
  colorStatus,
} from "../../../../utils/orderValidators";
import { cn } from "../../../../utils/tailwindMerge";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";

enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

async function fetchOrders(value: string) {
  const url = `${
    import.meta.env.VITE_SERVER_URL
  }/orders/getOrders?value=${value}`;
  const { data } = await axios.get(url, {
    withCredentials: true,
  });

  return data as OrdersTypes[];
}


const OrdersList = forwardRef(({ value }: { value: string }, ref) => {
  const [expandOrder, setExpandOrder] = useState<string>("");

  const { data, refetch, isRefetching, isLoading } = useQuery({
    queryKey: ["dashboard-orders-query"],
    queryFn: () => fetchOrders(value),
    enabled: true,
    retry: false,
    refetchOnWindowFocus: false,
  });
  
  const list = data || [];

  useImperativeHandle(ref, () => ({
    fetchList: refetch,
  }));

  if (isLoading || isRefetching)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <TbLoader3
          size={32}
          strokeWidth={1}
          className="animate-spin text-zinc-200"
        />
      </div>
    );

  return (
    <>
      {list.flatMap((order: OrdersTypes) => {
        let statusColor = colorStatus(order.status);

        return (
          <div
            key={order.id}
            className="w-full h-min-8 odd:bg-zinc-900/40 even:bg-zinc-800/40 flex flex-col text-zinc-200"
          >
            <div className="w-full h-min-8 px-4 flex items-center">
              <div className="w-72 sm:w-[16rem] overflow-x-auto no-scrollbar whitespace-nowrap ">
                {order.id}
              </div>
              <div className="w-4"></div>
              <div className="w-72 hidden sm:block text-left overflow-x-auto no-scrollbar whitespace-nowrap">{order.customer}</div>
              <div className="w-28 hidden sm:block">{order.cost}</div>
              <div className={cn("w-24 overflow-x-auto no-scrollbar whitespace-nowrap", statusColor)}>{order.status}</div>
              <div className="w-8 h-8 ml-auto flex items-center justify-center cursor-pointer hover:text-zinc-500 transition-colors duration-200">
                <TbChevronDown
                  size={24}
                  onClick={() => {
                    if (expandOrder === order.id) {
                      setExpandOrder("");
                    } else {
                      setExpandOrder(order.id);
                    }
                  }}
                  className={cn(
                    "transition-transform",
                    expandOrder === order.id ? "rotate-0" : "rotate-180"
                  )}
                />
              </div>
            </div>
            <div
              className={cn(
                "flex flex-col h-0 overflow-y-auto no-scrollbar transition-all"
              )}
              style={{
                height:
                  expandOrder === order.id
                    ? order.products.length * 2 + 2 + "rem"
                    : "0",
              }}
            >
              <div className="w-full h-min-8 px-4 flex items-center bg-zinc-950/60 text-zinc-200/70">
                <div className="relative sm:w-8 w-12 h-8 flex items-center">
                  <div className="bg-zinc-300 h-8 w-[2px] ml-1"></div>
                </div>
                <div className="w-72 sm:w-[16rem] overflow-x-auto no-scrollbar whitespace-nowrap">
                  Item ID
                </div>
                <div className="w-72 ml-auto text-right overflow-x-auto no-scrollbar whitespace-nowrap">
                  Item name
                </div>
              </div>
              {order.products.map(
                (product: OrderedItemsTypes, index: number) => (
                  <div className="w-full h-min-8 px-4 flex items-center bg-zinc-950/60">
                    <div className="relative sm:w-8 w-12 h-8 flex items-center">
                      {index + 1 === order.products.length ? (
                        <div>
                          <div className="absolute top-0 bg-zinc-300 h-4 w-[2px] ml-1"></div>
                          <MdOutlineSubdirectoryArrowRight
                            size={24}
                            className="mb-2"
                          />
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
                )
              )}
            </div>
          </div>
        );
      })}
    </>
  );
});

export default OrdersList;
