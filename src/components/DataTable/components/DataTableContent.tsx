import { Table } from "@/components/application/table/table";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import type { DataTableColumn, DataTableAction } from "../types";

interface DataTableContentProps<T> {
  data: T[];
  columns: DataTableColumn<T>[];
  actions?: DataTableAction<T>[];
  isLoading?: boolean;
  selectedIds: string[];
  isAllSelected: boolean;
  isSomeSelected: boolean;
  onToggleRow: (id: string) => void;
  onToggleAll: () => void;
  onSort?: (columnId: string) => void;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  getRowId?: (row: T) => string;
  enableSelection?: boolean;
}

export const DataTableContent = <T extends Record<string, any>>({
  data,
  columns,
  actions,
  isLoading,
  selectedIds,
  onToggleRow,
  onSort,
  sortBy,
  sortOrder,
  getRowId = (row) => row.id,
  enableSelection = true,
}: DataTableContentProps<T>) => {
  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-primary-600 dark:border-gray-700 dark:border-t-primary-400" />
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
            No results found
          </p>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Try adjusting your search or filters
          </p>
        </div>
      </div>
    );
  }

  return (
    <Table
      aria-label="Data table"
      selectionMode={enableSelection ? "multiple" : "none"}
      selectionBehavior="toggle"
      selectedKeys={new Set(selectedIds)}
      onSelectionChange={(keys) => {
        if (keys === "all") return;
        const newIds = Array.from(keys) as string[];
        // Handle selection changes
        newIds.forEach((id) => {
          if (!selectedIds.includes(id)) {
            onToggleRow(id);
          }
        });
        selectedIds.forEach((id) => {
          if (!newIds.includes(id)) {
            onToggleRow(id);
          }
        });
      }}
      sortDescriptor={
        sortBy
          ? {
              column: sortBy,
              direction: sortOrder === "asc" ? "ascending" : "descending",
            }
          : undefined
      }
      onSortChange={(descriptor) => {
        if (descriptor.column && onSort) {
          onSort(descriptor.column as string);
        }
      }}
    >
      <Table.Header>
        {columns.map((col) => (
          <Table.Head
            key={col.id}
            id={col.id}
            label={col.header}
            allowsSorting={col.sortable}
            isRowHeader={col.id === columns[0]?.id}
          />
        ))}
        {actions && actions.length > 0 && (
          <Table.Head
            key="actions"
            id="actions"
            className="sticky right-0 bg-secondary shadow-[-4px_0_6px_-1px_rgba(0,0,0,0.1)]"
          />
        )}
      </Table.Header>
      <Table.Body items={data}>
        {(row: T) => {
          const rowId = getRowId(row);
          const isSelected = selectedIds.includes(rowId);

          return (
            <Table.Row key={rowId} id={rowId}>
              {columns.map((col) => (
                <Table.Cell key={col.id}>
                  {col.cell
                    ? col.cell(row)
                    : col.accessorKey
                    ? String(row[col.accessorKey])
                    : ""}
                </Table.Cell>
              ))}
              {actions && actions.length > 0 && (
                <Table.Cell
                  className={`sticky right-0 bg-primary shadow-[-4px_0_6px_-1px_rgba(0,0,0,0.1)] ${
                    isSelected ? "bg-secondary" : ""
                  }`}
                >
                  <div className="flex justify-end">
                    <Dropdown.Root>
                      <Dropdown.DotsButton />
                      <Dropdown.Popover className="w-min">
                        <Dropdown.Menu>
                          {actions
                            .filter(
                              (action) => !action.hidden || !action.hidden(row)
                            )
                            .map((action) => {
                              const IconComponent = action.icon;
                              return (
                                <Dropdown.Item
                                  key={action.id}
                                  onAction={() => action.onClick(row)}
                                  isDisabled={
                                    action.disabled
                                      ? action.disabled(row)
                                      : false
                                  }
                                >
                                  {IconComponent && (
                                    <span className="mr-2">
                                      {IconComponent}
                                    </span>
                                  )}
                                  <span className="pr-4">{action.label}</span>
                                </Dropdown.Item>
                              );
                            })}
                        </Dropdown.Menu>
                      </Dropdown.Popover>
                    </Dropdown.Root>
                  </div>
                </Table.Cell>
              )}
            </Table.Row>
          );
        }}
      </Table.Body>
    </Table>
  );
};
