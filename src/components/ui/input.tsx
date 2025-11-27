import * as React from "react";

import { cn } from "@/lib/utils";

const sizeVariants = {
  sm: "h-8 px-2.5 py-1 text-sm",
  default: "h-9 px-3 py-1 text-base md:text-sm",
  lg: "h-11 px-3.5 py-1.5 text-base",
};

interface InputProps extends Omit<React.ComponentProps<"input">, "size"> {
  size?: "sm" | "default" | "lg";
}

function Input({ className, type, size = "lg", ...props }: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input w-full min-w-0 rounded-md border bg-transparent shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        sizeVariants[size],
        className
      )}
      {...props}
    />
  );
}

export { Input };
