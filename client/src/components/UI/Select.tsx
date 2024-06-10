import { useState } from "react";
import { cn } from "../../utils/tailwindMerge";
import { IoChevronDown } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";

type Option = {
  value: string;
  label: string;
};

interface CustomSelectProps {
  options: Option[];
  onSelect: (option: Option) => void;
  className?: string;
  placeholder: string;
  preselectedOption?: Option;
  disabled?: boolean;
  title?: string;
}

export default function Select({
  options,
  onSelect,
  className,
  placeholder,
  preselectedOption,
  disabled,
  title,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<Option>(
    preselectedOption || { value: "", label: "" }
  );

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "relative w-64 h-10 pl-4 pr-8 bg-transparent rounded-lg border border-zinc-100/40 flex items-center text-zinc-200 text-base font-normal transition-all hover:border-zinc-100/60 cursor-pointer",
          className,
          disabled &&
            "cursor-not-allowed hover:border-zinc-100/40 hover:bg-transparent hover:text-zinc-200"
        )}
        onClick={disabled ? undefined : toggleDropdown}
      >
        {selectedOption ? (
          <span className="tracking-wider">{selectedOption.label}</span>
        ) : (
          <span className="text-zinc-100">{placeholder}</span>
        )}
        <div className="absolute right-0 top-0 w-10 h-10 flex items-center justify-center">
          <IoChevronDown />
        </div>
      </div>
      <div
        className={cn(
          "absolute top-12 w-64 max-h-64 px-1 h-0 mt-1 flex flex-col items-center rounded-lg border  text-zinc-200 bg-modal overflow-y-auto thin-scrollbar z-[15] transition-resize duration-150",
          className,
          isOpen ? "border-zinc-100/40" : "border-transparent duration-75"
        )}
        style={{
          height: isOpen
            ? options.length * 2 + (title ? 2 : 0) + 0.75 + "rem"
            : "0",
        }}
      >
        {title && (
          <div className="w-full mt-1 h-8 flex items-center pl-8 font-semibold">
            {title}
          </div>
        )}
        {options.map((option, index) => (
          <div
            key={index}
            className="relative w-full h-8 pl-8 rounded bg-transparent flex items-center tracking-wider font-normal transition-all hover:bg-zinc-800 cursor-pointer first:mt-1 text-crop"
            onClick={() => handleSelect(option)}
          >
            <div
              className={cn(
                "absolute left-0 top-0 w-8 h-8 hidden",
                option.label === selectedOption.label && "center"
              )}
            >
              <FaCheck size={12} />
            </div>
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
}
