import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import CategoryItem from "./CategoryItem";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/store";

interface CategoriesTypes {
  id: string;
  name: string;
}

export default function Categories() {
  const [select, toggleSelect] = useState<boolean>(false);
  const category = useSelector((state: RootState) => state.category.name);

  const { data } = useQuery({
    queryKey: ["categories-query"],
    queryFn: async () => {
      const query = `${import.meta.env.VITE_SERVER_URL}/search/categories`;

      const { data } = await axios.get(query);
      return data as CategoriesTypes[];
    },
    enabled: true,
    refetchOnWindowFocus: false,
  });

  const categories = data?.flatMap((category) => category.name) || [] || [];

  return (
    <div
      className="relative hidden lg:flex flex-shrink-0 h-full px-4 bg-zinc flex items-center gap-1 cursor-pointer hover:bg-zinc-200/30 transition-colors"
      onClick={() => toggleSelect(!select)}
    >
      <div className="text-sm">{category}</div>
      <ChevronDown size={20} className="mt-1" />
      {select && (
        <div
          className="absolute left-0 w-52 top-10 h-64 rounded-md bg-zinc-50 box-shadow-xs overflow-y-auto text-sm"
          onClick={(e) => e.stopPropagation()}
        >
          <CategoryItem
            name="All categories"
            toggleSelect={toggleSelect}
            index={0}
          />
          {categories.map((name: string, index) => (
            <CategoryItem
              name={name}
              toggleSelect={toggleSelect}
              index={index + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
