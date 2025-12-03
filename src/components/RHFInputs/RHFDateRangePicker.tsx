import { Controller, useFormContext } from "react-hook-form";
import { DateRangePicker } from "@/components/application/date-picker/date-range-picker";
import type { ReactNode } from "react";

interface RHFDateRangePickerProps {
  name: string;
  label?: string;
  hint?: ReactNode;
  disabled?: boolean;
  className?: string;
  hidePresets?: boolean;
}

export const RHFDateRangePicker = ({
  name,
  label,
  hint,
  disabled,
  className,
  hidePresets = false,
}: RHFDateRangePickerProps) => {
  const { control } = useFormContext();

  return (
    <div className={className}>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div>
            <DateRangePicker
              value={field.value}
              onChange={field.onChange}
              isDisabled={disabled}
              hidePresets={hidePresets}
              onApply={() => {
                // Optional: trigger form validation or other actions on apply
              }}
            />
            {(error?.message || hint) && (
              <p
                className={`mt-1.5 text-sm ${
                  error
                    ? "text-error-600 dark:text-error-400"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                {error?.message || hint}
              </p>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default RHFDateRangePicker;
