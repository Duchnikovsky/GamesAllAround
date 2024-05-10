import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { forwardRef, useContext, useImperativeHandle } from "react";
import { TbLoader3 } from "react-icons/tb";
import { OrdersTypes } from "../../../../utils/orderValidators";
import OrderListElement from "./OrderListElement";
import { SelectOrdersContext } from "./OrdersListCard";
import { cn } from "../../../../utils/tailwindMerge";

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
  const selectedOrders = useContext(SelectOrdersContext);

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
      <div className="w-full h-8 pr-4 bg-zinc-900/90 flex flex-row items-center text-zinc-200/70">
        <div className="w-8 h-8 flex items-center justify-center">
          <div
            className={cn(
              "w-4 h-4 border border border-zinc-200 rounded cursor-pointer",
              selectedOrders.selectedOrders.length === list.length
                ? "bg-zinc-300"
                : ""
            )}
            onClick={() => {
              if (selectedOrders.selectedOrders.length === list.length) {
                selectedOrders.setSelectedOrders([]);
              } else {
                selectedOrders.setSelectedOrders(
                  list.map((order) => order.id!)
                );
              }
            }}
          ></div>
        </div>
        <div className="w-64 sm:w-[16rem] ml-2">ID</div>
        <div className="w-64 hidden sm:block ml-4">Customer</div>
        <div className="w-36 ml-4">Status</div>
        <div className="w-8 h-8 ml-auto"></div>
      </div>
      {list.flatMap((order: OrdersTypes) => {
        return (
          <div
            key={order.id}
            className="w-full h-min-8 odd:bg-zinc-900/40 even:bg-zinc-800/40 flex flex-col text-zinc-200"
          >
            <OrderListElement order={order!} />
          </div>
        );
      })}
    </>
  );
});

export default OrdersList;
