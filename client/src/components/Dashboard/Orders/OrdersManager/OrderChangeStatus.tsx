import { FormEvent, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../states/store";
import { SelectOrdersContext } from "../OrdersDashboard";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { Button } from "../../../UI/Button";
import { setModal } from "../../../../states/modal/modalSlice";
import Select from "../../../UI/Select";

enum OrderStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

const orderStates: { value: OrderStatus; label: string }[] = [
  { value: OrderStatus.PENDING, label: "Pending" },
  { value: OrderStatus.PROCESSING, label: "Processing" },
  { value: OrderStatus.SHIPPED, label: "Shipped" },
  { value: OrderStatus.DELIVERED, label: "Delivered" },
  { value: OrderStatus.CANCELLED, label: "Cancelled" },
];

export default function OrderChangeStatus() {
  const [status, setStatus] = useState<OrderStatus>(OrderStatus.PENDING);
  const select = useContext(SelectOrdersContext);
  const dispatch = useDispatch();
  const modal = useSelector((state: RootState) => state.modal);

  const { mutate: changeStatus, isPending } = useMutation({
    mutationFn: async () => {
      const url = `${import.meta.env.VITE_SERVER_URL}/orders/changeStatus`;
      const { data } = await axios.post(
        url,
        {
          orders: new Array(modal.objectId),
          status,
        },
        {
          withCredentials: true,
        }
      );
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
      select.setSelectedOrders([]);
      return toast.success("Order status changed successfully");
    },
  });

  return (
    <form
      className="w-96 flex flex-col gap-6 px-8"
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        changeStatus();
      }}
    >
      <div className="flex flex-col gap-2">
        <div className="text-xl tracking-widest font-medium">
          Change order status
        </div>
        <div className="text-sm text-justify font-light">
          You are editing the order status of the order with id:
          <br />
          <span className="font-medium">{modal.objectId}</span>
          <br />
          This order belongs to user with email:{" "}
          <span className="font-medium">{modal.optionalData}</span>
        </div>
      </div>
      <hr className="opacity-50"></hr>
      <Select
        onSelect={(option) => {
          setStatus(option.value as OrderStatus);
        }}
        options={orderStates}
        placeholder="Select order status"
        preselectedOption={orderStates[0]}
        className="m-auto"
        title="Status"
      />
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
        <Button type="submit" className="h-10" isLoading={isPending}>
          Confirm
        </Button>
      </div>
    </form>
  );
}
