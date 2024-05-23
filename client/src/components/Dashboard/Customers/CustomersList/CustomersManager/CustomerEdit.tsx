import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { FormEvent, useState } from "react";
import { Button } from "../../../../UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../states/store";
import { setModal } from "../../../../../states/modal/modalSlice";
import CustomerEditPersonalInputs from "./CustomerEditPersonalInputs";
import { Values } from "../../../../../utils/authValidators";
import CustomerEditAddressInputs from "./CustomerEditAddressInputs";
import { TbLoader3 } from "react-icons/tb";

export default function CustomerEdit() {
  const dispatch = useDispatch();
  const modal = useSelector((state: RootState) => state.modal);
  const [personals, setPersonals] = useState<Values>({
    name: "",
    lastname: "",
    phone: "",
  });
  const [address, setAddress] = useState<Values>({
    voivodeship: "",
    district: "",
    town: "",
    street: "",
    residence: "",
    postcode: "",
  });

  const { mutate: editCustomer, isPending } = useMutation({
    mutationFn: async () => {
      const url = `${import.meta.env.VITE_SERVER_URL}/customers/updateCustomer`;
      const { data } = await axios.put(
        url,
        {
          customerId: modal.objectId,
          personal: {
            name: personals.name,
            lastname: personals.lastname,
            phone: personals.phone,
          },
          address: {
            voivodeship: address.voivodeship,
            district: address.district,
            town: address.town,
            street: address.street,
            residence: address.residence,
            postcode: address.postcode,
          },
        },
        { withCredentials: true }
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
      return toast.success("Customer edited successfully");
    },
  });

  const { isLoading, isFetching, isRefetching } = useQuery({
    queryKey: ["edit-get-query"],
    queryFn: async () => {
      const url = `${
        import.meta.env.VITE_SERVER_URL
      }/customers/getCustomer?customerId=${modal.objectId}`;
      const { data } = await axios.get(url, { withCredentials: true });

      setPersonals({
        name: data.Personal.name,
        lastname: data.Personal.lastname,
        phone: data.Personal.phone,
      });
      setAddress({
        voivodeship: data.Address.voivodeship,
        district: data.Address.district,
        town: data.Address.town,
        street: data.Address.street,
        residence: data.Address.residence,
        postcode: data.Address.postcode,
      });
      return data;
    },
    enabled: true,
    refetchOnWindowFocus: false,
  });

  if (isLoading || isFetching || isRefetching)
    return (
      <div className="w-96 md:w-[48rem] h-[33.5rem] center gap-6 px-8">
        <TbLoader3
          size={32}
          strokeWidth={1}
          className="animate-spin text-zinc-200"
        />
      </div>
    );

  return (
    <form
      className="w-96 md:w-[48rem] flex flex-col gap-6 px-8"
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        editCustomer();
      }}
    >
      <div className="flex flex-col gap-2">
        <div className="text-xl tracking-widest font-medium">Edit Customer</div>
        <div className="text-sm text-justify font-light">
          You are editing the user with email address:{" "}
          <span className="font-medium">{modal.optionalData}</span>
        </div>
      </div>
      <hr className="opacity-50"></hr>
      <div className="w-full flex flex-col gap-4 md:gap-0 md:grid md:grid-cols-2">
        <CustomerEditPersonalInputs
          values={personals}
          setValues={setPersonals}
        />
        <CustomerEditAddressInputs values={address} setValues={setAddress} />
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
        <Button type="submit" className="h-10" isLoading={isPending}>
          Confirm <span className="hidden md:block">changes</span>
        </Button>
      </div>
    </form>
  );
}
