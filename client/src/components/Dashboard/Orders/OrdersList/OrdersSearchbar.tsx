import { CiSearch } from "react-icons/ci";

interface OrdersSearchbarProps {
  value: string;
  setValue: (value: string) => void;
}

export default function OrdersSearchbar({
  value,
  setValue,
}: OrdersSearchbarProps) {
  return (
    <div className="relative w-full h-10 rounded-md text-zinc-200 border border-zinc-200/20">
      <button
        className="absolute left-0 top-0 w-10 h-[2.4rem] rounded-l-md bg-zinc-900 flex items-center justify-center hover:cursor-pointer hover:text-zinc-400 transition-colors border-r border-px border-zinc-200/20 box-border"
        type="submit"
      >
        <CiSearch size={24} strokeWidth={0.75} />
      </button>
      <input
        className="w-full h-full rounded-md bg-transparent outline-none pl-12 tracking-wider"
        placeholder="Search for orders"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        spellCheck="false"
      ></input>
    </div>
  );
}
