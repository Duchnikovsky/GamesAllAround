import { useContext, useState } from "react";
import { ProductsTypes } from "../../../../utils/productValidators";
import { SelectProductsContext } from "../ProductsDashboard";
import { useDispatch } from "react-redux";
import { cn } from "../../../../utils/tailwindMerge";
import ListNavOption from "../../ListNavOption";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { setModal } from "../../../../states/modal/modalSlice";
import { IoChevronDown } from "react-icons/io5";
import ProductElementDetails from "./ProductElementDetails";

export default function ProductListElements({
  product,
}: {
  product: ProductsTypes;
}) {
  const select = useContext(SelectProductsContext);
  const dispatch = useDispatch();
  const [showDetails, toggleDetails] = useState<boolean>(false);

  return (
    <div className="w-full flex flex-col border-b border-zinc-200/20">
      <div
        className={cn(
          "relative group w-full min-h-8 h-8 pr-4 flex items-center cursor-pointer",
          select.selectedProducts.includes(product.id!) && "bg-zinc-800/50"
        )}
        onClick={() => {
          if (select.selectedProducts.includes(product.id!)) {
            select.setSelectedProducts(
              select.selectedProducts.filter((id: string) => id !== product.id)
            );
          } else {
            select.setSelectedProducts([
              ...select.selectedProducts,
              product.id!,
            ]);
          }
        }}
      >
        <div className="w-64 ml-2 text-crop">{product.name}</div>
        <div className="w-64 hidden sm:block ml-4 text-crop">
          {product.Producent.name}
        </div>
        <div className="w-32 ml-auto lg:ml-4 text-right lg:text-left block md:block text-crop group-hover:hidden lg:group-hover:block">
          {product.price}
        </div>
        <div className="w-28 hidden lg:block ml-auto text-right text-crop group-hover:hidden">
          {product.stock}
        </div>
        <div
          className="w-28 bg-transparent h-8 ml-auto hidden group-hover:flex justify-end"
          onClick={(e) => e.stopPropagation()}
        >
          <ListNavOption
            icon={<FaRegEdit size={18} />}
            subText="Edit product"
            variant="small"
            onClick={() =>
              dispatch(
                setModal({
                  isOpen: true,
                  modalType: "editProduct",
                  objectId: product.id,
                  optionalData: product.name,
                })
              )
            }
          />
          <ListNavOption
            icon={<FaRegTrashAlt size={14} />}
            subText="Delete"
            variant="small"
            onClick={() =>
              dispatch(
                setModal({
                  isOpen: true,
                  modalType: "removeProduct",
                  objectId: product.id,
                  optionalData: product.name,
                })
              )
            }
          />
          <ListNavOption
            icon={
              <IoChevronDown
                size={20}
                className={cn(
                  "transition-transform",
                  showDetails ? "rotate-0" : "rotate-180"
                )}
              />
            }
            subText="Details"
            variant="small"
            onClick={() => toggleDetails(!showDetails)}
          />
        </div>
      </div>
      <div
        className={cn(
          "flex flex-col h-0 overflow-y-auto no-scrollbar transition-resize duration-500",
          select.selectedProducts.includes(product.id!) && "bg-zinc-900/50"
        )}
        style={{
          height: showDetails ? "6rem" : "0",
        }}
      >
        <ProductElementDetails product={product} />
      </div>
    </div>
  );
}
