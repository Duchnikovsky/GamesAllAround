import { FormEvent, useState } from "react";
import { Textarea } from "../../../UI/Textarea";
import { Button } from "../../../UI/Button";
import { useMutation } from "@tanstack/react-query";
import AddCodesSearchbar from "./AddCodesSearchbar";
import axios from "axios";
import { toast } from "react-toastify";

interface ProductTypes {
  id: string;
  name: string;
}

export default function AddGamesCodes() {
  const [codes, setCodes] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<ProductTypes>({
    id: "",
    name: "",
  });

  const { mutate: uploadCodes, isPending } = useMutation({
    mutationFn: async () => {
      const url = `${import.meta.env.VITE_SERVER_URL}/products/addCodes`;
      const payload = {
        id: selectedProduct.id,
        codes: codes,
      };
      const { data } = await axios.post(url, payload, {
        withCredentials: true,
      });
      return data;
    },
    onError: (err) => {
      if (err instanceof axios.AxiosError)
        return toast.error(err.response?.data);
      return toast.error("Could not upload codes, try again later");
    },
    onSuccess: () => {
      setCodes("");
      setSelectedProduct({ id: "", name: "" });
      return toast.success("Codes uploaded successfully");
    },
  });

  return (
    <div className="w-full p-4 bg-modal flex flex-col gap-4 border border-zinc-200/20 rounded-lg row-span-2">
      <div className="text-zinc-200 text-2xl">Upload game codes</div>
      <form
        className="flex flex-col gap-4"
        onSubmit={(e: FormEvent) => {
          e.preventDefault();
        }}
      >
        <AddCodesSearchbar setSelected={setSelectedProduct} />
        {selectedProduct.id.length > 0 && (
          <div className="w-full h-12 flex items-center justify-center border-b border-zinc-200/50 text-zinc-200 text-xl">
            {selectedProduct.name}
          </div>
        )}
        <div className="text-zinc-200 text-base text-justify font-light">
          Upload game codes in the textarea below. Each code should be split by
          a semicolon.
        </div>
        <Textarea
          label="Codes list"
          length={codes.length}
          className="h-48 text-zinc-200"
          value={codes}
          onChange={(e) => setCodes(e.target.value)}
        />
        <Button
          className="w-1/2 h-10 ml-auto"
          isLoading={isPending}
          isDisabled={isPending}
          onClick={() => uploadCodes()}
        >
          Upload codes
        </Button>
      </form>
    </div>
  );
}
