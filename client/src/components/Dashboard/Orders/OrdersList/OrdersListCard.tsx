import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { SelectOrdersContext } from "../OrdersDashboard";
import ListNavOption from "../../ListNavOption";
import { cn } from "../../../../utils/tailwindMerge";
import ListNavSearchbar from "../../ListNavSearchbar";
import { FaRegTrashAlt, FaUserEdit } from "react-icons/fa";
import { setModal } from "../../../../states/modal/modalSlice";
import { toast } from "react-toastify";
import { IoMdRefresh } from "react-icons/io";
import OrdersList from "./OrdersList";

export default function OrdersListCard() {
  const [value, setValue] = useState<string>("");
  const listRef = useRef<any>(null);
  const [listLength, setListLength] = useState<number>(0);
  const select = useContext(SelectOrdersContext);
  const [isAllSelected, setIsAllSelected] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsAllSelected(select.selectedOrders.length === listLength);
  }, [listLength, select.selectedOrders]);

  return (
    <div className="w-full p-4 bg-modal flex flex-col border border-zinc-200/20 rounded-lg sm:col-span-3">
      <div className="flex text-zinc-200 text-2xl">Orders list</div>
      <div className="w-full h-10 flex justify-start mt-2">
        <ListNavOption
          icon={
            <div className="w-5 h-5 rounded-md border border-zinc-200/70 center">
              <div
                className={cn(
                  "w-3.5 h-3.5 rounded bg-zinc-200 opacity-0 transition-opacity duration-500",
                  isAllSelected && "opacity-100"
                )}
              ></div>
            </div>
          }
          subText="Select all"
          onClick={() => {
            if (listRef.current) {
              listRef.current.selectAllElements();
            }
          }}
        />
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
            placeholder="Search for orders..."
          />
        </form>
        <div className="flex ml-auto">
          <ListNavOption
            icon={<FaUserEdit size={20} />}
            subText="Edit status"
            onClick={() => {
              if (select.selectedOrders.length > 0) {
                dispatch(
                  setModal({
                    isOpen: true,
                    modalType: "editOrders",
                    objectId: select.selectedOrders,
                  })
                );
              } else {
                toast.error("No orders selected");
              }
            }}
          />
          <ListNavOption
            icon={<FaRegTrashAlt size={18} />}
            subText="Delete"
            onClick={() => {
              if (select.selectedOrders.length > 0) {
                dispatch(
                  setModal({
                    isOpen: true,
                    modalType: "removeOrders",
                    objectId: select.selectedOrders,
                  })
                );
              } else {
                toast.error("No orders selected");
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
        <OrdersList
          value={value}
          ref={listRef}
          onListLengthChange={setListLength}
        />
      </div>
    </div>
  );
}
