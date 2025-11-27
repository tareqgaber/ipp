/**
 * Usage examples for useBreakpoint hook
 */

import { useBreakpoint } from './useBreakpoint';

// Example 1: Conditional rendering based on screen size
export function ResponsiveLayout() {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();

  return (
    <div>
      {isMobile && <MobileLayout />}
      {isTablet && <TabletLayout />}
      {isDesktop && <DesktopLayout />}
    </div>
  );
}

// Example 2: Using isAbove/isBelow for flexibility
export function ResponsiveMenu() {
  const { isAbove, isBelow } = useBreakpoint();

  return (
    <nav>
      {isBelow('md') && <HamburgerMenu />}
      {isAbove('md') && <FullNavigationBar />}
    </nav>
  );
}

// Example 3: Using breakpoint value directly
export function ResponsiveCard() {
  const { breakpoint } = useBreakpoint();

  const padding = {
    xs: 'p-2',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8',
    '2xl': 'p-10',
  }[breakpoint];

  return <div className={padding}>Card content</div>;
}

// Example 4: Getting current width
export function WindowWidth() {
  const { width } = useBreakpoint();

  return <div>Current width: {width}px</div>;
}

// Example 5: Complex responsive logic
export function ResponsiveGrid() {
  const { isAbove, isMobile } = useBreakpoint();

  const columns = isMobile ? 1 : isAbove('lg') ? 3 : 2;

  return (
    <div className={`grid grid-cols-${columns} gap-4`}>
      {/* Grid items */}
    </div>
  );
}

// Placeholder components for examples
function MobileLayout() {
  return <div>Mobile Layout</div>;
}
function TabletLayout() {
  return <div>Tablet Layout</div>;
}
function DesktopLayout() {
  return <div>Desktop Layout</div>;
}
function HamburgerMenu() {
  return <button>☰</button>;
}
function FullNavigationBar() {
  return <nav>Full Navigation</nav>;
}
