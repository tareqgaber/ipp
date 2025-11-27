import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

// ============================================
// COLUMN DEFINITION (Display & Rendering)
// ============================================

export interface ColumnDef<TData = any> {
  key: keyof TData | string;
  header: string | ReactNode;

  // Rendering
  cell?: (row: TData, index: number) => ReactNode;
  cellType?: "text" | "badge" | "actions";

  // Sorting
  sortable?: boolean;

  // Styling
  width?: string | number;
  align?: "left" | "center" | "right";
  className?: string;
  headerClassName?: string;

  // Badge-specific (when cellType='badge')
  badgeVariant?: (
    value: any
  ) =>
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "primary"
    | "warning"
    | "pink"
    | "blue"
    | "error"
    | "gray"
    | "success";
}

// ============================================
// FILTER DEFINITION (Separate from columns)
// ============================================

export type FilterType =
  | "text" // Text input
  | "number" // Number input
  | "select" // Single dropdown
  | "multi-select" // Multiple checkboxes
  | "date"; // Single date picker

export interface FilterOption {
  label: string;
  value: any;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface FilterDef<TData = any> {
  key: keyof TData | string;
  label?: string;
  type: FilterType;

  placeholder?: string;
  defaultValue?: any;

  // Type-specific
  options?: FilterOption[]; // For select/multi-select
  min?: number; // For number filter
  max?: number; // For number filter

  // Advanced
  transform?: (value: any) => any;
  validate?: (value: any) => boolean;
  disabled?: boolean;
  hidden?: boolean;
}

// ============================================
// ACTION DEFINITION (Inline in columns)
// ============================================

export interface Action {
  label: string;
  icon?: LucideIcon | ReactNode;
  onClick: () => void | Promise<void>;

  variant?: "default" | "destructive" | "ghost";
  className?: string;

  disabled?: boolean;
  visible?: boolean;

  requireConfirm?: boolean;
  confirmMessage?: string;
  confirmTitle?: string;

  type?: "action" | "separator";
}

export interface ActionsSeparator {
  type: "separator";
}

export type ActionItem = Action | ActionsSeparator;

// ============================================
// SORTING & FILTERING
// ============================================

export interface SortConfig {
  key: string;
  direction: "asc" | "desc";
}

export interface FilterState {
  [key: string]: any;
}

// ============================================
// PAGINATION
// ============================================

export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
}

// ============================================
// DATA TABLE PROPS
// ============================================

export interface DataTableProps<TData = any> {
  // Data
  data: TData[];
  loading?: boolean;
  error?: Error;

  // Configuration (SEPARATED)
  columns: ColumnDef<TData>[];
  filters?: FilterDef<TData>[];

  // Pagination (SIMPLIFIED)
  pagination: PaginationMeta;
  onPageChange?: (page: number) => void;

  // Sorting
  sortable?: boolean;
  defaultSort?: SortConfig;
  onSortChange?: (sort: SortConfig | null) => void;

  // Filtering
  searchable?: boolean;
  searchPlaceholder?: string;
  onSearchChange?: (query: string) => void;
  onFilterChange?: (filters: FilterState) => void;

  // Selection
  selectable?: boolean;
  selectedRows?: Set<string>;
  onSelectionChange?: (selected: Set<string>) => void;

  // UI
  emptyMessage?: string;
  rowKey?: keyof TData | ((row: TData) => string);
  onRowClick?: (row: TData) => void;
  stickyHeader?: boolean;
  className?: string;

  // Animation
  animated?: boolean;
}
