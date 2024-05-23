import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { IoMdRefresh } from "react-icons/io";
import CustomersList from "./CustomersList";
import { FaRegTrashAlt } from "react-icons/fa";
import ListNavOption from "../../ListNavOption";
import ListNavSearchbar from "../../ListNavSearchbar";
import { SelectCustomersContext } from "../CustomersDashboard";
import { cn } from "../../../../utils/tailwindMerge";
import { setModal } from "../../../../states/modal/modalSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function CustomersListCard() {
  const [value, setValue] = useState<string>("");
  const listRef = useRef<any>(null);
  const [listLength, setListLength] = useState<number>(0);
  const select = useContext(SelectCustomersContext);
  const [isAllSelected, setIsAllSelected] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsAllSelected(select.selectedCustomers.length === listLength);
  }, [listLength, select.selectedCustomers]);

  return (
    <div className="w-full p-4 bg-modal flex flex-col border border-zinc-200/20 rounded-lg sm:col-span-3">
      <div className="flex text-zinc-200 text-2xl">Customers list</div>
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
            placeholder="Search for customers..."
          />
        </form>
        <div className="flex ml-auto">
          <ListNavOption
            icon={<FaRegTrashAlt size={18} />}
            subText="Delete"
            onClick={() =>
              {if(select.selectedCustomers.length > 0) {
                dispatch(
                  setModal({
                    isOpen: true,
                    modalType: "removeCustomers",
                    objectId: select.selectedCustomers,
                  })
                )
              } else {
                toast.error("No customers selected")
              }}
            }
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
        <CustomersList
          value={value}
          ref={listRef}
          onListLengthChange={setListLength}
        />
      </div>
    </div>
  );
}
