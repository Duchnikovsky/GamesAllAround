import { useContext } from "react";
import { SelectOrdersContext } from "../OrdersDashboard";
import ChangeStatusButton from "./ChangeStatusButton";
import DeleteOrdersButton from "./DeleteOrdersButton";

export default function OrdersManager() {
  const selectedOrders = useContext(SelectOrdersContext);

  return (
    <div className="w-full p-4 bg-modal flex flex-col gap-6 border border-zinc-200/20 rounded-lg">
      <div className="flex flex-row justify-start text-zinc-200 text-2xl">
        Orders manager
      </div>
      <div>
        <div className="w-full h-36 flex flex-col items-center gap-2">
          <div className="w-20 h-20 rounded-full bg-zinc-200 flex items-center justify-center text-zinc-900 text-4xl">
            {selectedOrders.selectedOrders.length}
          </div>
          <div className="text-zinc-200 text-2xl">Selected orders</div>
        </div>
        <div className="w-full flex flex-col gap-6">
          <ChangeStatusButton />
          <DeleteOrdersButton />
        </div>
      </div>
    </div>
  );
}
