import { FormEvent, useContext, useRef, useState } from "react";
import { IoMdRefresh } from "react-icons/io";
import ProductsList from "./ProductsList";
import { useDispatch } from "react-redux";
import { setModal } from "../../../../states/modal/modalSlice";
import ListNavOption from "../../ListNavOption";
import ListNavSearchbar from "../../ListNavSearchbar";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { SelectProductsContext } from "../ProductsDashboard";
import { toast } from "react-toastify";

export default function ProductsCard() {
  const dispatch = useDispatch();
  const [value, setValue] = useState<string>("");
  const listRef = useRef<any>(null);
  const select = useContext(SelectProductsContext);

  return (
    <div className="w-full p-4 bg-modal flex flex-col gap-2 border border-zinc-200/20 rounded-lg sm:col-span-2">
      <div className="flex text-zinc-200 text-2xl">Products list</div>
      <div className="w-full h-10 flex justify-start mt-2">
        <form
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
            if (listRef.current) {
              listRef.current.fetchList();
            }
          }}
        >
          <ListNavSearchbar
            value={value}
            setValue={setValue}
            placeholder="Search for products..."
          />
        </form>
        <div className="flex ml-auto">
          <ListNavOption
            icon={<FaRegEdit size={20} />}
            subText="Add product"
            onClick={() =>
              dispatch(setModal({ isOpen: true, modalType: "addProduct" }))
            }
          />
          <ListNavOption
            icon={<FaRegTrashAlt size={18} />}
            subText="Delete"
            onClick={() => {
              if (select.selectedProducts.length > 0) {
                dispatch(
                  setModal({
                    isOpen: true,
                    modalType: "removeProducts",
                    objectId: select.selectedProducts,
                  })
                );
              } else {
                toast.error("No products selected");
              }
            }}
          />
          <div className="mx-2 my-auto h-8 w-[1px] bg-zinc-400/30"></div>
          <ListNavOption
            icon={<IoMdRefresh size={24} />}
            subText="Refresh"
            onClick={() => {
              if (listRef.current) {
                listRef.current.fetchList();
              }
            }}
          />
        </div>
      </div>
      <div className="w-full h-[32rem] flex flex-col overflow-y-auto overflow-x-hidden thin-scrollbar">
        <ProductsList value={value} ref={listRef} />
      </div>
    </div>
  );
}
