import React, { forwardRef } from "react";
import { cn } from "../../utils/tailwindMerge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  setValue: (value: string) => void;
  className?: string;
  placeholder?: string;
}

const ListNavSearchbar = forwardRef<HTMLInputElement, InputProps>(
  ({ className, value, setValue, placeholder }, ref) => {
    return (
      <div className="sm:w-80 h-full flex items-center">
        <input
          className={cn(
            "w-full h-full px-2 outline-none border-none bg-transparent text-zinc-200 placeholder:text-zinc-400 tracking-widest placeholder:tracking-wide transition-all duration-300 focus:placeholder-transparent focus:text-zinc-200 focus:placeholder-zinc-400/50",
            className
          )}
          ref={ref}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          spellCheck="false"
        ></input>
      </div>
    );
  }
);

export default ListNavSearchbar;
