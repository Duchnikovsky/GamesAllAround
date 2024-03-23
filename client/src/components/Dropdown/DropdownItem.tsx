import React, { useContext } from "react";
import { ThemeContext } from "./DropdownRoot";

interface DropdownItemProps extends React.HTMLAttributes<HTMLDivElement>{}

const DropdownItem = React.forwardRef<HTMLDivElement, DropdownItemProps>(
  ({ children, ...props }, ref) => {
    const theme = useContext(ThemeContext)
    
    return (
      <div ref={ref} className={`w-full px-2 py-0.5 rounded-md flex justify-between items-center tracking-wider text-lg ${theme === 'dark' ? 'text-zinc-200 hover:text-zinc-900 hover:bg-zinc-200' : 'text-zinc-900 hover:text-zinc-200 hover:bg-zinc-900'} transition-all duration-300 cursor-pointer`}{...props}>
        {children}
      </div>
    );
  }
);

DropdownItem.displayName = "DropdownItem";

export { DropdownItem };
