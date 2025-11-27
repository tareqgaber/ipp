
import * as React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import clsx from "clsx";

interface RHFDateRangePickerProps {
  name: string; 
  label?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  disablePastDates?: boolean;
}

const RHFDateRangePicker = ({
  name,
  label,
  description,
  disabled,
  className,
  placeholder = "Select date range",
  disablePastDates = false,
}: RHFDateRangePickerProps) => {
  const {
    control,
    formState: { errors, touchedFields },
  } = useFormContext();

  const error = errors[name];

  return (
    <div className={clsx("space-y-1", className)}>
      {label && (
        <Label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
        </Label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => {
          const [open, setOpen] = React.useState(false);

          const displayValue =
            value?.from && value?.to
              ? `${format(value.from, "dd/MM/yyyy")} - ${format(value.to, "dd/MM/yyyy")}`
              : "";

          return (
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  id={name}
                  variant="outlined"
                  disabled={disabled}
                  className={cn(
                    "w-full justify-between text-left font-normal",
                    !value && "text-muted-foreground"
                  )}
                >
                  <span>
                    {displayValue || placeholder}
                  </span>
                  <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>

              <PopoverContent
                className="w-auto p-0"
                align="end"
                side="bottom"
              >
                <Calendar
                  mode="range"
                  selected={value}
                  onSelect={(range) => {
                    onChange(range);
                    if (range?.from && range?.to) {
                      setOpen(false); // ✅ Close on selection
                    }
                  }}
                  disabled={disablePastDates ? { before: new Date() } : undefined}
                  numberOfMonths={2}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          );
        }}
      />

      {description && (
        <p className="text-xs text-gray-500">{description}</p>
      )}

      {touchedFields[name] && error && (
        <p className="text-xs text-red-600">
          {error?.message?.toString()}
        </p>
      )}
    </div>
  );
};

export default RHFDateRangePicker