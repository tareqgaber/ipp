import {
  Controller,
  useFormContext,
  type FieldValues,
  type Path,
} from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import clsx from "clsx";
import { Label } from "@/components/ui/label";

interface Option {
  label: string;
  value: string;
}

interface RHFSelectProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  description?: string;
  options: Option[];
  className?: string;
}

function RHFSelect<T extends FieldValues>({
  name,
  label,
  placeholder,
  description,
  options,
  className,
}: RHFSelectProps<T>) {
  const {
    control,
    formState: { errors },
  } = useFormContext<T>();

 
  const error = errors[name];

  return (
    <div className="space-y-1">
      {label && (
        <Label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
        </Label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            onValueChange={(value) => field.onChange(value)}
            value={field.value || ""}
          >
            <SelectTrigger
              id={name}
              className={clsx(
                "w-full",
                className,
                error && "border-red-600 focus:ring-red-500 focus:border-red-500"
              )}
            >
              <SelectValue placeholder={placeholder || "Select..."} />
            </SelectTrigger>

            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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



export default RHFSelect;