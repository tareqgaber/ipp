import { useState, useCallback } from "react";

export const useDataTableFilters = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});

  // Open filter drawer
  const openDrawer = useCallback(() => {
    setIsDrawerOpen(true);
  }, []);

  // Close filter drawer
  const closeDrawer = useCallback(() => {
    setIsDrawerOpen(false);
  }, []);

  // Toggle drawer
  const toggleDrawer = useCallback(() => {
    setIsDrawerOpen((prev) => !prev);
  }, []);

  // Apply filters from drawer
  const applyFilters = useCallback((filters: Record<string, any>) => {
    // Remove empty/null/undefined values
    const cleanedFilters = Object.entries(filters).reduce(
      (acc, [key, value]) => {
        if (value !== null && value !== undefined && value !== "") {
          acc[key] = value;
        }
        return acc;
      },
      {} as Record<string, any>
    );

    setActiveFilters(cleanedFilters);
    setIsDrawerOpen(false);
  }, []);

  // Reset filters
  const resetFilters = useCallback(() => {
    setActiveFilters({});
  }, []);

  // Get active filter count
  const activeFilterCount = Object.keys(activeFilters).length;

  return {
    isDrawerOpen,
    activeFilters,
    activeFilterCount,
    openDrawer,
    closeDrawer,
    toggleDrawer,
    applyFilters,
    resetFilters,
  };
};
