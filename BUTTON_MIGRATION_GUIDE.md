# Button Component Migration Guide

## Overview
The Button component has been updated with a new variant and color system that provides more flexibility and consistency.

## New API

### Props
- **variant**: `"contained" | "outlined" | "ghost" | "link"`
- **color**: `"primary" | "secondary" | "success" | "orange" | "gray" | "indigo" | "blue" | "error"`
- **size**: `"sm" | "default" | "lg" | "icon" | "icon-sm" | "icon-lg"`
- **loading**: `boolean` - Shows a loading spinner
- **disabled**: `boolean` - Disables the button

### Default Values
- `variant`: `"contained"`
- `color`: `"primary"`
- `size`: `"default"`

## Migration from Old API

### Old → New Variant Mapping

| Old Variant | New Variant + Color |
|-------------|---------------------|
| `variant="default"` | `variant="contained" color="primary"` |
| `variant="outline"` | `variant="outlined" color="gray"` |
| `variant="secondary"` | `variant="contained" color="secondary"` |
| `variant="destructive"` | `variant="contained" color="error"` |
| `variant="ghost"` | `variant="ghost" color="gray"` |
| `variant="link"` | `variant="link" color="primary"` |

## Usage Examples

### Contained Buttons
```tsx
<Button variant="contained" color="primary">Primary</Button>
<Button variant="contained" color="success">Success</Button>
<Button variant="contained" color="error">Delete</Button>
```

### Outlined Buttons
```tsx
<Button variant="outlined" color="primary">Primary Outline</Button>
<Button variant="outlined" color="gray">Cancel</Button>
```

### Ghost Buttons
```tsx
<Button variant="ghost" color="primary">Ghost Primary</Button>
<Button variant="ghost" color="gray">Ghost Gray</Button>
```

### Link Buttons
```tsx
<Button variant="link" color="primary">Learn More</Button>
<Button variant="link" color="blue">Documentation</Button>
```

### Loading State
```tsx
<Button variant="contained" color="primary" loading>
  Processing...
</Button>
```

### Disabled State
```tsx
<Button variant="contained" color="primary" disabled>
  Disabled Button
</Button>
```

### Sizes
```tsx
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
```

### Icon Buttons
```tsx
<Button size="icon" variant="contained" color="primary">
  <Icon />
</Button>
```

## Color Palette

Each color supports all variants and includes:
- **primary**: Brand primary color (blue)
- **secondary**: Secondary theme color
- **success**: Green for success actions
- **orange**: Orange accent color
- **gray**: Neutral gray color
- **indigo**: Indigo accent color
- **blue**: Blue accent color
- **error**: Red for destructive actions

## Features

### Automatic Loading State
When `loading={true}`, the button:
- Shows a spinning loader icon
- Automatically becomes disabled
- Maintains its variant and color styling

### Accessibility
- Focus rings with appropriate colors
- Disabled state with reduced opacity
- Proper ARIA attributes
- Keyboard navigation support

## Files Updated
The following files were migrated to use the new Button API:
- `src/components/ui/button.tsx` - Core button component
- `src/components/examples/VehiclesTableExample.tsx`
- `src/components/AnimationsDemo.tsx`
- `src/components/CounterExample.tsx`
- `src/pages/UnauthorizedPage.tsx`
- `src/pages/LandingPage.tsx`
- `src/pages/DashboardPage.tsx`
- `src/pages/AdminPage.tsx`
- `src/pages/admin/DashboardPage/DashboardPage.tsx`
- `src/components/RHFInputs/RHFDatePicker.tsx`
- `src/components/DataTable/filters/DateFilter.tsx`
- `src/components/DataTable/filters/MultiSelectFilter.tsx`
- `src/components/DataTable/DataTablePagination.tsx`

## Example Component
See `src/components/examples/ButtonExamples.tsx` for a comprehensive showcase of all button variants, colors, and states.
