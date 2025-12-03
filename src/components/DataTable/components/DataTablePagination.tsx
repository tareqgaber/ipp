import { PaginationPageMinimalCenter } from "@/components/application/pagination/pagination";

interface DataTablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const DataTablePagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: DataTablePaginationProps) => {
  return (
    <PaginationPageMinimalCenter
      page={currentPage}
      total={totalPages}
      onPageChange={onPageChange}
      className="px-4 py-3 md:px-6 md:pt-3 md:pb-4"
    />
  );
};
