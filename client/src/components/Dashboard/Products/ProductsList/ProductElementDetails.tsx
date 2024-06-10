import { ProductsTypes } from "../../../../utils/productValidators";

interface ProductArrayTypes {
  label: string;
  value: string;
}

export default function ProductElementDetails({
  product,
}: {
  product: ProductsTypes;
}) {
  const productDetails: ProductArrayTypes[] = Object.entries(product)
    .filter(([key]) => key !== "Producent" && key !== "name")
    .map(([key, value]) => ({
      label: key.substring(0, 1).toUpperCase() + key.substring(1),
      value: value,
    }));

  return (
    <div className=" grid grid-cols-2">
      {productDetails.map((item: ProductArrayTypes, index: number) => (
        <div
          key={index}
          className="flex flex-col h-12 odd:text-left odd:pl-4 sm:odd:pl-2 even:pr-4 even:text-right"
        >
          <span className="text-sm text-zinc-400">{item.label}</span>
          <span className="text-crop">{item.value}</span>
        </div>
      ))}
      <div className="flex flex-col h-12 odd:text-left odd:pl-4 sm:odd:pl-2 even:pr-4 even:text-right">
        <span className="text-sm text-zinc-400">Producent</span>
        <span className="text-crop">{product.Producent.name}</span>
      </div>
    </div>
  );
}
