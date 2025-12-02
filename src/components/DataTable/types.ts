import type { ReactNode } from "react";

/**
 * Table parameters for server-side operations
 */
export interface TableParams {
  page: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  search?: string;
  filters?: Record<string, any>;
}

/**
 * Table response structure from API
 */
export interface TableResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}

/**
 * Column configuration for DataTable
 */
export interface DataTableColumn<T> {
  id: string;
  header: string;
  accessorKey?: keyof T;
  sortable?: boolean;
  cell?: (row: T) => ReactNode;
  width?: string;
  align?: "left" | "center" | "right";
}

/**
 * Filter field types
 */
export type FilterFieldType =
  | "text"
  | "select"
  | "multiSelect"
  | "dateRange"
  | "numberRange"
  | "checkbox";

/**
 * Filter field configuration
 */
export interface DataTableFilter {
  type: FilterFieldType;
  name: string;
  label: string;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
  defaultValue?: any;
}

/**
 * Metric card configuration (acts as filter)
 */
export interface DataTableMetricCard {
  id: string;
  label: string;
  value: number | string;
  filterKey: string;
  filterValue: any;
  percentage?: string;
  subtext?: string;
  directionIcon?: "up" | "down";
  clickable?: boolean; // Whether the card can be clicked/activated (default: true)
  isActive?: boolean; // Whether the card is initially active (default: false)
}

/**
 * Row action configuration
 */
export interface DataTableAction<T> {
  id: string;
  label: string;
  icon?: ReactNode;
  onClick: (row: T) => void;
  variant?: "default" | "success" | "danger" | "warning";
  disabled?: (row: T) => boolean;
  hidden?: (row: T) => boolean;
}

/**
 * Bulk action configuration
 */
export interface DataTableBulkAction<T> {
  id: string;
  label: string;
  icon?: ReactNode;
  onClick: (selectedIds: string[], selectedRows: T[]) => void;
  variant?: "default" | "success" | "danger" | "warning";
  confirmMessage?: string;
}

/**
 * Main DataTable configuration
 */
export interface DataTableConfig<T> {
  // Header
  title: string;
  subtitle?: string;

  // Columns
  columns: DataTableColumn<T>[];

  // Metric cards (optional)
  metricCards?: DataTableMetricCard[];
  metricCardsSelectionMode?: "radio" | "checkbox"; // Radio = single selection, Checkbox = multiple selection (default: radio)

  // Filters (optional)
  filters?: DataTableFilter[];

  // Actions
  actions?: DataTableAction<T>[];
  bulkActions?: DataTableBulkAction<T>[];

  // Settings
  enableSearch?: boolean;
  enableFilters?: boolean;
  enableSelection?: boolean;
  searchPlaceholder?: string;
  defaultPageSize?: number;
  pageSizeOptions?: number[];
  size?: "sm" | "md";

  // Row configuration
  getRowId?: (row: T) => string;
  onRowClick?: (row: T) => void;
}

/**
 * Internal table state
 */
export interface DataTableState {
  pagination: {
    page: number;
    pageSize: number;
  };
  sorting: {
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  };
  search: string;
  filters: Record<string, any>;
  activeMetricCard?: string; // For radio mode (single selection)
  activeMetricCards?: string[]; // For checkbox mode (multiple selection)
}
