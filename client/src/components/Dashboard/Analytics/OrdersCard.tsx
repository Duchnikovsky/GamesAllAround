import { IoMdRefresh } from "react-icons/io";
import { IoArrowUpCircleOutline } from "react-icons/io5";
import { cn } from "../../../utils/tailwindMerge";
import { useQuery } from "@tanstack/react-query";
import { TbLoader3 } from "react-icons/tb";
import axios from "axios";
import OrdersCharts from "./OrdersCharts";

interface OrdersTypes {
  name: string;
  endDate: Date;
  orders: number;
  gamesCount: number;
  dlcsCount: number;
  othersCount: number;
}

async function fetchOrders() {
  const url = `${
    import.meta.env.VITE_SERVER_URL
  }/dashboard/analytics/getOrders`;
  const { data } = await axios.get(url, {
    withCredentials: true,
  });

  return data as OrdersTypes[];
}

export default function OrdersCard() {
  const { data, refetch, isLoading, isRefetching } = useQuery({
    queryKey: ["analytics-orders-query"],
    queryFn: fetchOrders,
    enabled: true,
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading || isRefetching) {
    return (
      <div className="w-full h-full flex justify-center">
        <TbLoader3
          size={32}
          strokeWidth={1}
          className="animate-spin text-zinc-200"
        />
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col text-zinc-200 gap-2">
      <div className="flex flex-row justify-between text-zinc-200 text-2xl mb-6">
        Orders
        <IoMdRefresh
          className="cursor-pointer hover:text-zinc-500 transition-colors hover:animate-spin"
          onClick={() => refetch()}
        />
      </div>
      <div>
        <div className="text-3xl">
          {data![0].orders} <span className="text-base">Orders</span>
        </div>
        <div className="font-light text-zinc-200/60">Last week</div>
        <div className="flex flex-row gap-2 text-base items-center">
          <IoArrowUpCircleOutline
            className={cn(
              data![0].orders > data![1].orders
                ? "text-green-500"
                : "text-red-500 rotate-180"
            )}
          />{" "}
          <div>
            <span
              className={cn(
                data![0].orders > data![1].orders
                  ? "text-green-500"
                  : "text-red-500 rotate-180"
              )}
            >
              {data![0].orders - data![1].orders}{" "}
            </span>
            vs previous week
          </div>
        </div>
      </div>
      <div>
        <div className="text-2xl mb-2">Orders charts</div>
        <OrdersCharts orders={data!} />
      </div>
    </div>
  );
}
