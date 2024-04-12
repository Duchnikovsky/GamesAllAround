import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IoMdRefresh } from "react-icons/io";
import { IoArrowUpCircleOutline } from "react-icons/io5";
import { TbLoader3 } from "react-icons/tb";
import { cn } from "../../../utils/tailwindMerge";
import SalesCharts from "./SalesCharts";

interface SalesTypes {
  name: string;
  endDate: Date;
  sales: number;
}

async function fetchSales() {
  const url = `${import.meta.env.VITE_SERVER_URL}/dashboard/analytics/getSales`;
  const { data } = await axios.get(url, {
    withCredentials: true,
  });

  return data as SalesTypes[];
}

export default function SalesCard() {
  const { data, refetch, isLoading, isRefetching } = useQuery({
    queryKey: ["sales-query"],
    queryFn: fetchSales,
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
        Total sales
        <IoMdRefresh
          className="cursor-pointer hover:text-zinc-500 transition-colors hover:animate-spin"
          onClick={() => refetch()}
        />
      </div>
      <div>
        <div className="text-3xl">
          {data![0].sales} <span className="text-base">PLN</span>
        </div>
        <div className="font-light text-zinc-200/60">Last week</div>
        <div className="flex flex-row gap-2 text-base items-center">
          <IoArrowUpCircleOutline
            className={cn(
              data![0].sales > data![1].sales
                ? "text-green-500"
                : "text-red-500 rotate-180"
            )}
          />{" "}
          <div>
            <span
              className={cn(
                data![0].sales > data![1].sales
                  ? "text-green-500"
                  : "text-red-500 rotate-180"
              )}
            >
              199 PLN{" "}
            </span>
            vs previous week
          </div>
        </div>
      </div>
      <div>
        <div className="text-2xl mb-2">Sales charts</div>
        <SalesCharts sales={data!} />
      </div>
    </div>
  );
}
