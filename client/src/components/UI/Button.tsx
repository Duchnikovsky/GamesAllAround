import React from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading: boolean;
  isDisabled: boolean;
  width: string;
  height: string;
  fontSize: string;
  margin?: string | 0
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, isLoading, isDisabled, width, height, fontSize, margin, ...props },
    ref
  ) => {
    return (
      <button
        className="border-0 outline-0 bg-zinc-50 box-r-shadow-xs rounded-md text-black transition-all flex items-center justify-center gap-2 hover:cursor-pointer hover:bg-zinc-50"
        style={{ width: width, height: height, fontSize: fontSize, margin: margin }}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {isLoading ? <Loader2 className="animate-spin" size={fontSize}/> : null}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
