import { Controller, useFormContext } from "react-hook-form";
import { Toggle } from "@/components/base/toggle/toggle";
import type { ReactNode } from "react";

interface RHFToggleProps {
  name: string;
  label?: string;
  hint?: ReactNode;
  size?: "sm" | "md";
  slim?: boolean;
  disabled?: boolean;
  className?: string;
}

export const RHFToggle = ({
  name,
  label,
  hint,
  size = "sm",
  slim,
  disabled,
  className,
}: RHFToggleProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Toggle
          {...field}
          label={label}
          hint={hint}
          size={size}
          slim={slim}
          isDisabled={disabled}
          isSelected={field.value}
          onChange={field.onChange}
          className={className}
        />
      )}
    />
  );
};

export default RHFToggle;
