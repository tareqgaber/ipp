import {
  Controller,
  useFormContext,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import clsx from "clsx";
import { type CheckboxProps } from "@radix-ui/react-checkbox";

interface RHFCheckboxProps<T extends FieldValues> extends CheckboxProps {
  name: Path<T>;
  label: string;
  description?: string;
  className?: string;
}

function RHFCheckbox<T extends FieldValues>({
  name,
  label,
  description,
  className,
  ...checkboxProps
}: RHFCheckboxProps<T>) {
  const {
    control,
    formState: { errors },
  } = useFormContext<T>();

  const error = errors[name];

  return (
    <div className={clsx("flex flex-col space-y-1", className)}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="flex items-center space-x-2">
            <Checkbox
              {...checkboxProps}
              checked={field.value || false}
              onCheckedChange={(checked) => field.onChange(checked)}
              id={name as unknown as string}
              className={clsx(
                error && "border-red-600 ring-red-500 ring-offset-1"
              )}
            />
            <Label htmlFor={String(name)} className="font-medium text-sm">
              {label}
            </Label>
          </div>
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
}

export default RHFCheckbox;
