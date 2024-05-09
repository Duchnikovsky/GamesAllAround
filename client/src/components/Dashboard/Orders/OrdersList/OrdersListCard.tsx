import { IoMdRefresh } from "react-icons/io";
import OrdersSearchbar from "./OrdersSearchbar";
import { FormEvent, useRef, useState } from "react";
import OrdersList from "./OrdersList";

export default function OrdersListCard() {
  const [value, setValue] = useState<string>("");
  const refetchRef = useRef<any>(null);

  return (
    <div className="w-full p-4 bg-modal flex flex-col gap-2 border border-zinc-200/20 rounded-lg sm:col-span-2">
      <div className="flex flex-row justify-between text-zinc-200 text-2xl">
        Orders list
        <IoMdRefresh
          className="cursor-pointer hover:text-zinc-500 transition-colors hover:animate-spin"
          onClick={() => {
            if (refetchRef.current) {
              refetchRef.current.fetchList();
            }
          }}
        />
      </div>
      <form
        onSubmit={(e: FormEvent) => {
          e.preventDefault();
          if (refetchRef.current) {
            refetchRef.current.fetchList();
          }
        }}
      >
        <OrdersSearchbar value={value} setValue={setValue} />
      </form>
      <div className="w-full h-[32rem] flex flex-col overflow-y-auto thin-scrollbar">
        <div className="w-full h-8 mt-4 px-4 bg-zinc-900/90 flex flex-row items-center text-zinc-200/70">
          <div className="w-72 sm:w-[16rem]">ID</div>
          <div className="w-4"></div>
          <div className="w-72 hidden sm:block">Customer</div>
          <div className="w-28 hidden sm:block">Cost</div>
          <div className="w-24">Status</div>
          <div className="w-8 h-8 ml-auto"></div>
        </div>
        <OrdersList value={value} ref={refetchRef}/>
      </div>
    </div>
  );
}
