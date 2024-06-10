import BestsellersCard from "./Bestsellers/BestsellersCard";
import ProductsCard from "./ProductsList/ProductsCard";
import NewCategoryCard from "./NewCategoryCard";
import NewProducentCard from "./NewProducentCard";
import AddGamesCodes from "./AddCodes/AddGamesCodes";
import { createContext, useState } from "react";

export const SelectProductsContext = createContext<{
  selectedProducts: string[];
  setSelectedProducts: (selectedProducts: string[]) => void;
}>({
  selectedProducts: [],
  setSelectedProducts: () => {},
});

export default function ProductsDashboard() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  return (
    <div className="absolute w-full top-32 sm:top-24 left-0">
      <div className="w-full h-12 flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-0 sm:justify-between">
        <div className="text-zinc-200 text-3xl tracking-wider text-shadow">
          Products
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12 sm:mt-0">
        <SelectProductsContext.Provider
          value={{ selectedProducts, setSelectedProducts }}
        >
          <ProductsCard />
        </SelectProductsContext.Provider>
        <BestsellersCard />
        <NewCategoryCard />
        <NewProducentCard />
        <AddGamesCodes />
      </div>
    </div>
  );
}
