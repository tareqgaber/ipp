import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { Select } from "./base/select/select";
import { Button } from "./base/buttons/button";

type ThemeSwitcherVariant = "select" | "toggle" | "buttons";

interface ThemeSwitcherProps {
  /**
   * Variant of the theme switcher
   * - 'select': Dropdown select with all options
   * - 'toggle': Simple toggle between light/dark
   * - 'buttons': Three buttons for light/dark/system
   * @default 'toggle'
   */
  variant?: ThemeSwitcherVariant;
}

export function ThemeSwitcher({ variant = "toggle" }: ThemeSwitcherProps) {
  const { theme, setTheme, actualTheme } = useTheme();

  if (variant === "select") {
    const items = [
      { id: "light", label: "Light", icon: Sun },
      { id: "dark", label: "Dark", icon: Moon },
      { id: "system", label: "System", icon: Monitor },
    ];

    return (
      <Select
        selectedKey={theme}
        onSelectionChange={(value) => setTheme(value as any)}
        items={items}
        className="w-[140px]"
      >
        {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
      </Select>
    );
  }

  if (variant === "buttons") {
    return (
      <div className="flex items-center gap-1 border rounded-lg p-1">
        <Button
          color={theme === "light" ? "secondary" : "tertiary"}
          size="sm"
          onClick={() => setTheme("light")}
          iconLeading={Sun}
        />
        <Button
          color={theme === "dark" ? "secondary" : "tertiary"}
          size="sm"
          onClick={() => setTheme("dark")}
          iconLeading={Moon}
        />
        <Button
          color={theme === "system" ? "secondary" : "tertiary"}
          size="sm"
          onClick={() => setTheme("system")}
          iconLeading={Monitor}
        />
      </div>
    );
  }

  // Default: toggle variant
  const handleToggle = () => {
    if (theme === "system") {
      // If system, switch to opposite of current actual theme
      setTheme(actualTheme === "dark" ? "light" : "dark");
    } else {
      // Toggle between light and dark
      setTheme(theme === "light" ? "dark" : "light");
    }
  };

  return (
    <Button
      color="tertiary"
      size="sm"
      onClick={handleToggle}
      className="relative"
      aria-label="Toggle theme"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
