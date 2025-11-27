# Spend Field Formatting - Implementation Guide

## Overview
The Spend (SAR) field requires custom formatting that is not yet implemented:

### Requirements
1. **Input Formatting**: Add commas between thousands during input (e.g., 6,000,000)
2. **Display Formatting**: Convert large numbers to abbreviated format (e.g., 6 M for millions, 6 K for thousands)

## Implementation Options

### Option 1: Create Custom RHFCurrencyInput Component
Create a new component `src/components/RHFInputs/RHFCurrencyInput.tsx` that:
- Formats input with thousand separators using `Intl.NumberFormat`
- Stores the raw numeric value in the form state
- Displays abbreviated values (K, M, B) for large numbers

### Option 2: Add Formatting to Existing RHFInput
Extend the `RHFInput` component to accept a `formatCurrency` prop that enables:
- Automatic comma insertion on input
- Display transformation on blur

## Recommended Approach

```typescript
// src/components/RHFInputs/RHFCurrencyInput.tsx
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RHFCurrencyInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
}

const RHFCurrencyInput = ({ name, label, placeholder, required }: RHFCurrencyInputProps) => {
  const { control, formState: { errors } } = useFormContext();

  const formatDisplay = (value: number): string => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)} M`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)} K`;
    return value.toString();
  };

  const formatInput = (value: number): string => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  const parseInput = (value: string): number => {
    return parseFloat(value.replace(/,/g, '')) || 0;
  };

  return (
    <div className="space-y-1">
      {label && (
        <Label htmlFor={name}>
          {label} {required && <span className="text-red-600">*</span>}
        </Label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <Input
            id={name}
            placeholder={placeholder}
            value={formatInput(value || 0)}
            onChange={(e) => {
              const numValue = parseInput(e.target.value);
              onChange(numValue);
            }}
            onBlur={onBlur}
          />
        )}
      />
      {errors[name] && (
        <p className="text-xs text-red-600">{errors[name]?.message?.toString()}</p>
      )}
    </div>
  );
};

export default RHFCurrencyInput;
```

## Usage

Update `OpportunityInfoStep.tsx`:
```typescript
import RHFCurrencyInput from "@/components/RHFInputs/RHFCurrencyInput";

// Replace the spend RHFInput with:
<RHFCurrencyInput
  name="spend"
  label="Spend (SAR)"
  placeholder="Enter Spend (SAR)"
  required
/>
```

## Additional Considerations
- Consider using a library like `react-number-format` for more robust formatting
- Add validation to prevent invalid characters
- Handle edge cases (negative numbers, decimals, very large numbers)
- Add unit tests for formatting and parsing functions
