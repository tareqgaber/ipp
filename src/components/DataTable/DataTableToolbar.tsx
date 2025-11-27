import { useEffect, useState, useRef } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { FilterDef, FilterState } from "./types";
import {
  TextFilter,
  NumberFilter,
  SelectFilter,
  MultiSelectFilter,
  DateFilter,
} from "./filters";

interface DataTableToolbarProps {
  // Search
  searchable?: boolean;
  searchPlaceholder?: string;
  searchValue: string;
  onSearchChange: (value: string) => void;

  // Filters
  filters?: FilterDef[];
  filterValues: FilterState;
  onFilterChange: (key: string, value: any) => void;
}

export function DataTableToolbar({
  searchable,
  searchPlaceholder = "Search...",
  searchValue,
  onSearchChange,
  filters = [],
  filterValues,
  onFilterChange,
}: DataTableToolbarProps) {
  const [localSearchValue, setLocalSearchValue] = useState(searchValue);
  const onSearchChangeRef = useRef(onSearchChange);
  const onFilterChangeRef = useRef(onFilterChange);

  // Keep refs updated
  useEffect(() => {
    onSearchChangeRef.current = onSearchChange;
    onFilterChangeRef.current = onFilterChange;
  }, [onSearchChange, onFilterChange]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChangeRef.current(localSearchValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [localSearchValue]);

  // Sync with external search changes
  useEffect(() => {
    setLocalSearchValue(searchValue);
  }, [searchValue]);

  const visibleFilters = filters.filter((f) => !f.hidden);

  if (!searchable && visibleFilters.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {/* Global Search */}
      {searchable && (
        <div className="relative flex-1 min-w-[250px] max-w-sm">
          <Search className="absolute left-2.5 top-3.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder={searchPlaceholder}
            value={localSearchValue}
            onChange={(e) => setLocalSearchValue(e.target.value)}
            className="pl-9"
          />
        </div>
      )}

      {/* Column Filters */}
      {visibleFilters.map((filter) => {
        const value = filterValues[filter.key as string];
        const onChange = (val: any) =>
          onFilterChangeRef.current(filter.key as string, val);

        switch (filter.type) {
          case "text":
            return (
              <TextFilter
                key={filter.key as string}
                label={filter.label}
                value={value || ""}
                onChange={onChange}
                placeholder={filter.placeholder}
              />
            );

          case "number":
            return (
              <NumberFilter
                key={filter.key as string}
                label={filter.label}
                value={value ?? null}
                onChange={onChange}
                placeholder={filter.placeholder}
                min={filter.min}
                max={filter.max}
              />
            );

          case "select":
            return (
              <SelectFilter
                key={filter.key as string}
                label={filter.label}
                value={value}
                onChange={onChange}
                options={filter.options || []}
                placeholder={filter.placeholder}
              />
            );

          case "multi-select":
            return (
              <MultiSelectFilter
                key={filter.key as string}
                label={filter.label}
                value={value || []}
                onChange={onChange}
                options={filter.options || []}
                placeholder={filter.placeholder}
              />
            );

          case "date":
            return (
              <DateFilter
                key={filter.key as string}
                label={filter.label}
                value={value || null}
                onChange={onChange}
                placeholder={filter.placeholder}
              />
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
