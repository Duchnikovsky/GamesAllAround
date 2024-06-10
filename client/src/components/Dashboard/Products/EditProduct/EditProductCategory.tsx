import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Select from "../../../UI/Select";
import { useContext } from "react";
import { EditValuesContext } from "./EditProduct";

interface CategoriesBaseTypes {
  id: string;
  name: string;
}

interface CategoryType {
  value: string;
  label: string;
}

async function fetchCategories() {
  const url = `${import.meta.env.VITE_SERVER_URL}/categories/getCategories`;
  const { data } = await axios.get<CategoriesBaseTypes[]>(url);

  return data;
}

export default function EditProductCategory() {
  const { values, setValues } = useContext(EditValuesContext);

  const { data } = useQuery({
    queryKey: ["products-categories-query"],
    queryFn: fetchCategories,
    enabled: true,
    retry: true,
    refetchOnWindowFocus: false,
  });

  const categories: CategoryType[] = [];

  data?.map((category: CategoriesBaseTypes) => {
    categories.push({
      value: category.id,
      label: category.name,
    });
  });

  return (
    <Select
      onSelect={(option) => {
        setValues({ ...values, category: option.value });
      }}
      options={categories}
      placeholder="Select category"
      preselectedOption={categories[0]}
      className="w-full mx-auto"
      title="Category"
    />
  );
}
