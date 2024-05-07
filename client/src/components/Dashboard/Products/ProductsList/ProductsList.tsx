import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TbLoader3 } from "react-icons/tb";
import { forwardRef, useImperativeHandle } from "react";
import { BsThreeDots } from "react-icons/bs";
import { DropdownRoot } from "../../../Dropdown/DropdownRoot";
import { DropdownItem } from "../../../Dropdown/DropdownItem";
import { MdOutlineEdit } from "react-icons/md";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { useDispatch } from "react-redux";
import { setModal } from "../../../../states/modal/modalSlice";
import { DropdownContent } from "../../../Dropdown/DropdownContent";
import { DropdownSeparator } from "../../../Dropdown/DropdownSeparator";
import { ProductsTypes } from "../../../../utils/productValidators";

interface ProductsListProps {
  value: string;
}

async function fetchProducts(value: string) {
  const url = `${
    import.meta.env.VITE_SERVER_URL
  }/dashboard/products/getProducts?value=${value}`;
  const { data } = await axios.get(url, {
    withCredentials: true,
  });

  return data as ProductsTypes[];
}

const ProductsList = forwardRef(({ value }: ProductsListProps, ref) => {
  const dispatch = useDispatch();

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

  if (isLoading || isRefetching)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <TbLoader3
          size={32}
          strokeWidth={1}
          className="animate-spin text-zinc-200"
        />
      </div>
    );

  return (
    <>
      {list.flatMap((product: ProductsTypes) => (
        <div
          key={product.id}
          className="w-full min-h-8 px-4 odd:bg-zinc-900/40 even:bg-zinc-800/40 flex items-center text-zinc-200"
        >
          <div className="w-80 overflow-x-auto no-scrollbar whitespace-nowrap">
            {product.name!}
          </div>
          <div className="w-72 overflow-x-auto no-scrollbar whitespace-nowrap hidden sm:block">
            {product.Producent.name}
          </div>
          <div className="w-28 ">{product.price} USD</div>
          <div className="w-24 hidden sm:block">{product.stock}</div>
          <div className="w-8 ml-auto">
            <DropdownRoot
              theme="dark"
              trigger={
                <BsThreeDots
                  size={24}
                  className="cursor-pointer hover:text-zinc-400"
                />
              }
              width={12}
            >
              <DropdownContent>{product.name}</DropdownContent>
              <DropdownSeparator />
              <DropdownItem
                onClick={() =>
                  dispatch(
                    setModal({
                      isOpen: true,
                      modalType: "editProduct",
                      objectId: product.id,
                    })
                  )
                }
              >
                <div>Edit item</div>
                <MdOutlineEdit size={16} />
              </DropdownItem>
              <DropdownItem
                onClick={() =>
                  dispatch(
                    setModal({
                      isOpen: true,
                      modalType: "removeProduct",
                      objectId: product.id,
                    })
                  )
                }
              >
                <div>Remove item</div>
                <IoIosRemoveCircleOutline size={16} />
              </DropdownItem>
            </DropdownRoot>
          </div>
        </div>
      ))}
    </>
  );
});

export default ProductsList;
