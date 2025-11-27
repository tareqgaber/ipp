import { Controller, useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface RHFToggleProps {
  name: string;
  label?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
}

const RHFToggle = ({
  name,
  label,
  description,
  disabled,
  className,
}: RHFToggleProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  return (
    <div className={className}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <div className="flex items-center justify-between space-x-2">
            <div className="flex flex-col">
              {label && (
                <Label htmlFor={name} className="text-sm font-medium text-gray-700">
                  {label}
                </Label>
              )}
              {description && (
                <span className="text-xs text-gray-500">{description}</span>
              )}
              {error && (
                <p className="text-xs text-red-600 mt-1">
                  {error.message?.toString()}
                </p>
              )}
            </div>

            <Switch
              id={name}
              checked={!!field.value}
              onCheckedChange={field.onChange}
              disabled={disabled}
            />
          </div>
        )}
      />
    </div>
  );
};

export default RHFToggle;
