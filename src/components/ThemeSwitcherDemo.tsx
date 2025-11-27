import { ThemeSwitcher } from './ThemeSwitcher';

/**
 * Demo component showing all ThemeSwitcher variants
 * This can be used as a reference or added to a settings/demo page
 */
export function ThemeSwitcherDemo() {
  return (
    <div className="space-y-8 p-8 bg-background text-foreground">
      <div>
        <h2 className="text-2xl font-bold mb-4">Theme Switcher Variants</h2>
        <p className="text-muted-foreground mb-6">
          Choose your preferred theme switcher style
        </p>
      </div>

      {/* Toggle Variant */}
      <div className="space-y-2">
        <h3 className="font-semibold">Toggle (Default)</h3>
        <p className="text-sm text-muted-foreground">
          Simple icon button that toggles between light and dark
        </p>
        <div className="flex items-center gap-4">
          <ThemeSwitcher />
          <code className="text-sm bg-muted px-2 py-1 rounded">
            {'<ThemeSwitcher />'}
          </code>
        </div>
      </div>

      {/* Select Variant */}
      <div className="space-y-2">
        <h3 className="font-semibold">Select Dropdown</h3>
        <p className="text-sm text-muted-foreground">
          Dropdown with all three options (Light, Dark, System)
        </p>
        <div className="flex items-center gap-4">
          <ThemeSwitcher variant="select" />
          <code className="text-sm bg-muted px-2 py-1 rounded">
            {'<ThemeSwitcher variant="select" />'}
          </code>
        </div>
      </div>

      {/* Buttons Variant */}
      <div className="space-y-2">
        <h3 className="font-semibold">Button Group</h3>
        <p className="text-sm text-muted-foreground">
          Three buttons showing all options at once
        </p>
        <div className="flex items-center gap-4">
          <ThemeSwitcher variant="buttons" />
          <code className="text-sm bg-muted px-2 py-1 rounded">
            {'<ThemeSwitcher variant="buttons" />'}
          </code>
        </div>
      </div>

      {/* Example Cards */}
      <div className="space-y-4 mt-8">
        <h3 className="font-semibold">Theme-aware Components</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-card border border-border rounded-lg">
            <h4 className="font-medium mb-2">Using CSS Variables</h4>
            <p className="text-sm text-muted-foreground">
              This card uses bg-card, border-border, and text-muted-foreground
            </p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h4 className="font-medium mb-2">Using Dark Variant</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              This card uses Tailwind's dark: variant for styling
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
