import { Button } from "../../UI/Button";
import BestsellersCard from "./BestsellersCard";
import ProductsCard from "./ProductsCard";

export default function ProductsDashboard() {

  return (
    <div className="absolute w-full top-32 sm:top-24 left-0">
      <div className="w-full h-12 flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-0 sm:justify-between">
        <div className="text-zinc-200 text-3xl tracking-wider text-shadow">
          Products
        </div>
        <div className="sm:mt-1">
          <Button
            width="8rem"
            height="2.5rem"
          >
            Add Product
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12 sm:mt-0">
        <ProductsCard />
        <BestsellersCard />
      </div>
    </div>
  );
}
