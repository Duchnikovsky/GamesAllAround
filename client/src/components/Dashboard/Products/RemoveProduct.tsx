import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../states/store";
import { Button } from "../../UI/Button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { setModal } from "../../../states/modal/modalSlice";
import { FormEvent } from "react";

export default function RemoveProduct() {
  const dispatch = useDispatch();
  const modal = useSelector((state: RootState) => state.modal);

  const { mutate: removeProduct } = useMutation({
    mutationFn: async () => {
      const url = `${
        import.meta.env.VITE_SERVER_URL
      }/products/removeProduct?id=${modal.objectId}`;
      const { data } = await axios.delete(url, { withCredentials: true });
      return data;
    },
    onError: (err) => {
      if (err instanceof axios.AxiosError)
        return toast.error(err.response?.data);
      return toast.error("Could not update product, try again later");
    },
    onSuccess: () => {
      dispatch(setModal({ isOpen: false, modalType: "" }));
      return toast.success("Product updated successfully");
    },
  });

  return (
    <form
      className="w-96 flex flex-col items-center gap-6 px-8"
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        removeProduct();
      }}
    >
      <div className="text-xl tracking-widest flex justify-center text-center">
        Are you sure you want to remove this product?
      </div>
      <Button type="submit">Confirm removal</Button>
    </form>
  );
}
