import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Button } from './ui/button';

type ThemeSwitcherVariant = 'select' | 'toggle' | 'buttons';

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

export function ThemeSwitcher({ variant = 'toggle' }: ThemeSwitcherProps) {
  const { theme, setTheme, actualTheme } = useTheme();

  if (variant === 'select') {
    return (
      <Select value={theme} onValueChange={(value) => setTheme(value as any)}>
        <SelectTrigger className="w-[140px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">
            <div className="flex items-center gap-2">
              <Sun className="h-4 w-4" />
              Light
            </div>
          </SelectItem>
          <SelectItem value="dark">
            <div className="flex items-center gap-2">
              <Moon className="h-4 w-4" />
              Dark
            </div>
          </SelectItem>
          <SelectItem value="system">
            <div className="flex items-center gap-2">
              <Monitor className="h-4 w-4" />
              System
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    );
  }

  if (variant === 'buttons') {
    return (
      <div className="flex items-center gap-1 border rounded-lg p-1">
        <Button
          variant={theme === 'light' ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => setTheme('light')}
          className="px-3"
        >
          <Sun className="h-4 w-4" />
        </Button>
        <Button
          variant={theme === 'dark' ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => setTheme('dark')}
          className="px-3"
        >
          <Moon className="h-4 w-4" />
        </Button>
        <Button
          variant={theme === 'system' ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => setTheme('system')}
          className="px-3"
        >
          <Monitor className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  // Default: toggle variant
  const handleToggle = () => {
    if (theme === 'system') {
      // If system, switch to opposite of current actual theme
      setTheme(actualTheme === 'dark' ? 'light' : 'dark');
    } else {
      // Toggle between light and dark
      setTheme(theme === 'light' ? 'dark' : 'light');
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
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
