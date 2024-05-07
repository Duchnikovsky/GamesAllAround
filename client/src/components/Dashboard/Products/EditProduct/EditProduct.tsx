import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../states/store";
import { FormEvent, createContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import EditProductInputs from "./EditProductInputs";
import {
  EditProductContextTypes,
  EditProductTypes,
} from "../../../../utils/productValidators";
import { Button } from "../../../UI/Button";
import { toast } from "react-toastify";
import { setModal } from "../../../../states/modal/modalSlice";

export const EditValuesContext = createContext<EditProductContextTypes>({
  values: {
    id: "",
    name: "",
    price: 0,
    description: "",
    producent: "",
    category: "",
  },
  setValues: () => {},
});

async function fetchProduct(id: string) {
  const url = `${import.meta.env.VITE_SERVER_URL}/products/getProduct?id=${id}`;
  const { data } = await axios.get<EditProductTypes>(url, {
    withCredentials: true,
  });

  return data as EditProductTypes;
}

export default function EditProduct() {
  const dispatch = useDispatch();
  const modal = useSelector((state: RootState) => state.modal);
  const [values, setValues] = useState<EditProductTypes>({
    id: "",
    name: "",
    price: 0,
    description: "",
    producent: "",
    category: "",
  });

  const { mutate: editProduct, isPending } = useMutation({
    mutationFn: async () => {
      const url = `${import.meta.env.VITE_SERVER_URL}/products/editProduct`;
      const { data } = await axios.put(url, values, { withCredentials: true });
      return data;
    },
    onError: (err) => {
      if (err instanceof axios.AxiosError)
        return toast.error(err.response?.data);
      return toast.error("Could not update product, try again later");
    },
    onSuccess: () => {
      setValues({
        id: "",
        name: "",
        price: 0,
        description: "",
        producent: "",
        category: "",
      });
      dispatch(setModal({ isOpen: false, modalType: "" }));
      return toast.success("Product updated successfully");
    },
  });

  const { data: product } = useQuery({
    queryKey: ["edit-product-query"],
    queryFn: () => fetchProduct(modal.objectId!),
    enabled: true,
    refetchOnWindowFocus: false,
    retry: false,
  });

  useEffect(() => {
    if (product) {
      setValues(product);
    }
  }, [product]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    editProduct();
  }

  return (
    <form
      className="w-full sm:w-96 flex flex-col gap-6 px-8"
      onSubmit={handleSubmit}
    >
      <EditValuesContext.Provider value={{ values, setValues }}>
        <div className="text-xl tracking-widest flex justify-center">
          Editing {product?.name}
        </div>
        <EditProductInputs />
        <Button type="submit" isLoading={isPending} isDisabled={isPending}>
          Update product
        </Button>
      </EditValuesContext.Provider>
    </form>
  );
}
