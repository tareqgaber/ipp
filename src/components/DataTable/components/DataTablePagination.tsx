import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/base/buttons/button";

interface DataTablePaginationProps {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  pageSizeOptions?: number[];
}

export const DataTablePagination = ({
  currentPage,
  pageSize,
  totalItems,
  totalPages,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 25, 50, 100],
}: DataTablePaginationProps) => {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <div className="flex flex-col gap-4 border-t border-gray-200 px-4 py-3 dark:border-gray-700 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      {/* Left: Results info */}
      <div className="text-sm text-gray-700 dark:text-gray-300">
        Showing <span className="font-medium">{startItem}</span> to{" "}
        <span className="font-medium">{endItem}</span> of{" "}
        <span className="font-medium">{totalItems}</span> results
      </div>

      {/* Right: Pagination controls */}
      <div className="flex items-center gap-4">
        {/* Page size selector */}
        <div className="flex items-center gap-2">
          <label
            htmlFor="page-size"
            className="text-sm text-gray-700 dark:text-gray-300"
          >
            Rows per page:
          </label>
          <select
            id="page-size"
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
          >
            {pageSizeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Page navigation */}
        <div className="flex items-center gap-2">
          <Button
            color="secondary"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            isDisabled={!canGoPrevious}
            iconLeading={ChevronLeft}
          >
            Previous
          </Button>

          <span className="text-sm text-gray-700 dark:text-gray-300">
            Page {currentPage} of {totalPages}
          </span>

          <Button
            color="secondary"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            isDisabled={!canGoNext}
            iconTrailing={ChevronRight}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
