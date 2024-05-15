import { IoMdRefresh } from "react-icons/io";
import OrdersSearchbar from "./OrdersSearchbar";
import { FormEvent, useRef, useState } from "react";
import OrdersList from "./OrdersList";

export default function OrdersListCard() {
  const [value, setValue] = useState<string>("");
  const refetchRef = useRef<any>(null);

  return (
    <div className="w-full p-4 bg-modal flex flex-col gap-2 border border-zinc-200/20 rounded-lg sm:col-span-2 row-span-2">
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
        <OrdersList value={value} ref={refetchRef} />
      </div>
    </div>
  );
}
