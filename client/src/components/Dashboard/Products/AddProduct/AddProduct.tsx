import { FormEvent, createContext, useState } from "react";
import AddProductInputs from "./AddProductInputs";
import { uploadFiles } from "../../../../utils/uploadthing";
import { Button } from "../../../UI/Button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { AddProductContextTypes, AddProductValues } from "../../../../utils/productValidators";
import { useDispatch } from "react-redux";
import { setModal } from "../../../../states/modal/modalSlice";

export const ValuesContext = createContext<AddProductContextTypes>({
  values: {
    name: "",
    price: 0,
    description: "",
    image: "",
    producent: "",
    category: "",
  },
  setValues: () => {},
  image: null,
  setImage: () => {},
});

export default function AddProduct() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [values, setValues] = useState<AddProductValues>({
    name: "",
    price: 0,
    description: "",
    image: "",
    producent: "",
    category: "",
  });
  const [image, setImage] = useState<File | null>(null);

  const { mutate: addProduct } = useMutation({
    mutationFn: async (payload: AddProductValues) => {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/products/addProduct`,
        payload,
        {
          withCredentials: true,
        }
      );
      return data;
    },
    onError: (err) => {
      setLoading(false);
      if (err instanceof axios.AxiosError)
        return toast.error(err.response?.data);
      return toast.error("Could not add product, try again later");
    },
    onSuccess: () => {
      setLoading(false);
      dispatch(setModal({ isOpen: false, modalType: "" }));
      return toast.success("Product added successfully");
    },
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const uploadImage = await uploadFiles("imageUploader", {
        files: [image!],
      });
      const payload: AddProductValues = {
        ...values,
        image: uploadImage[0].url,
      };
      addProduct(payload);
    } catch (error) {
      setLoading(false);
      return toast.error("You need to upload an image");
    }
  }

  return (
    <form
      className="w-96 sm:w-[48rem] flex flex-col gap-6 px-8 overflow-visible"
      onSubmit={handleSubmit}
    >
      <ValuesContext.Provider
        value={{
          values: values,
          setValues: setValues,
          image: image,
          setImage: setImage,
        }}
      >
        <div className="text-xl tracking-widest">Add new product</div>
        <AddProductInputs />
        <Button type="submit" isLoading={loading} isDisabled={loading}>
          Add product
        </Button>
      </ValuesContext.Provider>
    </form>
  );
}
