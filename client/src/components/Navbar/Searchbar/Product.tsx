import { useNavigate } from "react-router";
// import preview from "../../../assets/preview.png";

interface ProductProps {
  title: string;
  description: string;
  image: string;
  price: number;
  onClick: () => void;
}

export default function Product({title, description, image, price, onClick}:ProductProps) {
  const navigate = useNavigate()
  return (
    <div className="w-full h-24 flex bg-zinc-100 hover:bg-zinc-200 transition-all cursor-pointer rounded-md box-shadow-xs"
    onClick={() => {
      navigate(`/product/${encodeURIComponent(title.replace(/ /g, '_'))}`,{replace: true});
      onClick()
    }}>
      {/* <img src={preview} alt="preview" className="h-24 rounded-l-md" /> */}
      <div className="w-full flex flex-col pl-3">
        <div className="text-lg font-medium">{title}</div>
        <div className="text-sm lg:hidden">{price} USD</div>
        <div className="text-xs hidden lg:line-clamp-4 text-justify">{description}</div>
      </div>
      <div className="w-[10rem] hidden lg:flex justify-end pt-2 pr-4 items-start text-base">
        {price} <span className="font-semibold text-md pl-1"> USD</span>
      </div>
    </div>
  );
}
