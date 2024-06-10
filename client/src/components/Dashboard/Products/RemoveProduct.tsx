import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../states/store";
import { Button } from "../../UI/Button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { setModal } from "../../../states/modal/modalSlice";
import { FormEvent, useContext } from "react";
import { SelectProductsContext } from "./ProductsDashboard";
import { GoPackage } from "react-icons/go";
import { LuArrowUpFromDot } from "react-icons/lu";
import { FaTrash } from "react-icons/fa";

export default function RemoveProduct() {
  const select = useContext(SelectProductsContext);
  const dispatch = useDispatch();
  const modal = useSelector((state: RootState) => state.modal);

  const { mutate: deleteProduct } = useMutation({
    mutationFn: async () => {
      const url = `${import.meta.env.VITE_SERVER_URL}/products/removeProduct`;
      const { data } = await axios.delete(url, {
        data: {
          products: modal.objectId,
        },
        withCredentials: true,
      });
      return data;
    },
    onError: (err) => {
      if (err instanceof axios.AxiosError)
        return toast.error(err.response?.data);
      return toast.error("Could not delete product, try again later");
    },
    onSuccess: () => {
      dispatch(setModal({ isOpen: false, modalType: "" }));
      select.setSelectedProducts(
        select.selectedProducts.filter((id: string) => id !== modal.objectId)
      );
      return toast.success("Product deleted successfully");
    },
  });

  return (
    <form
      className="w-96 flex flex-col gap-6 px-8"
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        deleteProduct();
      }}
    >
      <div className="flex flex-col gap-2">
        <div className="text-xl tracking-widest font-medium">
          Delete Product
        </div>
        <div className="text-sm text-justify font-light">
          Are you sure you want to delete the product{" "}
          <span className="font-medium">{modal.optionalData}</span>, once you do
          this there will be no going back
        </div>
      </div>
      <hr className="opacity-50"></hr>
      <div className="grid grid-cols-3 center gap-6">
        <GoPackage size={32} />
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
