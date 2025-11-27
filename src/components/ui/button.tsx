import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        contained: "",
        outlined: "border bg-background shadow-xs",
        ghost: "",
        link: "underline-offset-4 hover:underline",
      },
      color: {
        primary: "",
        secondary: "",
        success: "",
        orange: "",
        gray: "",
        indigo: "",
        blue: "",
        error: "",
      },
      size: {
        sm: "h-9 px-3 text-xs has-[>svg]:px-2.5",
        md: "h-10 px-4 text-sm has-[>svg]:px-3",
        lg: "h-11 px-4 text-base has-[>svg]:px-3",
        xl: "h-12 px-5 text-lg has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    compoundVariants: [
      // Contained variants with colors
      {
        variant: "contained",
        color: "primary",
        className:
          "bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 focus-visible:ring-primary-600/30",
      },
      {
        variant: "contained",
        color: "secondary",
        className:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      },
      {
        variant: "contained",
        color: "success",
        className:
          "bg-green-600 text-white hover:bg-green-700 active:bg-green-800 focus-visible:ring-green-600/30",
      },
      {
        variant: "contained",
        color: "orange",
        className:
          "bg-orange-500 text-white hover:bg-orange-700 active:bg-orange-800 focus-visible:ring-orange-600/30",
      },
      {
        variant: "contained",
        color: "gray",
        className:
          "bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800 focus-visible:ring-gray-600/30",
      },
      {
        variant: "contained",
        color: "indigo",
        className:
          "bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 focus-visible:ring-indigo-600/30",
      },
      {
        variant: "contained",
        color: "blue",
        className:
          "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus-visible:ring-blue-600/30",
      },
      {
        variant: "contained",
        color: "error",
        className:
          "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus-visible:ring-red-600/30",
      },

      // Outlined variants with colors
      {
        variant: "outlined",
        color: "primary",
        className:
          "border-primary-600 text-primary-600 hover:bg-primary-50 active:bg-primary-100 dark:hover:bg-primary-950/20 dark:active:bg-primary-950/40",
      },
      {
        variant: "outlined",
        color: "secondary",
        className:
          "border-secondary text-secondary-foreground hover:bg-secondary/20 dark:hover:bg-secondary/10",
      },
      {
        variant: "outlined",
        color: "success",
        className:
          "border-green-600 text-green-600 hover:bg-green-50 active:bg-green-100 dark:hover:bg-green-950/20 dark:active:bg-green-950/40",
      },
      {
        variant: "outlined",
        color: "orange",
        className:
          "border-orange-600 text-orange-600 hover:bg-orange-50 active:bg-orange-100 dark:hover:bg-orange-950/20 dark:active:bg-orange-950/40",
      },
      {
        variant: "outlined",
        color: "gray",
        className:
          "border-input text-gray-600 shadow-xs hover:bg-gray-50 active:bg-gray-100 dark:hover:bg-gray-950/20 dark:active:bg-gray-950/40",
      },
      {
        variant: "outlined",
        color: "indigo",
        className:
          "border-indigo-600 text-indigo-600 hover:bg-indigo-50 active:bg-indigo-100 dark:hover:bg-indigo-950/20 dark:active:bg-indigo-950/40",
      },
      {
        variant: "outlined",
        color: "blue",
        className:
          "border-blue-600 text-blue-600 hover:bg-blue-50 active:bg-blue-100 dark:hover:bg-blue-950/20 dark:active:bg-blue-950/40",
      },
      {
        variant: "outlined",
        color: "error",
        className:
          "border-red-600 text-red-600 hover:bg-red-50 active:bg-red-100 dark:hover:bg-red-950/20 dark:active:bg-red-950/40",
      },

      // Ghost variants with colors
      {
        variant: "ghost",
        color: "primary",
        className:
          "text-primary-600 hover:bg-primary-50 active:bg-primary-100 dark:hover:bg-primary-950/20 dark:active:bg-primary-950/40",
      },
      {
        variant: "ghost",
        color: "secondary",
        className:
          "text-secondary-foreground hover:bg-secondary/20 dark:hover:bg-secondary/10",
      },
      {
        variant: "ghost",
        color: "success",
        className:
          "text-green-600 hover:bg-green-50 active:bg-green-100 dark:hover:bg-green-950/20 dark:active:bg-green-950/40",
      },
      {
        variant: "ghost",
        color: "orange",
        className:
          "text-orange-600 hover:bg-orange-50 active:bg-orange-100 dark:hover:bg-orange-950/20 dark:active:bg-orange-950/40",
      },
      {
        variant: "ghost",
        color: "gray",
        className:
          "text-gray-600 hover:bg-gray-50 active:bg-gray-100 dark:hover:bg-gray-950/20 dark:active:bg-gray-950/40",
      },
      {
        variant: "ghost",
        color: "indigo",
        className:
          "text-indigo-600 hover:bg-indigo-50 active:bg-indigo-100 dark:hover:bg-indigo-950/20 dark:active:bg-indigo-950/40",
      },
      {
        variant: "ghost",
        color: "blue",
        className:
          "text-blue-600 hover:bg-blue-50 active:bg-blue-100 dark:hover:bg-blue-950/20 dark:active:bg-blue-950/40",
      },
      {
        variant: "ghost",
        color: "error",
        className:
          "text-red-600 hover:bg-red-50 active:bg-red-100 dark:hover:bg-red-950/20 dark:active:bg-red-950/40",
      },

      // Link variants with colors
      {
        variant: "link",
        color: "primary",
        className: "text-primary-600 hover:text-primary-700",
      },
      {
        variant: "link",
        color: "secondary",
        className:
          "text-secondary-foreground hover:text-secondary-foreground/80",
      },
      {
        variant: "link",
        color: "success",
        className: "text-green-600 hover:text-green-700",
      },
      {
        variant: "link",
        color: "orange",
        className: "text-orange-600 hover:text-orange-700",
      },
      {
        variant: "link",
        color: "gray",
        className: "text-gray-600 hover:text-gray-700",
      },
      {
        variant: "link",
        color: "indigo",
        className: "text-indigo-600 hover:text-indigo-700",
      },
      {
        variant: "link",
        color: "blue",
        className: "text-blue-600 hover:text-blue-700",
      },
      {
        variant: "link",
        color: "error",
        className: "text-red-600 hover:text-red-700",
      },
    ],
    defaultVariants: {
      variant: "contained",
      color: "primary",
      size: "lg",
    },
  }
);

export interface ButtonProps
  extends Omit<React.ComponentProps<"button">, "color">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

function Button({
  className,
  variant,
  color,
  size,
  asChild = false,
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  // When using asChild, we need to clone the child and pass props to it
  if (asChild) {
    return (
      <Comp
        data-slot="button"
        className={cn(buttonVariants({ variant, color, size, className }))}
        disabled={disabled || loading}
        {...props}
      >
        {children}
      </Comp>
    );
  }

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, color, size, className }))}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="animate-spin" />}
      {children}
    </Comp>
  );
}

export { Button, buttonVariants };
