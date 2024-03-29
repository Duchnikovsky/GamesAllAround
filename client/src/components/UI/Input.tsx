import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isDisabled?: boolean;
  width: string;
  height: string;
  fontSize: number;
  label: string;
  length: number;
  margin?: string | 0;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ isDisabled, width, height, label, fontSize, length, margin, ...props }, ref) => {

    return (
      <div
        className="relative box-border flex items-center border border-px border-zinc-100/40 rounded px-2 gap-2 transition-all focus-within:border-zinc-50"
        style={{ width: width, height: height, margin: margin }}
      >
        <input
          className="peer w-full h-full px-2 bg-transparent outline-0 border-0 pt-0.5 tracking-[0.15rem] font-normal"
          style={{
            fontSize: fontSize,
            margin: margin,
          }}
          spellCheck="false"
          ref={ref}
          disabled={isDisabled}
          {...props}
        />
        {length === 0 ? (
          <div className="absolute top-[0.7rem] ml-2 text-zinc-300 bg-zinc-800/70 peer-focus:-top-3 peer-focus:bg-zinc-800 peer-focus:px-4 peer-focus:ml-0 transition-all duration-300 pointer-events-none">
            {label}
          </div>
        ) : (
          <div className="absolute -top-3 text-zinc-300 bg-zinc-800 px-4 transition-all duration-300 pointer-events-none">
            {label}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
