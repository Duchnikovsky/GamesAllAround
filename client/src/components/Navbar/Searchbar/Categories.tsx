import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useState } from "react";

interface CategoriesProps {
  category: string;
  setCategory: (category: string) => void;
}

interface CategoriesTypes {
  id: string;
  name: string;
}

export default function Categories({ category, setCategory }: CategoriesProps) {
  const [select, toggleSelect] = useState<boolean>(false);

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
          className="absolute left-0 w-48 top-10 h-64 rounded-md bg-zinc-50 box-shadow-xs overflow-y-auto text-sm"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="relative w-full h-8 pl-10 flex items-center bg-zinc-50 mt-1 bg-zinc-50 hover:bg-zinc-100"
            onClick={() => {
              toggleSelect(false);
              setCategory("All categories");
            }}
          >
            {category === "All categories" && (
              <ArrowRight
                size={20}
                strokeWidth={1}
                className="absolute left-2"
              />
            )}
            All categories
          </div>
          {categories.map((name: string, index) => (
            <div
              className="relative w-full h-8 pl-10 flex items-center bg-zinc-50 bg-zinc-50 hover:bg-zinc-100"
              onClick={() => {
                toggleSelect(false);
                setCategory(name);
              }}
              key={index}
            >
              {name === category && (
                <ArrowRight
                  size={20}
                  strokeWidth={1}
                  className="absolute left-2"
                />
              )}
              {name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
