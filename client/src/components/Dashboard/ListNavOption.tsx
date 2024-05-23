import React, { useRef, useState } from "react";
import { cn } from "../../utils/tailwindMerge";

interface ListNavOptionProps {
  icon: React.ReactNode;
  subText: string;
  onClick?: (e?: React.MouseEvent) => void;
  variant?: "default" | "small";
}

export default function ListNavOption({
  icon,
  subText,
  onClick,
  variant,
}: ListNavOptionProps) {
  const [isSubTextVisible, setIsSubTextVisible] = useState<boolean>(false);
  const timerRef = useRef<number | undefined>(undefined);

  const handleMouseEnter = () => {
    timerRef.current = setTimeout(() => {
      setIsSubTextVisible(true);
    }, 300);
  };

  const handleMouseLeave = () => {
    clearTimeout(timerRef.current);
    setIsSubTextVisible(false);
  };

  return (
    <div
      className={cn(
        "group/option relative w-10 h-10 rounded-full center text-zinc-200 cursor-pointer",
        variant === "small" && "w-8 h-8"
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={onClick}
    >
      <div
        className={cn(
          "absolute w-0 h-0 rounded-full top-5 left-5 bg-zinc-600/30 group-hover/option:w-10 group-hover/option:h-10 group-hover/option:top-0 group-hover/option:left-0 transition-all duration-300 z-[4]",
          variant === "small" &&
            "group-hover/option:w-8 group-hover/option:h-8 group-hover/option:top-0 group-hover/option:left-0"
        )}
      ></div>
      <div className="z-[5]">{icon}</div>
      {isSubTextVisible && (
        <div
          className={cn(
            "absolute top-11 w-fit h-6 px-2 rounded-md bg-zinc-800 center text-sm z-[11] text-nowrap",
            variant === "small" && "top-9"
          )}
        >
          {subText}
        </div>
      )}
    </div>
  );
}
