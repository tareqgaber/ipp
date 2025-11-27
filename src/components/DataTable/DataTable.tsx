import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import type { DataTableProps, SortConfig, FilterState } from "./types";
import { DataTableSkeleton } from "./DataTableSkeleton";
import { DataTablePagination } from "./DataTablePagination";
import { DataTableToolbar } from "./DataTableToolbar";
import { DataTableActiveFilters } from "./DataTableActiveFilters";
import { BadgeCell } from "./cell-renderers";

export function DataTable<TData = any>({
  data,
  columns,
  loading = false,
  error,

  // Filters
  filters = [],
  searchable = false,
  searchPlaceholder,
  onSearchChange,
  onFilterChange,

  // Pagination
  pagination,
  onPageChange,

  // Sorting
  sortable = false,
  defaultSort,
  onSortChange,

  // Selection
  selectable = false,
  selectedRows = new Set(),
  onSelectionChange,

  // UI
  emptyMessage = "No results found.",
  rowKey = "id" as any,
  onRowClick,
  stickyHeader = true,
  className,

  // Animation
  animated = true,
}: DataTableProps<TData>) {
  // Local state
  const [searchValue, setSearchValue] = useState("");
  const [filterValues, setFilterValues] = useState<FilterState>({});
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(
    defaultSort || null
  );

  // Get row ID
  const getRowId = (row: TData): string => {
    if (typeof rowKey === "function") {
      return rowKey(row);
    }
    return String(row[rowKey as keyof TData]);
  };

  // Handle sort - 3 states: asc → desc → none
  const handleSort = (key: string) => {
    if (!sortable) return;

    let newSort: SortConfig | null = null;

    if (sortConfig?.key === key) {
      // Same column - cycle through states
      if (sortConfig.direction === "asc") {
        newSort = { key, direction: "desc" };
      } else if (sortConfig.direction === "desc") {
        newSort = null; // Clear sort
      }
    } else {
      // Different column - start with asc
      newSort = { key, direction: "asc" };
    }

    setSortConfig(newSort);
    onSortChange?.(newSort);
  };

  // Handle filter change
  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filterValues };

    // Remove filter if value is empty/null
    if (
      value === null ||
      value === undefined ||
      value === "" ||
      (Array.isArray(value) && value.length === 0)
    ) {
      delete newFilters[key];
    } else {
      newFilters[key] = value;
    }

    setFilterValues(newFilters);
    onFilterChange?.(newFilters);
  };

  // Handle remove single filter
  const handleRemoveFilter = (key: string) => {
    const newFilters = { ...filterValues };
    delete newFilters[key];
    setFilterValues(newFilters);
    onFilterChange?.(newFilters);
  };

  // Handle clear all filters
  const handleClearAllFilters = () => {
    setFilterValues({});
    setSearchValue("");
    onFilterChange?.({});
    onSearchChange?.("");
  };

  // Handle search change
  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    onSearchChange?.(value);
  };

  // Handle selection
  const handleSelectAll = () => {
    if (!onSelectionChange) return;

    if (selectedRows.size === data.length && data.length > 0) {
      onSelectionChange(new Set());
    } else {
      onSelectionChange(new Set(data.map(getRowId)));
    }
  };

  const handleSelectRow = (rowId: string) => {
    if (!onSelectionChange) return;

    const newSelection = new Set(selectedRows);
    if (newSelection.has(rowId)) {
      newSelection.delete(rowId);
    } else {
      newSelection.add(rowId);
    }
    onSelectionChange(newSelection);
  };

  // Check if all rows are selected
  const allSelected = data.length > 0 && selectedRows.size === data.length;

  // Render cell content
  const renderCell = (
    row: TData,
    column: (typeof columns)[0],
    index: number
  ) => {
    const value = row[column.key as keyof TData];

    // Custom cell renderer
    if (column.cell) {
      return column.cell(row, index);
    }

    // Badge cell type
    if (column.cellType === "badge") {
      const variant = column.badgeVariant?.(value) || "default";
      return <BadgeCell value={value} variant={variant} />;
    }

    // Default text rendering
    if (value === null || value === undefined) {
      return <span className="text-muted-foreground">-</span>;
    }

    return String(value);
  };

  // Show loading skeleton
  if (loading) {
    return (
      <div className={className}>
        {(searchable || filters.length > 0) && (
          <div className="mb-4">
            <DataTableToolbar
              searchable={searchable}
              searchPlaceholder={searchPlaceholder}
              searchValue={searchValue}
              onSearchChange={handleSearchChange}
              filters={filters}
              filterValues={filterValues}
              onFilterChange={handleFilterChange}
            />
          </div>
        )}
        <DataTableSkeleton
          columns={columns.length}
          rows={10}
          showSelection={selectable}
        />
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className={cn("text-center py-10", className)}>
        <p className="text-destructive">Error: {error.message}</p>
      </div>
    );
  }

  // Show empty state
  if (data.length === 0) {
    return (
      <div className={className}>
        {(searchable || filters.length > 0) && (
          <div className="mb-4 space-y-3">
            <DataTableToolbar
              searchable={searchable}
              searchPlaceholder={searchPlaceholder}
              searchValue={searchValue}
              onSearchChange={handleSearchChange}
              filters={filters}
              filterValues={filterValues}
              onFilterChange={handleFilterChange}
            />
            <DataTableActiveFilters
              filters={filterValues}
              filterDefs={filters}
              onRemoveFilter={handleRemoveFilter}
              onClearAll={handleClearAllFilters}
            />
          </div>
        )}
        <div className="text-center py-10 border rounded-lg">
          <p className="text-muted-foreground">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Toolbar */}
      {(searchable || filters.length > 0) && (
        <div className="mb-4 space-y-3">
          <DataTableToolbar
            searchable={searchable}
            searchPlaceholder={searchPlaceholder}
            searchValue={searchValue}
            onSearchChange={handleSearchChange}
            filters={filters}
            filterValues={filterValues}
            onFilterChange={handleFilterChange}
          />
          <DataTableActiveFilters
            filters={filterValues}
            filterDefs={filters}
            onRemoveFilter={handleRemoveFilter}
            onClearAll={handleClearAllFilters}
          />
        </div>
      )}

      {/* Table */}
      <div className="border border-gray-200 rounded-lg">
        <Table>
          <TableHeader
            className={cn(stickyHeader && "sticky top-0 overflow-hidden z-10")}
          >
            <TableRow>
              {/* Selection column */}
              {selectable && (
                <TableHead className="w-12 rounded-ss-lg">
                  <Checkbox
                    checked={allSelected}
                    onCheckedChange={handleSelectAll}
                    aria-label="Select all"
                  />
                </TableHead>
              )}

              {/* Data columns */}
              {columns.map((column) => (
                <TableHead
                  key={column.key as string}
                  style={{ width: column.width }}
                  className={cn(
                    column.headerClassName,
                    column.align === "center" && "text-center",
                    column.align === "right" && "text-right",
                    column.sortable &&
                      "cursor-pointer select-none hover:bg-primary/90",
                    sortConfig?.key === column.key && "bg-primary/90",
                    columns.indexOf(column) === 0 &&
                      !selectable &&
                      "rounded-ts-lg",
                    columns.indexOf(column) === columns.length - 1 &&
                      "rounded-se-lg"
                  )}
                  onClick={() =>
                    column.sortable && handleSort(column.key as string)
                  }
                >
                  <div className="flex items-center gap-2">
                    <span>{column.header}</span>
                    {column.sortable && (
                      <div className="flex flex-col -space-y-1">
                        <ChevronUp
                          className={cn(
                            "h-3 w-3",
                            sortConfig?.key === column.key &&
                              sortConfig.direction === "asc"
                              ? "opacity-100"
                              : "opacity-30"
                          )}
                        />
                        <ChevronDown
                          className={cn(
                            "h-3 w-3",
                            sortConfig?.key === column.key &&
                              sortConfig.direction === "desc"
                              ? "opacity-100"
                              : "opacity-30"
                          )}
                        />
                      </div>
                    )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((row, index) => {
              const rowId = getRowId(row);
              const isSelected = selectedRows.has(rowId);

              const MotionTableRow = animated ? motion(TableRow) : TableRow;

              return (
                <MotionTableRow
                  key={rowId}
                  data-state={isSelected ? "selected" : undefined}
                  onClick={() => onRowClick?.(row)}
                  className={cn(onRowClick && "cursor-pointer")}
                  {...(animated && {
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 },
                    transition: {
                      duration: 0.3,
                      delay: index * 0.1, // Stagger delay (same as staggerChildren in animations.ts)
                      ease: "easeOut",
                    },
                  })}
                >
                  {/* Selection checkbox */}
                  {selectable && (
                    <TableCell>
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => handleSelectRow(rowId)}
                        aria-label={`Select row ${rowId}`}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </TableCell>
                  )}

                  {/* Data cells */}
                  {columns.map((column) => (
                    <TableCell
                      key={column.key as string}
                      className={cn(
                        column.className,
                        column.align === "center" && "text-center",
                        column.align === "right" && "text-right"
                      )}
                    >
                      {renderCell(row, column, index)}
                    </TableCell>
                  ))}
                </MotionTableRow>
              );
            })}
          </TableBody>
        </Table>

        {/* Pagination */}
        {onPageChange && (
          <DataTablePagination
            pagination={pagination}
            onPageChange={onPageChange}
          />
        )}
      </div>
    </div>
  );
}
