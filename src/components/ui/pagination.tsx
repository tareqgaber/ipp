import { useMemo } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
  className = "",
}: PaginationProps) {
  // Generate page numbers with smart truncation
  const pageNumbers = useMemo(() => {
    const pages: (number | "ellipsis")[] = [];

    if (totalPages <= maxVisiblePages + 2) {
      // Show all pages
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Always show first page
    pages.push(1);

    // Calculate range around current page
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    // Left ellipsis
    if (start > 2) pages.push("ellipsis");

    // Middle pages
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Right ellipsis
    if (end < totalPages - 1) pages.push("ellipsis");

    // Always show last page
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  }, [currentPage, totalPages, maxVisiblePages]);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={`flex items-center justify-center gap-1 ${className}`}>
      {/* Previous Button */}
      <Button
        variant="outlined"
        color="gray"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="text-gray-700"
      >
        <ArrowLeft className="h-4 w-4 mr-1 directional-icon" />
        Prev
      </Button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1 mx-auto">
        {pageNumbers.map((page, idx) =>
          page === "ellipsis" ? (
            <span
              key={`ellipsis-${idx}`}
              className="px-2 text-muted-foreground"
            >
              ...
            </span>
          ) : (
            <Button
              key={page}
              variant={page === currentPage ? "contained" : "ghost"}
              color={page === currentPage ? "secondary" : "gray"}
              size="sm"
              onClick={() => onPageChange(page)}
              className={
                "min-w-[2.5rem]" +
                (page === currentPage ? "text-gray-700" : "ghost text-gray-500")
              }
            >
              {page}
            </Button>
          )
        )}
      </div>

      {/* Next Button */}
      <Button
        variant="outlined"
        color="gray"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="text-gray-700"
      >
        Next
        <ArrowRight className="h-4 w-4 ml-1 directional-icon" />
      </Button>
    </div>
  );
}
