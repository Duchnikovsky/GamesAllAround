import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FormEvent } from "react";
import BestsellersList from "./BestsellersList";

interface ProductsTypes {
  itemId: string;
  name: string;
  totalOrders: number;
}

async function fetchBestsellers() {
  const url = `${
    import.meta.env.VITE_SERVER_URL
  }/dashboard/products/getBestsellers`;
  const { data } = await axios.get(url, {
    withCredentials: true,
  });

  return data as ProductsTypes[];
}

export default function BestsellersCard() {
  const { data, refetch, isRefetching, isLoading } = useQuery({
    queryKey: ["dashboard-bestsellers-query"],
    queryFn: fetchBestsellers,
    enabled: true,
    retry: false,
    refetchOnWindowFocus: false,
  })

  const list = data || []

  return (
    <div className="w-full p-4 bg-modal flex flex-col border border-zinc-200/20 rounded-lg row-span-1 col-span-1">
      <div className="flex flex-row justify-between text-zinc-200 text-2xl">
        Bestsellers list
      </div>
      <form
        onSubmit={(e: FormEvent) => {
          e.preventDefault();
          refetch()
        }}
      ></form>
      <div className="w-full h-8 mt-4 px-4 bg-zinc-900/90 flex flex-row items-center text-zinc-200/70">
        <div className="w-8">#</div>
        <div className="w-64">Name</div>
        <div className="w-20">Sold</div>
      </div>
      <div className="w-full h-[32rem] flex flex-col overflow-y-auto thin-scrollbar">
        <BestsellersList products={list} isLoading={isLoading || isRefetching}/>
      </div>
    </div>
  );
}
