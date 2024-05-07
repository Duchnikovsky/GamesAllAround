import { TbLoader3 } from "react-icons/tb";

interface ProductTypes {
  itemId: string;
  name: string;
  totalOrders: number;
}

interface BestsellersListProps {
  products: ProductTypes[];
  isLoading: boolean;
}

export default function BestsellersList({ products, isLoading }: BestsellersListProps) {
  if (isLoading)
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
      {products.map((product: ProductTypes, index: number) => (
        <div
          key={index}
          className="w-full min-h-8 px-4 odd:bg-zinc-900/40 even:bg-zinc-800/40 flex items-center text-zinc-200"
        >
          <div className="w-8">{index+1}</div>
          <div className="w-64">{product.name}</div>
          <div className="w-20">{product.totalOrders}</div>
        </div>
      ))}
    </>
  );
}
