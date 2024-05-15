import { FormEvent, useContext, useState } from "react";
import Select from "../../../UI/Select";
import { Button } from "../../../UI/Button";
import { SelectOrdersContext } from "../OrdersDashboard";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

enum OrderStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

const orderStates: { value: OrderStatus; label: string }[] = [
  { value: OrderStatus.PENDING, label: "PENDING" },
  { value: OrderStatus.PROCESSING, label: "PROCESSING" },
  { value: OrderStatus.SHIPPED, label: "SHIPPED" },
  { value: OrderStatus.DELIVERED, label: "DELIVERED" },
  { value: OrderStatus.CANCELLED, label: "CANCELLED" },
];

export default function ChangeStatusButton() {
  const [status, setStatus] = useState<OrderStatus>(OrderStatus.PENDING);
  const selectedOrders = useContext(SelectOrdersContext);

  const { mutate: changeStatus } = useMutation({
    mutationFn: async () => {
      const url = `${import.meta.env.VITE_SERVER_URL}/orders/changeStatus`;
      const { data } = await axios.post(
        url,
        {
          orders: selectedOrders.selectedOrders,
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
      selectedOrders.setSelectedOrders([]);
      return toast.success("Orders status changed successfully");
    },
  });

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        changeStatus();
      }}
    >
      <Select
        onSelect={(option) => {
          setStatus(option.value as OrderStatus);
        }}
        options={orderStates}
        placeholder="Select order status"
        preselectedOption={orderStates[0]}
      />
      <Button
        disabled={selectedOrders.selectedOrders.length < 1}
        type="submit"
      >
        Change orders status
      </Button>
    </form>
  );
}
