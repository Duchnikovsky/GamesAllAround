import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { FormEvent, useContext } from "react";
import { SelectCustomersContext } from "../../CustomersDashboard";
import { Button } from "../../../../UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../states/store";
import { setModal } from "../../../../../states/modal/modalSlice";
import { FaUsers, FaTrash } from "react-icons/fa6";
import { LuArrowUpFromDot } from "react-icons/lu";

export default function CustomersDelete() {
  const select = useContext(SelectCustomersContext);
  const dispatch = useDispatch();
  const modal = useSelector((state: RootState) => state.modal);

  const { mutate: deleteCustomer } = useMutation({
    mutationFn: async () => {
      const url = `${import.meta.env.VITE_SERVER_URL}/customers/deleteCustomer`;
      const { data } = await axios.delete(url, {
        data: {
          customerId: modal.objectId,
        },
        withCredentials: true,
      });
      return data;
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        return toast.error(error.response?.data);
      }
      return toast.error("Something went wrong");
    },
    onSuccess: () => {
      dispatch(setModal({ isOpen: false, modalType: "" }));
      select.setSelectedCustomers(
        select.selectedCustomers.filter((id: string) => id !== modal.objectId)
      );
      return toast.success("Customer deleted successfully");
    },
  });

  return (
    <form
      className="w-96 flex flex-col gap-6 px-8"
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        deleteCustomer();
      }}
    >
      <div className="flex flex-col gap-2">
        <div className="text-xl tracking-widest font-medium">
          Delete Customers
        </div>
        <div className="text-sm text-justify font-light">
          Are you sure you want to delete all selected users, once
          you do this there will be no going back
        </div>
      </div>
      <hr className="opacity-50"></hr>
      <div className="grid grid-cols-3 center gap-6">
        <FaUsers size={32} />
        <LuArrowUpFromDot size={32} className="rotate-90" />
        <FaTrash size={32} />
      </div>
      <div className="flex flex-row gap-4">
        <Button
          type="button"
          variant="dark"
          className="h-10"
          onClick={() => {
            dispatch(setModal({ isOpen: false, modalType: "" }));
          }}
        >
          Decline
        </Button>
        <Button type="submit" className="h-10">
          Confirm
        </Button>
      </div>
    </form>
  )
}
