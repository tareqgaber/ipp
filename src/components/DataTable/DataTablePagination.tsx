import { Pagination } from "@/components/ui/pagination";
import type { PaginationMeta } from "./types";

interface DataTablePaginationProps {
  pagination: PaginationMeta;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
}

export function DataTablePagination({
  pagination,
  onPageChange,
  maxVisiblePages = 5,
}: DataTablePaginationProps) {
  return (
    <Pagination
      currentPage={pagination.currentPage}
      totalPages={pagination.totalPages}
      onPageChange={onPageChange}
      maxVisiblePages={maxVisiblePages}
      className="px-6 py-3 border-t border-gray-200"
    />
  );
}
