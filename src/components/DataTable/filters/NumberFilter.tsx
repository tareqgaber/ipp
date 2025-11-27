import { Input } from "@/components/ui/input";

interface NumberFilterProps {
  label?: string;
  value: number | null;
  onChange: (value: number | null) => void;
  placeholder?: string;
  min?: number;
  max?: number;
}

export function NumberFilter({
  value,
  onChange,
  placeholder = "Enter number...",
  min,
  max,
}: NumberFilterProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "") {
      onChange(null);
    } else {
      const numVal = Number(val);
      if (!isNaN(numVal)) {
        onChange(numVal);
      }
    }
  };

  return (
    <Input
      type="number"
      value={value ?? ""}
      onChange={handleChange}
      placeholder={placeholder}
      min={min}
      max={max}
      className="w-[160px]"
    />
  );
}
