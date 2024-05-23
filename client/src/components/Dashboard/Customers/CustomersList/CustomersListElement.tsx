import {
  CustomersTypes,
  colorRole,
} from "../../../../utils/customersValidators";
import { cn } from "../../../../utils/tailwindMerge";
import ListNavOption from "../../ListNavOption";
import { useContext, useState } from "react";
import { SelectCustomersContext } from "../CustomersDashboard";
import { IoChevronDown } from "react-icons/io5";
import CustomerDetailedPersonals from "./CustomerDetailedPersonals";
import CustomerDetailedAddress from "./CustomerDetailedAddress";
import CustomerDetailedBasics from "./CustomerDetailedBasics";
import { FaRegTrashAlt, FaUserEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setModal } from "../../../../states/modal/modalSlice";

export default function CustomersListElement({
  customer,
}: {
  customer: CustomersTypes;
}) {
  const [showDetails, toggleDetails] = useState<boolean>(false);
  const select = useContext(SelectCustomersContext);
  const dispatch = useDispatch();
  let roleColor = colorRole(customer.role);
  let date = new Date(customer.createdAt);

  return (
    <div className="w-full flex flex-col border-b border-zinc-200/20">
      <div
        className={cn(
          "relative group w-full min-h-8  h-8 pr-4 flex items-center cursor-pointer",
          select.selectedCustomers.includes(customer.id!) && "bg-zinc-800/50"
        )}
        onClick={() => {
          if (select.selectedCustomers.includes(customer.id!)) {
            select.setSelectedCustomers(
              select.selectedCustomers.filter(
                (id: string) => id !== customer.id
              )
            );
          } else {
            select.setSelectedCustomers([
              ...select.selectedCustomers,
              customer.id!,
            ]);
          }
        }}
      >
        <div className="w-64 hidden sm:block md:w-[20rem] ml-2 text-crop">
          {customer.id}
        </div>
        <div className={cn("w-64 ml-4 text-crop", roleColor)}>
          {customer.email}
        </div>
        <div className="w-12 hidden lg:block ml-4">
          {customer.ordersQuantity}
        </div>
        <div className="w-32 ml-auto text-right block sm:hidden md:block text-crop group-hover:hidden">
          {date.toLocaleDateString()}
        </div>
        <div
          className="w-24 h-8 ml-auto bg-transparent hidden group-hover:flex justify-end"
          onClick={(e) => e.stopPropagation()}
        >
          <ListNavOption
            icon={<FaUserEdit size={18} />}
            subText="Edit"
            variant="small"
            onClick={() =>
              dispatch(
                setModal({
                  isOpen: true,
                  modalType: "editCustomer",
                  objectId: customer.id,
                  optionalData: customer.email,
                })
              )
            }
          />
          <ListNavOption
            icon={<FaRegTrashAlt size={14} />}
            subText="Delete"
            variant="small"
            onClick={() =>
              dispatch(
                setModal({
                  isOpen: true,
                  modalType: "removeCustomer",
                  objectId: customer.id,
                  optionalData: customer.email,
                })
              )
            }
          />
          <ListNavOption
            icon={
              <IoChevronDown
                size={20}
                className={cn(
                  "transition-transform",
                  showDetails ? "rotate-0" : "rotate-180"
                )}
              />
            }
            subText="Details"
            variant="small"
            onClick={() => toggleDetails(!showDetails)}
          />
        </div>
      </div>
      <div
        className={cn(
          "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 px-2 h-0 overflow-y-auto no-scrollbar transition-resize duration-500",
          select.selectedCustomers.includes(customer.id!) && "bg-zinc-900/50"
        )}
        style={{
          height: showDetails ? "9.5rem" : "0",
          paddingTop: showDetails ? "0.5rem" : "0",
        }}
      >
        <CustomerDetailedPersonals data={customer.personal} />
        <CustomerDetailedAddress data={customer.address} />
        <CustomerDetailedBasics
          data={{
            userID: customer.id,
            email: customer.email,
            createdAt: customer.createdAt,
          }}
        />
      </div>
    </div>
  );
}
