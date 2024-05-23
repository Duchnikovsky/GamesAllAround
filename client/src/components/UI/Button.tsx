import React from "react";
import { TbLoader3 } from "react-icons/tb";
import { cn } from "../../utils/tailwindMerge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean | false;
  isDisabled?: boolean | false;
  variant?: "light" | "dark";
  className?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, isLoading, isDisabled, className, variant, ...props }, ref) => {
    return (
      <button
        className={cn(
          "w-full h-12 text-xl border border-zinc-800 outline-0 flex items-center justify-center rounded-lg bg-zinc-100 text-zinc-900 font-medium gap-2 hover:cursor-pointer hover:bg-zinc-400 hover:text-zinc-800 transition-colors duration-500 box-border disabled:bg-zinc-200 disabled:text-zinc-800 disabled:border-px disabled:border disabled:border-zinc-800/40 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-zinc-200 disabled:hover:text-zinc-800 disabled:hover:border-px disabled:hover:border disabled:hover:border-zinc-800/40 disabled:hover:cursor-not-allowed disabled:hover:opacity-50",
          variant === "dark" &&
            "bg-zinc-900 text-zinc-200 border-zinc-100/40 hover:bg-zinc-800 hover:text-zinc-100 hover:border-zinc-200/40 disabled:bg-zinc-900 disabled:text-zinc-200 disabled:border-zinc-100/40 disabled:hover:bg-zinc-900 disabled:hover:text-zinc-100 disabled:hover:border-zinc-200/40",
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
