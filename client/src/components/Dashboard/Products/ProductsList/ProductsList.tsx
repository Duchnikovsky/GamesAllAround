import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TbLoader3 } from "react-icons/tb";
import { forwardRef, useImperativeHandle } from "react";
import { ProductsTypes } from "../../../../utils/productValidators";
import ProductListElements from "./ProductListElements";

async function fetchProducts(value: string) {
  const url = `${
    import.meta.env.VITE_SERVER_URL
  }/dashboard/products/getProducts?value=${value}`;
  const { data } = await axios.get(url, {
    withCredentials: true,
  });

  return data as ProductsTypes[];
}

const ProductsList = forwardRef(({ value }: { value: string }, ref) => {
  const { data, refetch, isRefetching, isLoading } = useQuery({
    queryKey: ["dashboard-products-query"],
    queryFn: () => fetchProducts(value),
    enabled: true,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const list = data || [];

  useImperativeHandle(ref, () => ({
    fetchList: refetch,
  }));

  return (
    <>
      <div className="w-full min-h-8 h-8 pr-4 bg-zinc-900/80 flex flex-row items-center text-zinc-200/70">
        <div className="w-64 ml-2">Name</div>
        <div className="w-64 hidden sm:block ml-4">Producent</div>
        <div className="w-32 ml-auto lg:ml-4 text-right lg:text-left block md:block">
          Price
        </div>
        <div className="w-28 hidden lg:block ml-auto text-right overflow-x-visible">
          Stock
        </div>
      </div>
      {isLoading || isRefetching ? (
        <div className="w-full h-full center">
          <TbLoader3
            size={32}
            strokeWidth={1}
            className="animate-spin text-zinc-200"
          />
        </div>
      ) : (
        <>
          {list.map((product: ProductsTypes) => (
            <div
              key={product.id}
              className="w-full h-min-8 flex flex-col text-zinc-200"
            >
              <ProductListElements product={product!} />
            </div>
          ))}
        </>
      )}
    </>
  );
});

export default ProductsList;
