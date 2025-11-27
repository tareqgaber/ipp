import { Controller, useFormContext } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import { ChevronDown } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import clsx from "clsx";
import "react-phone-number-input/style.css";

interface RHFPhoneInputProps {
  name: string;
  label?: string;
  description?: string;
  placeholder?: string;
  defaultCountry?: string;
  disabled?: boolean;
  className?: string;
}

const RHFPhoneInput = ({
  name,
  label,
  description,
  placeholder = "Enter phone number",
  defaultCountry = "US",
  disabled,
  className,
}: RHFPhoneInputProps) => {
  const {
    control,
    formState: { errors, touchedFields },
  } = useFormContext();

  const error = errors[name];

  return (
    <div className={clsx("space-y-1")}>
      {label && (
        <Label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
        </Label>
      )}

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <div
            className={clsx(
              "flex items-center border rounded-md bg-white px-3 py-2 phone-input",
              error && "border-red-600 focus:ring-red-500 focus:border-red-500"
            )}
          >
            <PhoneInput
              international
              defaultCountry={"SA"}
              value={value}
              onChange={onChange}
              disabled={disabled}
              placeholder={placeholder}
              className={clsx("flex items-center gap-2 w-full", className)}
              inputComponent={Input as any}
            />
          </div>
        )}
      />

      {description && (
        <p className="text-xs text-gray-500">{description}</p>
      )}

      {error && (
        <p className="text-xs text-red-600">{error?.message?.toString()}</p>
      )}
    </div>
  );
};

export default RHFPhoneInput;
