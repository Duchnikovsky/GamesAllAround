import React, { createContext, useState } from "react";

interface DropdownRootProps extends React.HTMLAttributes<HTMLDivElement> {
  width: number;
  theme: "light" | "dark";
  trigger: React.ReactNode;
}

export const ThemeContext = createContext<string | null>(null);

const DropdownRoot = React.forwardRef<HTMLDivElement, DropdownRootProps>(
  ({ children, width, theme, trigger, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
      <div ref={ref} className="relative pr-1" {...props}>
        <div
          className={`pl-0.5  cursor-pointer transition-all duration-300 ${
            isOpen ? "text-gray-100" : "text-gray-400 hover:text-gray-100"
          }`}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          {trigger}
        </div>

        {isOpen && (
          <div
            className={`absolute flex flex-col p-2 gap-1 ${
              theme === "dark"
                ? "bg-zinc-800/70 light-shadow"
                : "bg-zinc-200/70 dark-shadow"
            } h-auto rounded-md z-10 items-center`}
            style={{
              width: width + "rem",
              left: `calc(50% - ${width / 2}rem)`,
              transform: "translateY(10%)",
            }}
          >
            <ThemeContext.Provider value={theme}>
              {children}
            </ThemeContext.Provider>
          </div>
        )}
      </div>
    );
  }
);

DropdownRoot.displayName = "DropdownRoot";

export { DropdownRoot };