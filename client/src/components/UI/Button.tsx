import React from "react";
import { TbLoader3 } from "react-icons/tb";
import { cn } from "../../utils/tailwindMerge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean | false;
  isDisabled?: boolean | false;
  className?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, isLoading, isDisabled, className, ...props }, ref) => {
    return (
      <button
        className={cn(
          "w-full h-12 text-xl border border-px border-zinc-800 outline-0 flex items-center justify-center rounded-md bg-zinc-200 text-zinc-800 font-medium gap-2 hover:cursor-pointer hover:bg-zinc-900 hover:text-zinc-200 hover:border-px hover:border hover:border-zinc-100/40 transition-colors duration-500 box-border",
          className
        )}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {isLoading ? <TbLoader3 className="animate-spin" size={20} /> : null}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
