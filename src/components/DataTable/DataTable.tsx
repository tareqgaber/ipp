import type { DataTableConfig, TableResponse } from "./types";
import {
  useDataTableState,
  useDataTableSelection,
  useDataTableFilters,
} from "./hooks";
import {
  DataTableHeader,
  DataTableMetricCards,
  DataTableContent,
  DataTablePagination,
  DataTableBulkActions,
  DataTableFilterDrawer,
} from "./components";
import { TableCard } from "../application/table/table";

interface DataTableProps<T> {
  config: DataTableConfig<T>;
  data?: TableResponse<T>;
  isLoading?: boolean;
  onRefetch?: () => void;
}

export const DataTable = <T extends Record<string, any>>({
  config,
  data,
  isLoading = false,
}: DataTableProps<T>) => {
  const {
    title,
    subtitle,
    columns,
    metricCards,
    metricCardsSelectionMode = "radio",
    filters = [],
    filterSubtitle,
    actions = [],
    bulkActions = [],
    enableSearch = true,
    enableFilters = true,
    enableSelection = true,
    defaultPageSize = 10,
    pageSizeOptions = [10, 25, 50, 100],
    getRowId = (row) => row.id,
  } = config;

  // State management
  const {
    state,
    tableParams,
    setPagination,
    toggleSort,
    setSearch,
    setFilters: setTableFilters,
    setActiveMetricCard,
    toggleActiveMetricCard,
  } = useDataTableState({
    defaultPageSize,
    metricCards,
    selectionMode: metricCardsSelectionMode,
  });

  // Selection management
  const {
    selectedIds,
    selectedRows,
    selectedCount,
    isAllSelected,
    isSomeSelected,
    isRowSelected,
    toggleRow,
    toggleAll,
    clearSelection,
  } = useDataTableSelection(data?.data || [], getRowId);

  // Filter management
  const {
    isDrawerOpen,
    activeFilters,
    activeFilterCount,
    toggleDrawer,
    applyFilters,
    resetFilters,
  } = useDataTableFilters();

  // Handle metric card click
  const handleMetricCardClick = (
    cardId: string,
    filterKey: string,
    filterValue: any
  ) => {
    if (metricCardsSelectionMode === "checkbox") {
      toggleActiveMetricCard(cardId, filterKey, filterValue);
    } else {
      setActiveMetricCard(cardId, filterKey, filterValue);
    }
  };

  // Handle filter apply
  const handleApplyFilters = (filters: Record<string, any>) => {
    setTableFilters(filters);
    applyFilters(filters);
  };

  // Handle filter reset
  const handleResetFilters = () => {
    setTableFilters({});
    resetFilters();
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <DataTableHeader
        title={title}
        subtitle={subtitle}
        searchValue={state.search}
        onSearchChange={setSearch}
        searchPlaceholder={config.searchPlaceholder}
        onFilterClick={toggleDrawer}
        activeFilterCount={activeFilterCount}
        enableSearch={enableSearch}
        enableFilters={enableFilters && filters.length > 0}
      />

      {/* Metric Cards */}
      {metricCards && metricCards.length > 0 && (
        <DataTableMetricCards
          cards={metricCards}
          activeCardId={state.activeMetricCard}
          activeCardIds={state.activeMetricCards}
          selectionMode={metricCardsSelectionMode}
          onCardClick={handleMetricCardClick}
        />
      )}

      {/* Table */}
      <TableCard.Root>
        <DataTableContent
          data={data?.data || []}
          columns={columns}
          actions={actions}
          isLoading={isLoading}
          selectedIds={selectedIds}
          isAllSelected={isAllSelected}
          isSomeSelected={isSomeSelected}
          onToggleRow={toggleRow}
          onToggleAll={toggleAll}
          onSort={toggleSort}
          sortBy={state.sorting.sortBy}
          sortOrder={state.sorting.sortOrder}
          getRowId={getRowId}
          enableSelection={enableSelection}
        />

        {/* Pagination */}
        {data && data.meta && (
          <DataTablePagination
            currentPage={state.pagination.page}
            totalPages={data.meta.totalPages}
            onPageChange={(page) => setPagination(page)}
          />
        )}
      </TableCard.Root>

      {/* Bulk Actions */}
      {enableSelection && bulkActions.length > 0 && (
        <DataTableBulkActions
          selectedCount={selectedCount}
          actions={bulkActions}
          onClearSelection={clearSelection}
          selectedIds={selectedIds}
          selectedRows={selectedRows}
        />
      )}

      {/* Filter Drawer */}
      {enableFilters && filters.length > 0 && (
        <DataTableFilterDrawer
          isOpen={isDrawerOpen}
          onClose={toggleDrawer}
          filters={filters}
          activeFilters={activeFilters}
          onApply={handleApplyFilters}
          onReset={handleResetFilters}
          subtitle={filterSubtitle}
        />
      )}
    </div>
  );
};
