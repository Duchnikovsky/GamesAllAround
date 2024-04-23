import React from "react";
import { cn } from "../../utils/tailwindMerge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isDisabled?: boolean;
  label: string;
  length: number;
  className?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ isDisabled, label, length, className, ...props }, ref) => {
    return (
      <div className={cn("relative w-full h-12 box-border px-2 rounded flex items-center border border-zinc-100/40 gap-2 transition-all focus-within:border-zinc-50", className)}>
        <input
          className="peer w-full h-full px-2 bg-transparent outline-0 border-0 pt-0.5 tracking-[0.15rem] font-normal"
          spellCheck="false"
          ref={ref}
          disabled={isDisabled}
          {...props}
        />
        {length === 0 ? (
          <div className="absolute top-[0.7rem] ml-2 text-base text-zinc-300 bg-modal-noopacity/70 peer-focus:-top-3 peer-focus:bg-modal-noopacity peer-focus:px-4 peer-focus:ml-0 transition-all duration-300 pointer-events-none">
            {label}
          </div>
        ) : (
          <div className="absolute -top-3 text-base text-zinc-300 bg-modal-noopacity px-4 transition-all duration-300 pointer-events-none">
            {label}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
