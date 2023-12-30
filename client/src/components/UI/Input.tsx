import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isDisabled: boolean;
  width: string;
  height: string;
  fontSize: string;
  icon: JSX.Element;
  margin?: string | 0;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ isDisabled, width, height, fontSize, margin, icon, ...props }, ref) => {
    return (
      <div
        className="flex items-center bg-white rounded px-2 gap-2 box-r-shadow-xs"
        style={{ width: width, height: height, margin: margin }}
      >
        {icon}
        <input
          className="w-full h-full bg-transparent outline-0 border-0 flex items-center text-black font-bold placeholder:text-black/70 tracking-wider placeholder:tracking-normal"
          style={{
            fontSize: fontSize,
            margin: margin,
          }}
          spellCheck="false"
          autoComplete="false"
          ref={ref}
          disabled={isDisabled}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
