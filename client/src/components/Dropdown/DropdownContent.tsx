import React, { useContext } from "react";
import { ThemeContext } from "./DropdownRoot";

interface DropdownContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const DropdownContent = React.forwardRef<HTMLDivElement, DropdownContentProps>(
  ({ children, ...props }, ref) => {
    const theme = useContext(ThemeContext);

    return (
      <div
        ref={ref}
        className={`w-full flex justify-center text-center tracking-wider ${
          theme === "dark" ? "text-zinc-200" : "text-zinc-900"
        }`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

DropdownContent.displayName = "DropdownContent";

export { DropdownContent };
