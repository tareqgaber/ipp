import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const containerVariants = cva("mx-auto w-full", {
  variants: {
    maxWidth: {
      sm: "max-w-screen-sm",
      md: "max-w-screen-md",
      lg: "max-w-screen-lg",
      xl: "max-w-screen-xl",
      "2xl": "max-w-screen-2xl",
      "7xl": "max-w-7xl",
      full: "max-w-full",
    },
    padding: {
      none: "",
      sm: "px-2",
      md: "px-4",
      lg: "px-6",
      xl: "px-8",
    },
    paddingY: {
      none: "",
      sm: "py-2",
      md: "py-4",
      lg: "py-6",
      xl: "py-8",
    },
  },
  defaultVariants: {
    maxWidth: "7xl",
    padding: "md",
    paddingY: "none",
  },
});

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  as?: React.ElementType;
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, maxWidth, padding, paddingY, as: Component = "div", ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          containerVariants({ maxWidth, padding, paddingY, className })
        )}
        {...props}
      />
    );
  }
);
Container.displayName = "Container";

export { Container, containerVariants };
