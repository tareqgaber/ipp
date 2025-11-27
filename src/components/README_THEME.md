# Theme Switcher Implementation Guide

## Quick Start

The theme switcher is ready to use! It's already integrated into:

### 🎯 Pages with Theme Switcher

1. **Landing Page** (`/`)
   - Top-right corner
   - Toggle variant (sun/moon icon)

2. **Login Page** (`/login`)
   - Top-right corner
   - Toggle variant with language switcher

3. **Dashboard Page** (`/dashboard`)
   - Header area
   - Toggle variant alongside logout button

## Usage Examples

### Basic Usage

```tsx
import { ThemeSwitcher } from '@/components/ThemeSwitcher';

function MyPage() {
  return (
    <div>
      <ThemeSwitcher />
    </div>
  );
}
```

### With Variants

```tsx
// Toggle button (default)
<ThemeSwitcher />

// Dropdown select
<ThemeSwitcher variant="select" />

// Button group
<ThemeSwitcher variant="buttons" />
```

### Programmatic Control

```tsx
import { useTheme } from '@/hooks';

function MyComponent() {
  const { theme, setTheme, actualTheme } = useTheme();

  return (
    <div>
      <p>Current: {theme}</p>
      <button onClick={() => setTheme('dark')}>Dark Mode</button>
      <button onClick={() => setTheme('light')}>Light Mode</button>
      <button onClick={() => setTheme('system')}>System</button>
    </div>
  );
}
```

## Styling Guide

### Recommended: CSS Variables

```tsx
// These automatically adapt to theme
<div className="bg-background text-foreground">
  <div className="bg-card text-card-foreground p-4 border border-border rounded">
    <h2 className="text-primary">Title</h2>
    <p className="text-muted-foreground">Description</p>
  </div>
</div>
```

### Alternative: Tailwind Dark Variant

```tsx
<div className="bg-white dark:bg-gray-900 text-black dark:text-white">
  <p className="text-gray-600 dark:text-gray-300">
    Custom styled text
  </p>
</div>
```

## Available CSS Variables

### Colors
- `background` / `foreground` - Main background and text
- `card` / `card-foreground` - Card backgrounds
- `primary` / `primary-foreground` - Primary brand colors
- `secondary` / `secondary-foreground` - Secondary colors
- `muted` / `muted-foreground` - Muted/subtle colors
- `accent` / `accent-foreground` - Accent colors
- `destructive` - Destructive/error colors

### UI Elements
- `border` - Border color
- `input` - Input border color
- `ring` - Focus ring color

## Implementation Details

### Files Created

```
src/
├── contexts/
│   ├── ThemeContext.tsx           # Theme context & logic
│   └── index.ts                   # Context exports
├── providers/
│   └── ThemeProvider.tsx          # Provider wrapper
├── components/
│   ├── ThemeSwitcher.tsx          # Main component
│   ├── ThemeSwitcherDemo.tsx      # Demo/reference
│   ├── THEME_SYSTEM.md            # Full documentation
│   └── README_THEME.md            # This file
└── main.tsx                       # ✅ Provider integrated
```

### Files Modified

```
src/
├── main.tsx                       # Added ThemeProvider
├── hooks/index.ts                 # Added useTheme export
├── providers/index.ts             # Added ThemeProvider export
├── pages/
│   ├── LandingPage.tsx            # Added theme switcher
│   ├── LoginPage.tsx              # Added theme switcher + dark mode
│   └── DashboardPage.tsx          # Added theme switcher
└── index.css                      # Already had theme variables ✅
```

## Configuration

### Default Theme

In `src/main.tsx`:

```tsx
<ThemeProvider defaultTheme="system"> {/* 'light' | 'dark' | 'system' */}
  {/* app */}
</ThemeProvider>
```

### Custom Colors

Edit `src/index.css`:

```css
:root {
  /* Light theme colors */
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  /* ... more variables */
}

.dark {
  /* Dark theme colors */
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  /* ... more variables */
}
```

## Features

✅ **Three Theme Modes**
- Light mode
- Dark mode  
- System preference (auto-detects OS theme)

✅ **Persistent**
- Saves to localStorage
- Restores on page reload

✅ **Reactive**
- Listens to system theme changes
- Updates automatically

✅ **Multiple Variants**
- Toggle button (default)
- Dropdown select
- Button group

✅ **Accessible**
- Proper ARIA labels
- Keyboard navigable
- Screen reader friendly

✅ **Smooth Animations**
- Icon transitions
- Theme switching

## Testing

### Manual Testing

1. Open any page with the theme switcher
2. Click the sun/moon icon to toggle
3. Theme should change immediately
4. Reload the page - theme should persist
5. Try the select variant to test all three options
6. Change your OS theme to test system mode

### System Theme Test

1. Set switcher to "System" mode
2. Change your operating system's theme
3. App theme should follow automatically

## Browser Support

- ✅ All modern browsers
- ✅ localStorage support
- ✅ CSS custom properties
- ✅ prefers-color-scheme media query

## Demo Component

To see all variants in one place, import the demo:

```tsx
import { ThemeSwitcherDemo } from '@/components/ThemeSwitcherDemo';

<ThemeSwitcherDemo />
```

## Troubleshooting

### Theme not persisting
- Check browser localStorage is enabled
- Clear localStorage and try again

### Dark mode not working
- Verify `.dark` class is on `<html>` element
- Check CSS variables are defined in `index.css`
- Ensure using `dark:` variant or CSS variables

### Icons not showing
- Verify `lucide-react` is installed
- Check imports in ThemeSwitcher.tsx

## Next Steps

1. **Customize colors** - Edit theme variables in `index.css`
2. **Add to more pages** - Import and use `<ThemeSwitcher />`
3. **Create settings page** - Let users choose their preferred variant
4. **Add transitions** - Customize theme switch animations

## Resources

- Full Documentation: `src/components/THEME_SYSTEM.md`
- Setup Guide: `THEME_SETUP.md` (root directory)
- Demo Component: `src/components/ThemeSwitcherDemo.tsx`
- Context: `src/contexts/ThemeContext.tsx`
