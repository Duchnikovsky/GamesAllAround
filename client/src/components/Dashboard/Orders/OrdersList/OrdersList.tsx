import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { forwardRef, useContext, useEffect, useImperativeHandle } from "react";
import { TbLoader3 } from "react-icons/tb";
import { OrdersTypes } from "../../../../utils/orderValidators";
import OrderListElement from "./OrderListElement";
import { SelectOrdersContext } from "./../OrdersDashboard";

async function fetchOrders(value: string) {
  const url = `${
    import.meta.env.VITE_SERVER_URL
  }/orders/getOrders?value=${value}`;
  const { data } = await axios.get(url, {
    withCredentials: true,
  });

  return data as OrdersTypes[];
}

const OrdersList = forwardRef(
  (
    {
      value,
      onListLengthChange,
    }: { value: string; onListLengthChange: (length: number) => void },
    ref
  ) => {
    const select = useContext(SelectOrdersContext);

    const { data, refetch, isRefetching, isLoading } = useQuery({
      queryKey: ["dashboard-orders-query"],
      queryFn: () => fetchOrders(value),
      enabled: true,
      retry: false,
      refetchOnWindowFocus: false,
    });

    function selectAllElements() {
      if (select.selectedOrders.length === list.length) {
        select.setSelectedOrders([]);
      } else {
        select.setSelectedOrders(list.map((order: OrdersTypes) => order.id!));
      }
    }

    const list = data || [];

    useImperativeHandle(ref, () => ({
      fetchList: refetch,
      selectAllElements,
    }));

    useEffect(() => {
      onListLengthChange(list.length);
    }, [list]);

    return (
      <>
        <div className="w-full min-h-8 h-8 pr-4 bg-zinc-900/80 flex flex-row items-center text-zinc-200/70">
          <div className="w-64 hidden sm:block md:w-[20rem] ml-2">ID</div>
          <div className="w-64 md:w-96 ml-4">Customer</div>
          <div className="w-24 ml-auto lg:m-0 text-right lg:text-left block md:block">
            Status
          </div>
          <div className="w-32 hidden lg:block ml-auto text-right overflow-x-visible text-nowrap">
            Created at
          </div>
        </div>
        {isLoading || isRefetching ? (
          <div className="w-full h-full center">
            <TbLoader3
              size={32}
              strokeWidth={1}
              className="animate-spin text-zinc-200"
            />
          </div>
        ) : (
          <>
            {list.map((order: OrdersTypes) => (
              <div
                key={order.id}
                className="w-full h-min-8 flex flex-col text-zinc-200"
              >
                <OrderListElement order={order!} />
              </div>
            ))}
          </>
        )}
      </>
    );
  }
);

export default OrdersList;
