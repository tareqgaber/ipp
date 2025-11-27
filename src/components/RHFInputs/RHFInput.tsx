import { Controller, useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import clsx from "clsx";
import { type DetailedHTMLProps, type InputHTMLAttributes } from "react";

interface RHFInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  description?: string;
}

const RHFInput = ({ label, description, ...props }: RHFInputProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const name = props.name as string;
  if (!name) {
    console.warn("RHFInput requires a `name` prop");
    return null;
  }

  const error = errors[name];

  return (
    <div className="space-y-1">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Input
            {...field}
            {...props}
            value={field.value ?? ""}
            className={clsx(
              props.className,
              "shadow-none focus:shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 transition-colors duration-150",
              error
                ? // Keep red border always — even when focused
                  "border-red-600 focus:border-red-600 focus-visible:border-red-600"
                : // Default style when no error
                  "border-input focus:border-primary focus-visible:border-primary"
            )}
          />
        )}
      />

      {description && <p className="text-xs text-gray-500">{description}</p>}

      {error && (
        <p className="text-xs text-red-600">
          {errors[name]?.message?.toString()}
        </p>
      )}
    </div>
  );
};

export default RHFInput;
