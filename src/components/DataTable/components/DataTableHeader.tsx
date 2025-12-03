import { Input } from "@/components/base/input/input";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { useState, useEffect } from "react";
import { FilterLines, SearchLg } from "@untitledui/icons";

interface DataTableHeaderProps {
  title: string;
  subtitle?: string;
  searchValue: string;
  searchPlaceholder?: string;
  onSearchChange: (value: string) => void;
  onFilterClick: () => void;
  activeFilterCount: number;
  enableSearch?: boolean;
  enableFilters?: boolean;
}

export const DataTableHeader = ({
  title,
  subtitle,
  searchValue,
  searchPlaceholder,
  onSearchChange,
  onFilterClick,
  activeFilterCount,
  enableSearch = true,
  enableFilters = true,
}: DataTableHeaderProps) => {
  const [localSearch, setLocalSearch] = useState(searchValue);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(localSearch);
    }, 500);

    return () => clearTimeout(timer);
  }, [localSearch, onSearchChange]);

  // Sync with external changes
  useEffect(() => {
    setLocalSearch(searchValue);
  }, [searchValue]);

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      {/* Left: Title and Subtitle */}
      <div className="flex-1">
        <h2 className="text-display-xs-r font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {subtitle}
          </p>
        )}
      </div>

      {/* Right: Search and Filter */}
      <div className="flex items-center gap-3">
        {enableSearch && (
          <div className="w-full sm:w-80">
            <Input
              value={localSearch}
              onChange={setLocalSearch}
              placeholder={searchPlaceholder || "Search..."}
              icon={SearchLg}
              size="md"
            />
          </div>
        )}

        {enableFilters && (
          <div className="relative">
            <Button
              color="secondary"
              size="md"
              onClick={onFilterClick}
              iconLeading={FilterLines}
            >
              Filters
            </Button>
            {activeFilterCount > 0 && (
              <Badge
                color="brand"
                size="md"
                className="absolute -right-2 -top-2"
              >
                {activeFilterCount}
              </Badge>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
