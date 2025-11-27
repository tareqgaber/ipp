import { useState } from "react";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { FilterOption } from "../types";

interface MultiSelectFilterProps {
  label?: string;
  value: any[];
  onChange: (value: any[]) => void;
  options: FilterOption[];
  placeholder?: string;
}

export function MultiSelectFilter({
  value = [],
  onChange,
  options,
  placeholder = "Select...",
}: MultiSelectFilterProps) {
  const [open, setOpen] = useState(false);

  const handleToggle = (optionValue: any) => {
    const newValue = value.includes(optionValue)
      ? value.filter((v) => v !== optionValue)
      : [...value, optionValue];
    onChange(newValue);
  };

  const handleSelectAll = () => {
    if (value.length === options.length) {
      onChange([]);
    } else {
      onChange(options.map((opt) => opt.value));
    }
  };

  const selectedLabels = options
    .filter((opt) => value.includes(opt.value))
    .map((opt) => opt.label);

  const displayText =
    selectedLabels.length > 0
      ? selectedLabels.length > 2
        ? `${selectedLabels.length} selected`
        : selectedLabels.join(", ")
      : placeholder;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outlined"
          color="gray"
          role="combobox"
          aria-expanded={open}
          className="h-11 text-md w-[200px] justify-between font-normal"
        >
          <span className="truncate">{displayText}</span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <div className="max-h-64 overflow-y-auto p-3 space-y-2">
          {/* Select All */}
          <div className="flex items-center space-x-2 pb-2 border-b">
            <Checkbox
              id="select-all"
              checked={value.length === options.length}
              onCheckedChange={handleSelectAll}
            />
            <label
              htmlFor="select-all"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              Select All
            </label>
          </div>

          {/* Options */}
          {options.map((option) => (
            <div
              key={String(option.value)}
              className="flex items-center space-x-2"
            >
              <Checkbox
                id={`filter-${String(option.value)}`}
                checked={value.includes(option.value)}
                onCheckedChange={() => handleToggle(option.value)}
                disabled={option.disabled}
              />
              <label
                htmlFor={`filter-${String(option.value)}`}
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
              >
                {option.icon && <span className="mr-2">{option.icon}</span>}
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
