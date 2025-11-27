import { Controller, useFormContext } from "react-hook-form";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import type { ReactNode } from "react";

interface RHFCheckboxProps {
  name: string;
  label?: ReactNode;
  hint?: ReactNode;
  size?: "sm" | "md";
  disabled?: boolean;
  className?: string;
}

export const RHFCheckbox = ({
  name,
  label,
  hint,
  size = "sm",
  className,
}: RHFCheckboxProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Checkbox
          {...field}
          label={label}
          hint={hint}
          size={size}
          checked={field.value}
          onChange={field.onChange}
          className={className}
        />
      )}
    />
  );
};

export default RHFCheckbox;
