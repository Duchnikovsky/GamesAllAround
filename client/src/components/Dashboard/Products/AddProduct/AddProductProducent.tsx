import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Select from "../../../UI/Select/Select";
import { ValuesContext } from "./AddProduct";
import { useContext } from "react";

interface ProducentsBaseType {
  id: string;
  name: string;
}

interface ProducentType {
  value: string;
  label: string;
}

async function fetchProducents() {
  const url = `${import.meta.env.VITE_SERVER_URL}/producents/getProducents`;
  const { data } = await axios.get<ProducentsBaseType[]>(url);

  return data;
}

export default function AddProductProducent() {
  const { values, setValues } = useContext(ValuesContext);

  const { data } = useQuery<ProducentsBaseType[]>({
    queryKey: ["products-producent-query"],
    queryFn: fetchProducents,
    enabled: true,
    retry: true,
    refetchOnWindowFocus: false,
  });

  const producents: ProducentType[] = [];

  data?.map((category: ProducentsBaseType) => {
    producents.push({
      value: category.id,
      label: category.name,
    });
  });

  return (
    <Select
      options={producents}
      onSelect={(option) => {
        setValues({ ...values, producent: option.value });
      }}
      placeholder="Select a producent"
    />
  );
}
