import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import ProductsSearchbar from "../ProductsList/ProductsSearchbar";
import { TbLoader3 } from "react-icons/tb";

interface AddCodesSearchbarProps {
  setSelected: (value: ProductTypes) => void;
}

interface ProductTypes {
  id: string;
  name: string;
}

async function fetchProducts(value: string) {
  const url = `${
    import.meta.env.VITE_SERVER_URL
  }/dashboard/products/getProducts?value=${value}`;
  const { data } = await axios.get(url, {
    withCredentials: true,
  });

  return data as ProductTypes[];
}

export default function AddCodesSearchbar({
  setSelected,
}: AddCodesSearchbarProps) {
  const [product, setProduct] = useState<string>("");

  const { data, refetch, isRefetching, isLoading } = useQuery({
    queryKey: ["codes-products-query"],
    queryFn: () => fetchProducts(product),
    enabled: false,
    retry: false,
    refetchOnWindowFocus: false,
  });

  function refetchProducts() {
    if (product.length > 0) refetch();
  }

  const products = (data as []) || [];

  return (
    <div className="group relative w-full">
      <ProductsSearchbar
        value={product}
        setValue={(value: string) => {
          setProduct(value);
          refetchProducts();
        }}
      />
      <div
        className="absolute left-0 top-12 w-full p-2 flex flex-col gap-2 h-auto max-h-48 bg-modal rounded-lg border border-zinc-200/20 z-20 overflow-y-auto thin-scrollbar
      hidden group-focus-within:flex"
      >
        {isLoading || isRefetching ? (
          <div className="w-full h-full flex items-center justify-center text-zinc-200">
            <TbLoader3 className="animate-spin" size={24} />
          </div>
        ) : (
          <>
            {products.length < 1 ? (
              <div className="w-full h-10 flex items-center justify-center text-lg text-zinc-200">
                No products found
              </div>
            ) : (
              <>
                {products.map((product: ProductTypes) => (
                  <div
                    className="w-full h-10 px-2 flex items-center text-zinc-200 text-lg rounded-md hover:bg-zinc-800 cursor-pointer transition-colors"
                    key={product.id}
                    onMouseDown={() =>
                      setSelected({
                        id: product.id,
                        name: product.name,
                      })
                    }
                  >
                    {product.name}
                  </div>
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
