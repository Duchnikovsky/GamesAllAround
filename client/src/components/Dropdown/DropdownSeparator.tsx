import React, { useContext } from "react";
import { ThemeContext } from "./DropdownRoot";

interface DropdownSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

const DropdownSeparator = React.forwardRef<HTMLDivElement, DropdownSeparatorProps>(
  ({ ...props }, ref) => {
    const theme = useContext(ThemeContext)

    return (
      <div ref={ref} className={`w-[100%] h-[1px] my-1 ${theme === 'dark' ? 'bg-zinc-200' : 'bg-zinc-800'}`} {...props}>
      </div>
    );
  }
);

DropdownSeparator.displayName = "DropdownSeparator";

export { DropdownSeparator };
