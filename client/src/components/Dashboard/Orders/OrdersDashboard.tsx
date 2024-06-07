import { createContext, useState } from "react";
import OrdersListCard from "./OrdersList/OrdersListCard";

export const SelectOrdersContext = createContext<{
  selectedOrders: string[];
  setSelectedOrders: (selectedOrders: string[]) => void;
}>({
  selectedOrders: [],
  setSelectedOrders: () => {},
});

export default function OrdersDashboard() {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

  return (
    <div className="absolute w-full top-32 sm:top-24 left-0">
      <div className="w-full h-12 flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-0 sm:justify-between">
        <div className="text-zinc-200 text-3xl tracking-wider text-shadow">
          Orders
        </div>
      </div>
      <SelectOrdersContext.Provider
        value={{ selectedOrders, setSelectedOrders }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12 sm:mt-0">
          <OrdersListCard />
        </div>
      </SelectOrdersContext.Provider>
    </div>
  );
}
