import { useEffect, useState } from "react";

type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl" | "xs";

const breakpoints: Record<Breakpoint, number> = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

export function useBreakpoint() {
  const [width, setWidth] = useState<number>(typeof window !== "undefined" ? window.innerWidth : 0);
  const [breakpoint, setBreakpoint] = useState<Breakpoint>("xs");

  const calculateBreakpoint = (w: number): Breakpoint => {
    if (w >= breakpoints["2xl"]) return "2xl";
    if (w >= breakpoints.xl) return "xl";
    if (w >= breakpoints.lg) return "lg";
    if (w >= breakpoints.md) return "md";
    if (w >= breakpoints.sm) return "sm";
    return "xs";
  };
  
  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setWidth(newWidth);
      setBreakpoint(calculateBreakpoint(newWidth));
    };

    handleResize(); 
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { width, breakpoint, isMobile : width < 768 };
}
