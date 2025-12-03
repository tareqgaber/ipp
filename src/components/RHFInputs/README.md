# React Hook Form (RHF) Wrapper Components

This folder contains React Hook Form wrapper components for Untitled UI base components. Each wrapper integrates seamlessly with React Hook Form using the `Controller` component.

## Components

### RHFInput

Text input field wrapper.

```tsx
import { RHFInput } from "@/components/RHFInputs";

<RHFInput
  name="email"
  label="Email"
  placeholder="Enter your email"
  hint="We'll never share your email"
/>;
```

**Props:**

- `name` (string, required): Field name in the form
- `label` (string): Label text
- `hint` (string): Helper text below input
- `placeholder` (string): Placeholder text
- `disabled` (boolean): Disable the input
- `size` ("sm" | "md"): Input size
- Plus all other `InputBaseProps`

### RHFCheckbox

Checkbox wrapper.

```tsx
import { RHFCheckbox } from "@/components/RHFInputs";

<RHFCheckbox
  name="terms"
  label="I agree to the terms and conditions"
  hint="You must agree to continue"
/>;
```

**Props:**

- `name` (string, required): Field name in the form
- `label` (ReactNode): Label text
- `hint` (ReactNode): Helper text
- `size` ("sm" | "md"): Checkbox size
- `disabled` (boolean): Disable the checkbox

### RHFSelect

Select/dropdown wrapper.

```tsx
import { RHFSelect } from "@/components/RHFInputs";

const countries = [
  { id: "us", label: "United States" },
  { id: "uk", label: "United Kingdom" },
  { id: "ca", label: "Canada" },
];

<RHFSelect
  name="country"
  label="Country"
  placeholder="Select a country"
  items={countries}
>
  {(item) => <SelectItem key={item.id}>{item.label}</SelectItem>}
</RHFSelect>;
```

**Props:**

- `name` (string, required): Field name in the form
- `label` (string): Label text
- `hint` (string): Helper text
- `placeholder` (string): Placeholder text
- `items` (SelectItemType[], required): Array of select options
- `size` ("sm" | "md"): Select size
- `disabled` (boolean): Disable the select
- `children` (ReactNode | function): Render prop for items

### RHFToggle

Toggle/switch wrapper.

```tsx
import { RHFToggle } from "@/components/RHFInputs";

<RHFToggle
  name="notifications"
  label="Enable notifications"
  hint="Receive email notifications"
  slim={false}
/>;
```

**Props:**

- `name` (string, required): Field name in the form
- `label` (string): Label text
- `hint` (ReactNode): Helper text
- `size` ("sm" | "md"): Toggle size
- `slim` (boolean): Use slim variant
- `disabled` (boolean): Disable the toggle

### RHFFileUpload

File upload dropzone wrapper.

```tsx
import { RHFFileUpload } from "@/components/RHFInputs";

<RHFFileUpload
  name="documents"
  hint="SVG, PNG, JPG or GIF (max. 800x400px)"
  accept="image/*"
  allowsMultiple={true}
  maxSize={5 * 1024 * 1024} // 5MB
/>;
```

**Props:**

- `name` (string, required): Field name in the form
- `hint` (string): Helper text
- `disabled` (boolean): Disable the file upload
- `accept` (string): File types to accept
- `allowsMultiple` (boolean): Allow multiple files (default: true)
- `maxSize` (number): Maximum file size in bytes

### RHFDateRangePicker

Date range picker wrapper with presets (from Untitled UI).

```tsx
import { RHFDateRangePicker } from "@/components/RHFInputs";

<RHFDateRangePicker
  name="dateRange"
  label="Date Range"
  hint="Select a date range"
/>;
```

**Props:**

- `name` (string, required): Field name in the form
- `label` (string): Label text
- `hint` (ReactNode): Helper text
- `disabled` (boolean): Disable the date range picker
- `className` (string): Additional CSS classes

**Note:** The value will be stored as an object with `start` and `end` DateValue properties from `@internationalized/date`.

## Usage Example

```tsx
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  RHFInput,
  RHFCheckbox,
  RHFSelect,
  RHFToggle,
  RHFDateRangePicker,
} from "@/components/RHFInputs";

const schema = z.object({
  email: z.string().email("Invalid email"),
  country: z.string().min(1, "Country is required"),
  terms: z.boolean().refine((val) => val === true, "You must agree to terms"),
  notifications: z.boolean(),
});

function MyForm() {
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      country: "",
      terms: false,
      notifications: true,
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
        <RHFInput name="email" label="Email" placeholder="Enter your email" />

        <RHFSelect
          name="country"
          label="Country"
          placeholder="Select a country"
          items={countries}
        >
          {(item) => <SelectItem key={item.id}>{item.label}</SelectItem>}
        </RHFSelect>

        <RHFCheckbox name="terms" label="I agree to the terms and conditions" />

        <RHFToggle name="notifications" label="Enable notifications" />

        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
}
```

## Features

- ✅ Full TypeScript support
- ✅ Automatic error handling and display
- ✅ Seamless integration with React Hook Form
- ✅ Based on accessible Untitled UI components
- ✅ Supports validation with Zod or other validators
- ✅ Consistent API across all components

## Notes

- All components must be used within a `FormProvider` context
- Error messages are automatically displayed in the `hint` prop
- Components use React Hook Form's `Controller` for controlled inputs
- All base component props are forwarded and available
