import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { Input } from "../../UI/Input";
import { Button } from "../../UI/Button";

export default function NewProducentCard() {
  const [name, setName] = useState<string>("");

  const { mutate: addCategory, isPending } = useMutation({
    mutationFn: async () => {
      const url = `${import.meta.env.VITE_SERVER_URL}/producents/addProducent`;
      const { data } = await axios.post(
        url,
        { name },
        { withCredentials: true }
      );

      return data;
    },
    onError: (err) => {
      if (err instanceof axios.AxiosError)
        return toast.error(err.response?.data);
      return toast.error("Could not add producent, try again later");
    },
    onSuccess: () => {
      setName("");
      return toast.success("Producent added successfully");
    },
  });

  return (
    <div className="w-full p-4 bg-modal flex flex-col gap-4 border border-zinc-200/20 rounded-lg">
      <div className="text-zinc-200 text-2xl">
        New producent
      </div>
      <form
        className="flex flex-col gap-4"
        onSubmit={(e: FormEvent) => {
          e.preventDefault();
          addCategory();
        }}
      >
        <Input
          label="Producent name"
          maxLength={100}
          length={name.length}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="text-zinc-200"
        />
        <Button
          className="w-1/2 h-10 ml-auto"
          isLoading={isPending}
          isDisabled={isPending}
        >
          Add producent
        </Button>
      </form>
    </div>
  );
}
