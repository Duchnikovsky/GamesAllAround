import { FormEvent, useContext } from "react";
import { Button } from "../../../UI/Button";
import { SelectOrdersContext } from "../OrdersDashboard";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

export default function DeleteOrdersButton() {
  const selectedOrders = useContext(SelectOrdersContext);

  const { mutate: deleteOrders } = useMutation({
    mutationFn: async () => {
      const url = `${import.meta.env.VITE_SERVER_URL}/orders/deleteOrders`;
      const { data } = await axios.delete(url, {
        data: {
          orders: selectedOrders.selectedOrders,
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
      selectedOrders.setSelectedOrders([]);
      return toast.success("Orders deleted successfully");
    },
  });

  return (
    <form
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        deleteOrders();
      }}
    >
      <Button disabled={selectedOrders.selectedOrders.length < 1}>
        Delete orders
      </Button>
    </form>
  );
}
