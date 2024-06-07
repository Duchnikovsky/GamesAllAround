import { FormEvent, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../states/store";
import { SelectOrdersContext } from "../OrdersDashboard";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { LuArrowUpFromDot } from "react-icons/lu";
import { FaTrash } from "react-icons/fa";
import { Button } from "../../../UI/Button";
import { setModal } from "../../../../states/modal/modalSlice";
import { TbPackages } from "react-icons/tb";

export default function OrdersDelete() {
  const select = useContext(SelectOrdersContext);
  const dispatch = useDispatch();
  const modal = useSelector((state: RootState) => state.modal);

  const { mutate: deleteOrders } = useMutation({
    mutationFn: async () => {
      const url = `${import.meta.env.VITE_SERVER_URL}/orders/deleteOrders`;
      const { data } = await axios.delete(url, {
        data: {
          orders: modal.objectId,
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
      select.setSelectedOrders(
        select.selectedOrders.filter((id: string) => id !== modal.objectId)
      );
      return toast.success("Orders deleted successfully");
    },
  });

  return (
    <form
      className="w-96 flex flex-col gap-6 px-8"
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        deleteOrders();
      }}
    >
      <div className="flex flex-col gap-2">
        <div className="text-xl tracking-widest font-medium">Delete orders</div>
        <div className="text-sm text-justify font-light">
          Are you sure you want to delete all selected orders, once you do this
          there will be no going back
        </div>
      </div>
      <hr className="opacity-50"></hr>
      <div className="grid grid-cols-3 center gap-6">
        <TbPackages size={32} strokeWidth={1}/>
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
  );
}
