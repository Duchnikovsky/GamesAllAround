import { Loader2, Search } from "lucide-react";
import { useCallback, useState } from "react";
import debounce from "lodash.debounce";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Product from "./Product";
import { useNavigate } from "react-router";

interface ProductTypes {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
}

export default function SearchBar() {
  const [value, setValue] = useState<string>("");
  const navigate = useNavigate();

  const { data, refetch, isFetching } = useQuery({
    queryKey: ["minisearchbar-query"],
    queryFn: async () => {
      if (!value) return [];
      const query = `${
        import.meta.env.VITE_SERVER_URL
      }/search?query=${value}&category=unknown`;

      const { data } = await axios.get(query);
      return data as ProductTypes[];
    },
    enabled: false,
  });

  const request = debounce(async () => {
    refetch();
  }, 300);

  const debounceRequest = useCallback(() => {
    request();
  }, []);

  const products = data?.flatMap((product) => product) || [] || [];

  return (
    <div className="relative flex h-full justify-between items-center">
      <form
        className="w-full flex flex-row-reverse mx-2 h-9 items-center bg-zinc-50 rounded-md items-center border border-px border-zinc-600/40 focus-within:box-shadow-xs transition-all duration-200"
        onSubmit={(e) => {
          e.preventDefault();
          const timestamp = Date.now();
          navigate(
            `/search/${encodeURIComponent(
              value.replace(/ /g, "_")
            )}?timestamp=${timestamp}`,
            { replace: true }
          );
        }}
      >
        <div className="w-20 h-full flex bg-black/80 rounded-r-md justify-center items-center cursor-pointer hover:bg-black/90">
          <Search className="text-white" />
        </div>
        <input
          type="text"
          id="searchbar"
          spellCheck="false"
          placeholder="Search for games"
          autoComplete="false"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            debounceRequest();
          }}
          className="w-full h-full bg-transparent outline-none lg:border-r border-r-zinc-600/50 text-sm px-4"
        ></input>
      </form>
      {products.length > 0 && (
        <div className="absolute top-14 flex flex-col gap-2 mt-2 w-full h-auto max-h-[26rem] px-1 py-2 rounded-md bg-zinc-50 shadow-lg overflow-y-auto">
          {!isFetching ? (
            <>
              {products.map((product: ProductTypes, index) => (
                <Product
                  title={product.title}
                  description={product.description}
                  image={product.image}
                  price={product.price}
                  key={index}
                  onClick={() => {
                    setValue("");
                    request();
                  }}
                />
              ))}
            </>
          ) : (
            <Loader2 className="mx-auto my-2 animate-spin" />
          )}
        </div>
      )}
    </div>
  );
}
