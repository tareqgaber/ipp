import { useState } from "react";
import { Controller, useFormContext,type FieldValues,type Path } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface RHFDatePickerProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}  

export function RHFDatePicker<T extends FieldValues>({
  name,
  label,
  placeholder,
  disabled = false,
  className,
}: RHFDatePickerProps<T>) {
  const {
    control,
    formState: { errors },
  } = useFormContext<T>();

  const error =  errors[name];
  const [open, setOpen] = useState(false); 

  return (
    <div className={cn("flex flex-col space-y-2", className)}>
      {label && (
        <label htmlFor={name} className="font-medium text-sm">
          {label}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outlined"
                color="gray"
                disabled={disabled}
                className={cn(
                  "w-full flex flex-row-reverse justify-between text-right font-normal",
                  !field.value && "text-muted-foreground",
                  error && "border-red-600 ring-red-500 ring-offset-1"
                )}
              >
                <CalendarIcon className="ml-2 h-4 w-4 opacity-70" />
                <span className="flex-1 truncate text-left">
                  {field.value
                    ? format(field.value, "dd/MM/yyyy")
                    : placeholder}
                </span>
              </Button>
            </PopoverTrigger>

            <PopoverContent align="end" className="p-0  flex justify-center items-center">
              <Calendar
                
                className=" w-full"
                mode="single"
                selected={field.value}
                onSelect={(date) => {
                  field.onChange(date);
                  setOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
        )}
      />

      {error && (
        <p className="text-xs text-red-600 mt-1">
          {errors[name]?.message?.toString()}
        </p>
      )}
    </div>
  );
}



export default RHFDatePicker;