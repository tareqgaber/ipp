import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { FilterOption } from "../types";

interface SelectFilterProps {
  label?: string;
  value: any;
  onChange: (value: any) => void;
  options: FilterOption[];
  placeholder?: string;
}

export function SelectFilter({
  value,
  onChange,
  options,
  placeholder = "Select...",
}: SelectFilterProps) {
  return (
    <Select
      value={value === null || value === undefined ? "" : String(value)}
      onValueChange={(val) => onChange(val === "" ? null : val)}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem
            key={option.value === null ? "null" : String(option.value)}
            value={option.value === null ? "null" : String(option.value)}
            disabled={option.disabled}
          >
            {option.icon && <span className="mr-2">{option.icon}</span>}
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
