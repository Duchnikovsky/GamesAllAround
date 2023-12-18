import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import { ChevronsRight } from "lucide-react";
import { setCategory } from "../../../state/category/categorySlice";

interface CategoryItemProps{
  name: string;
  toggleSelect: (select: boolean) => void;
  index: number;
}

export default function CategoryItem({name, toggleSelect, index} : CategoryItemProps) {
  const category = useSelector((state:RootState) => state.category.name)
  const dispatch = useDispatch()

  return (
    <div
      className="relative w-full h-8 pl-10 flex items-center bg-zinc-50 bg-zinc-50 hover:bg-zinc-100"
      onClick={() => {
        toggleSelect(false);
        dispatch(setCategory(name))
      }}
      key={index}
    >
      {name === category && (
        <ChevronsRight size={20} strokeWidth={1} className="absolute left-2" />
      )}
      {name}
    </div>
  );
}
