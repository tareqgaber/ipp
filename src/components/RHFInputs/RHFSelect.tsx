import { Controller, useFormContext } from "react-hook-form";
import { Select, type SelectItemType } from "@/components/base/select/select";
import type { ReactNode } from "react";

interface RHFSelectProps {
  name: string;
  label?: string;
  hint?: string;
  placeholder?: string;
  items: SelectItemType[];
  size?: "sm" | "md";
  disabled?: boolean;
  children: ReactNode | ((item: SelectItemType) => ReactNode);
}

export const RHFSelect = ({
  name,
  label,
  hint,
  placeholder,
  items,
  size = "sm",
  disabled,
  children,
}: RHFSelectProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Select
          {...field}
          label={label}
          hint={error?.message || hint}
          placeholder={placeholder}
          items={items}
          size={size}
          isDisabled={disabled}
          selectedKey={field.value}
          onSelectionChange={(key) => field.onChange(key)}
        >
          {children}
        </Select>
      )}
    />
  );
};

export default RHFSelect;
