import { Controller, useFormContext } from "react-hook-form";
import { Input, type InputBaseProps } from "@/components/base/input/input";

interface RHFInputProps
  extends Omit<InputBaseProps, "name" | "value" | "onChange"> {
  name: string;
  label?: string;
  hint?: string;
  placeholder?: string;
  disabled?: boolean;
}

export const RHFInput = ({ name, label, hint, ...props }: RHFInputProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Input
          {...field}
          {...props}
          label={label}
          hint={error?.message || hint}
          isInvalid={!!error}
          value={field.value ?? ""}
          onChange={(value) => field.onChange(value)}
        />
      )}
    />
  );
};

export default RHFInput;
