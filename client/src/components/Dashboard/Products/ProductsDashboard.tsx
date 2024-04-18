import { useDispatch } from "react-redux";
import { Button } from "../../UI/Button";
import BestsellersCard from "./BestsellersCard";
import ProductsCard from "./ProductsCard";
import { setModal } from "../../../states/modal/modalSlice";

export default function ProductsDashboard() {
  const dispatch = useDispatch();

  return (
    <div className="absolute w-full top-32 sm:top-24 left-0">
      <div className="w-full h-12 flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-0 sm:justify-between">
        <div className="text-zinc-200 text-3xl tracking-wider text-shadow">
          Products
        </div>
        <div className="sm:mt-1">
          <Button
            className="w-[8rem] h-[2.5rem] text-lg"
            onClick={() =>
              dispatch(setModal({ isOpen: true, modalType: "addProduct" }))
            }
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
