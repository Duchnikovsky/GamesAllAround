import { forwardRef, useContext, useEffect, useImperativeHandle } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CustomersTypes } from "../../../../utils/customersValidators";
import { TbLoader3 } from "react-icons/tb";
import CustomersListElement from "./CustomersListElement";
import { SelectCustomersContext } from "../CustomersDashboard";

async function fetchCustomers(value: string) {
  const url = `${
    import.meta.env.VITE_SERVER_URL
  }/customers/getCustomers?value=${value}`;
  const { data } = await axios.get(url, {
    withCredentials: true,
  });

  return data as CustomersTypes[];
}

const CustomersList = forwardRef(
  (
    {
      value,
      onListLengthChange,
    }: { value: string; onListLengthChange: (length: number) => void },
    ref
  ) => {
    const select = useContext(SelectCustomersContext);

    const { data, refetch, isRefetching, isLoading } = useQuery({
      queryKey: ["dashboard-customers-query"],
      queryFn: () => fetchCustomers(value),
      enabled: true,
      retry: false,
      refetchOnWindowFocus: false,
    });

    const list = data || [];

    function selectAllElements() {
      if (select.selectedCustomers.length === list.length) {
        select.setSelectedCustomers([]);
      } else {
        select.setSelectedCustomers(
          list.map((customer: CustomersTypes) => customer.id!)
        );
      }
    }

    useImperativeHandle(ref, () => ({
      fetchList: refetch,
      selectAllElements,
    }));

    useEffect(() => {
      onListLengthChange(list.length);
    }, [list]);

    return (
      <>
        <div className="w-full min-h-8 h-8 pr-4 bg-zinc-900/80 flex flex-row items-center text-zinc-200/70">
          <div className="w-64 hidden sm:block md:w-[20rem] ml-2">ID</div>
          <div className="w-64 ml-4">Email</div>
          <div className="w-12 hidden lg:block ml-4 overflow-x-visible text-nowrap">
            Orders quantity
          </div>
          <div className="w-32 ml-auto text-right block sm:hidden md:block">
            Created at
          </div>
        </div>
        {isLoading || isRefetching ? (
          <div className="w-full h-full center">
            <TbLoader3
              size={32}
              strokeWidth={1}
              className="animate-spin text-zinc-200"
            />
          </div>
        ) : (
          <>
            {list.map((customer: CustomersTypes) => (
              <div
                key={customer.id}
                className="w-full h-min-8 flex flex-col text-zinc-200"
              >
                <CustomersListElement customer={customer!} />
              </div>
            ))}
          </>
        )}
      </>
    );
  }
);

export default CustomersList;
