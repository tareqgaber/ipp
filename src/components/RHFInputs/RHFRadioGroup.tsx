import {
  Controller,
  useFormContext,
  type FieldValues,
  type Path,
} from "react-hook-form";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import clsx from "clsx";

interface Option {
  label: string;
  value: string;
}

interface RHFRadioGroupProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  options: Option[];
  description?: string;
  className?: string;
  direction?: "row" | "col";
}

function RHFRadioGroup<T extends FieldValues>({
  name,
  label,
  options,
  description,
  className,
  direction = "col",
}: RHFRadioGroupProps<T>) {
  const {
    control,
    formState: { errors },
  } = useFormContext<T>();

  const error = errors[name];

  return (
    <div className="space-y-1">
      {label && (
        <Label className="text-sm font-medium text-gray-700">{label}</Label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <RadioGroup
            onValueChange={(value) => field.onChange(value)}
            value={field.value || ""}
            className={clsx(
              "flex",
              direction === "col" ? "flex-col space-y-2" : "flex-row space-x-4",
              className
            )}
          >
            {options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem
                  id={`${name}-${option.value}`}
                  value={option.value}
                  className={clsx(
                    error && "border-red-600 ring-red-500 ring-offset-1"
                  )}
                />
                <Label htmlFor={`${name}-${option.value}`}>
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )}
      />

      {description && (
        <p className="text-xs text-gray-500">{description}</p>
      )}

      {error && (
        <p className="text-xs text-red-600">
          {errors[name]?.message?.toString()}
        </p>
      )}
    </div>
  );
}


export default RHFRadioGroup;