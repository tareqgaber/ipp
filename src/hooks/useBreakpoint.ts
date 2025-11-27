import { useEffect, useState } from 'react';

// Define breakpoints following Tailwind CSS convention
export const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export type Breakpoint = keyof typeof breakpoints;

export interface UseBreakpointReturn {
  /** Current breakpoint name */
  breakpoint: Breakpoint;
  /** Current window width */
  width: number;
  /** Check if current breakpoint is at least the specified one */
  isAbove: (bp: Breakpoint) => boolean;
  /** Check if current breakpoint is below the specified one */
  isBelow: (bp: Breakpoint) => boolean;
  /** Check if current breakpoint matches exactly */
  is: (bp: Breakpoint) => boolean;
  /** Convenience flags for common breakpoints */
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

function getCurrentBreakpoint(width: number): Breakpoint {
  if (width >= breakpoints['2xl']) return '2xl';
  if (width >= breakpoints.xl) return 'xl';
  if (width >= breakpoints.lg) return 'lg';
  if (width >= breakpoints.md) return 'md';
  if (width >= breakpoints.sm) return 'sm';
  return 'xs';
}

/**
 * Hook to detect current breakpoint and provide utilities for responsive rendering
 * 
 * @example
 * ```tsx
 * const { breakpoint, isAbove, isMobile } = useBreakpoint();
 * 
 * // Conditional rendering based on breakpoint
 * {isAbove('md') && <DesktopMenu />}
 * {isMobile && <MobileMenu />}
 * 
 * // Use breakpoint value directly
 * <div className={breakpoint === 'xs' ? 'p-2' : 'p-4'}>
 * ```
 */
export function useBreakpoint(): UseBreakpointReturn {
  const [width, setWidth] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth;
    }
    return breakpoints.lg; // Default for SSR
  });

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    // Set initial width
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const breakpoint = getCurrentBreakpoint(width);

  const isAbove = (bp: Breakpoint): boolean => {
    return width >= breakpoints[bp];
  };

  const isBelow = (bp: Breakpoint): boolean => {
    return width < breakpoints[bp];
  };

  const is = (bp: Breakpoint): boolean => {
    return breakpoint === bp;
  };

  return {
    breakpoint,
    width,
    isAbove,
    isBelow,
    is,
    isMobile: width < breakpoints.md,
    isTablet: width >= breakpoints.md && width < breakpoints.lg,
    isDesktop: width >= breakpoints.lg,
  };
}
