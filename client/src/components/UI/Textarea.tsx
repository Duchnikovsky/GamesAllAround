import React from "react";
import { cn } from "../../utils/tailwindMerge";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  length: number;
  label: string;
  className?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, length, className, ...props }, ref) => {
    return (
      <div
        className={cn(
          "relative w-full h-24 box-border rounded flex items-start justify-start border border-zinc-100/40 transition-all focus-within:border-zinc-50",
          className
        )}
      >
        <textarea
          ref={ref}
          spellCheck="false"
          className="peer w-full h-full px-4 py-4 bg-transparent outline-0 resize-none thin-scrollbar tracking-[0.1rem]"
          {...props}
        />
        {length === 0 ? (
          <div className="absolute top-[0.7rem] ml-4 text-base text-zinc-300 bg-modal-noopacity/70 peer-focus:-top-3 peer-focus:ml-2 peer-focus:bg-modal-noopacity peer-focus:px-4 peer-focus:ml-0 transition-all duration-300 pointer-events-none ">
            {label}
          </div>
        ) : (
          <div className="absolute -top-3 ml-2 text-base text-zinc-300 bg-modal-noopacity px-4 transition-all duration-300 pointer-events-none">
            {label}
          </div>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
