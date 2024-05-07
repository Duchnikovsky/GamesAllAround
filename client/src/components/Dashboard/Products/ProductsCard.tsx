import { FormEvent, useRef, useState } from "react";
import { IoMdRefresh } from "react-icons/io";
import ProductsSearchbar from "./ProductsSearchbar";
import ProductsList from "./ProductsList";
import { Button } from "../../UI/Button";
import { useDispatch } from "react-redux";
import { setModal } from "../../../states/modal/modalSlice";

export default function ProductsCard() {
  const dispatch = useDispatch()
  const [value, setValue] = useState<string>("");
  const refetchRef = useRef<any>(null);

  return (
    <div className="w-full p-4 bg-modal flex flex-col gap-2 border border-zinc-200/20 rounded-lg sm:col-span-2">
      <div className="flex flex-row justify-between text-zinc-200 text-2xl">
        Products list
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
        <ProductsSearchbar value={value} setValue={setValue} />
      </form>
      <div className="w-full h-[32rem] flex flex-col overflow-y-auto thin-scrollbar">
        <div className="w-full h-8 mt-4 px-4 bg-zinc-900/90 flex flex-row items-center text-zinc-200/70">
          <div className="w-80">Name</div>
          <div className="w-72 hidden sm:block">Producent</div>
          <div className="w-28">Price</div>
          <div className="w-24 hidden sm:block">Stock</div>
          <div className="w-8 h-8 ml-auto"></div>
        </div>
        <ProductsList value={value} ref={refetchRef} />
        <Button
          className="mt-auto ml-auto w-48 h-10"
          onClick={() =>
            dispatch(setModal({ isOpen: true, modalType: "addProduct" }))
          }
        >
          Add Product
        </Button>
      </div>
    </div>
  );
}
