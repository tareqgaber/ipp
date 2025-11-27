# Theme System Documentation

This project includes a complete dark/light theme system with system preference support.

## Features

- ✅ Light, Dark, and System theme modes
- ✅ Persists theme preference to localStorage
- ✅ Automatic system preference detection
- ✅ Smooth transitions between themes
- ✅ Multiple switcher variants (toggle, select, buttons)
- ✅ Tailwind CSS integration with CSS variables

## Quick Start

### Using the Theme Switcher Component

The `ThemeSwitcher` component is already added to the app. It comes in three variants:

#### 1. Toggle Variant (Default)
Simple icon button that toggles between light and dark:

```tsx
import { ThemeSwitcher } from '@/components/ThemeSwitcher';

<ThemeSwitcher />
```

#### 2. Select Variant
Dropdown with all three options (Light, Dark, System):

```tsx
<ThemeSwitcher variant="select" />
```

#### 3. Buttons Variant
Three buttons showing all options:

```tsx
<ThemeSwitcher variant="buttons" />
```

## Using the Theme Hook

You can access and control the theme programmatically:

```tsx
import { useTheme } from '@/contexts/ThemeContext';

function MyComponent() {
  const { theme, setTheme, actualTheme } = useTheme();

  return (
    <div>
      <p>Current theme preference: {theme}</p>
      <p>Actual theme (resolved): {actualTheme}</p>
      
      <button onClick={() => setTheme('dark')}>Dark</button>
      <button onClick={() => setTheme('light')}>Light</button>
      <button onClick={() => setTheme('system')}>System</button>
    </div>
  );
}
```

### Hook Return Values

- `theme`: Current theme preference (`'light' | 'dark' | 'system'`)
- `setTheme(theme)`: Function to change the theme
- `actualTheme`: The resolved theme (`'light' | 'dark'`), useful when theme is set to 'system'

## Styling Components for Dark Mode

### Using Tailwind's `dark:` Variant

```tsx
<div className="bg-white dark:bg-gray-800 text-black dark:text-white">
  Content
</div>
```

### Using CSS Variables

Preferred method for consistent theming:

```tsx
<div className="bg-background text-foreground">
  <div className="bg-card text-card-foreground">
    Card content
  </div>
</div>
```

Available CSS variables (automatically switch in dark mode):
- `background` / `foreground`
- `card` / `card-foreground`
- `primary` / `primary-foreground`
- `secondary` / `secondary-foreground`
- `muted` / `muted-foreground`
- `accent` / `accent-foreground`
- `destructive`
- `border`
- `input`
- `ring`

## Theme Configuration

Theme colors are defined in `src/index.css`:

### Light Theme
```css
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  /* ... more variables */
}
```

### Dark Theme
```css
.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  /* ... more variables */
}
```

## How It Works

1. **ThemeProvider** wraps the app in `main.tsx`
2. Theme preference is saved to localStorage
3. The `.dark` class is toggled on `<html>` element
4. CSS variables automatically switch based on the class
5. System theme is detected via `prefers-color-scheme` media query

## Examples in the Codebase

### Dashboard Page
Shows the theme switcher in the header alongside language switcher and logout button.

File: `src/pages/DashboardPage.tsx`

```tsx
<div className="flex items-center gap-2">
  <ThemeSwitcher />
  <LanguageSwitcher />
  <Button>Logout</Button>
</div>
```

### Landing Page
Shows theme switcher in top-right corner with gradient that adapts to theme.

File: `src/pages/LandingPage.tsx`

```tsx
<div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
  <div className="absolute top-4 right-4">
    <ThemeSwitcher />
  </div>
</div>
```

## Customization

### Change Default Theme

Edit `main.tsx`:

```tsx
<ThemeProvider defaultTheme="dark"> {/* or 'light' or 'system' */}
  <App />
</ThemeProvider>
```

### Custom Theme Colors

Edit `src/index.css` to change color values for light/dark themes.

### Add New Theme Variants

The system currently supports light/dark, but you can extend it by:
1. Adding new CSS classes in `index.css`
2. Extending the `Theme` type in `ThemeContext.tsx`
3. Adding new options to the switcher

## Accessibility

- Theme switcher has proper ARIA labels
- Keyboard navigable
- Screen reader friendly
- Respects user's system preferences by default

## Browser Support

- localStorage for persistence
- CSS custom properties
- `prefers-color-scheme` media query
- Works in all modern browsers
