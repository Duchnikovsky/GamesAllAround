import { useState } from "react";
import { cn } from "../../../utils/tailwindMerge";
import { IoChevronDown } from "react-icons/io5";

type Option = {
  value: string;
  label: string;
};

interface CustomSelectProps {
  options: Option[];
  onSelect: (option: Option) => void;
  className?: string;
  placeholder: string;
}

export default function Select({
  options,
  onSelect,
  className,
  placeholder,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<Option>();

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <div className="relative">
      <div
        className={cn(
          "relative w-64 h-10 pl-4 pr-8 bg-transparent rounded border border-zinc-100/40 flex items-center text-base font-normal transition-all hover:border-zinc-100/60 cursor-pointer",
          className,
        )}
        onClick={toggleDropdown}
      >
        {selectedOption ? (
          selectedOption.label
        ) : (
          <span className="text-zinc-100">{placeholder}</span>
        )}
        <div className="absolute right-0 top-0 w-10 h-10 flex items-center justify-center">
          <IoChevronDown className={cn('rotate-0 transition-transform', isOpen && 'rotate-180')}/>
        </div>
      </div>
      {isOpen && (
        <div
          className={cn(
            "absolute w-64 max-h-64 p-1 h-auto mt-1 flex items-center rounded border border-zinc-100/40 bg-modal-noopacity overflow-y-auto thin-scrollbar z-[15]",
            className
          )}
        >
          {options.map((option, index) => (
            <div
              key={index}
              className="w-full h-8 p-2 rounded bg-transparent flex items-center text-base tracking-[0.15rem] font-normal transition-all hover:bg-zinc-800 cursor-pointer"
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
