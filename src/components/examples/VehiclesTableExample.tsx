import { useState, useRef, useEffect } from "react";
import { Eye, Pencil, Trash, Copy, Car } from "lucide-react";
import toast from "react-hot-toast";
import { DataTable } from "@/components/DataTable";
import type { ColumnDef, FilterDef } from "@/components/DataTable";
import { ActionsCell } from "@/components/DataTable/cell-renderers";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useTableState } from "@/hooks/useTableState";
import {
  useVehiclesQuery,
  useDeleteVehicle,
  useBulkDeleteVehicles,
  type Vehicle,
} from "@/api/queries/vehicles";

export function VehiclesTableExample() {
  // Table state management
  const table = useTableState({ defaultPageSize: 10 });

  // Selection state (not part of table state)
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  // Track table position for bulk actions bar
  const tableRef = useRef<HTMLDivElement>(null);
  const [tableLeft, setTableLeft] = useState<number>(0);

  useEffect(() => {
    const updatePosition = () => {
      if (tableRef.current) {
        const rect = tableRef.current.getBoundingClientRect();
        setTableLeft(rect.left);
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, []);

  // API Query - simulates real backend with mock data
  const { data, isLoading } = useVehiclesQuery(table.params);

  // Mutations
  const deleteVehicle = useDeleteVehicle();
  const bulkDelete = useBulkDeleteVehicles();

  // Column definitions with inline actions
  const columns: ColumnDef<Vehicle>[] = [
    {
      key: "name",
      header: "Vehicle Name",
      sortable: true,
      width: "200px",
      className: "font-semibold",
    },
    {
      key: "model",
      header: "Model",
      sortable: true,
      width: "150px",
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      cellType: "badge",
      badgeVariant: (status) => {
        if (status === "active") return "success";
        if (status === "maintenance") return "gray";
        return "error";
      },
      align: "center",
      width: "120px",
    },
    {
      key: "category",
      header: "Category",
      width: "120px",
      cell: (row) => <span className="capitalize">{row.category}</span>,
    },
    {
      key: "price",
      header: "Price",
      sortable: true,
      align: "right",
      width: "120px",
      cell: (row) => `$${row.price.toLocaleString()}`,
    },
    {
      key: "year",
      header: "Year",
      sortable: true,
      align: "center",
      width: "100px",
    },
    {
      key: "mileage",
      header: "Mileage",
      sortable: true,
      align: "right",
      width: "120px",
      cell: (row) => `${row.mileage.toLocaleString()} mi`,
    },
    {
      key: "createdAt",
      header: "Created",
      sortable: true,
      width: "120px",
      cell: (row) => new Date(row.createdAt).toLocaleDateString(),
    },
    {
      key: "actions",
      header: "Actions",
      align: "center",
      width: "80px",
      cell: (row) => (
        <ActionsCell
          actions={[
            {
              label: "View",
              icon: Eye,
              onClick: () => {
                toast(`Viewing ${row.name}`);
              },
            },
            {
              label: "Edit",
              icon: Pencil,
              onClick: () => {
                toast(`Editing ${row.name}`);
              },
            },
            {
              label: "Duplicate",
              icon: Copy,
              onClick: () => {
                toast.success(`Duplicated ${row.name}`);
              },
            },
            { type: "separator" },
            {
              label: "Delete",
              icon: Trash,
              onClick: async () => {
                await deleteVehicle.mutateAsync(row.id);
                toast.success(`Deleted ${row.name}`);
              },
              variant: "destructive",
              requireConfirm: true,
              confirmMessage: `Delete "${row.name}"? This cannot be undone.`,
            },
          ]}
        />
      ),
    },
  ];

  // Filter definitions
  const vehicleFilters: FilterDef<Vehicle>[] = [
    {
      key: "name",
      type: "text",
      placeholder: "Filter by vehicle name...",
    },
    {
      key: "status",
      type: "select",
      placeholder: "Filter by status...",
      options: [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
        { label: "Maintenance", value: "maintenance" },
      ],
    },
    {
      key: "category",
      type: "multi-select",
      placeholder: "Select categories...",
      options: [
        { label: "Sedan", value: "sedan" },
        { label: "SUV", value: "suv" },
        { label: "Truck", value: "truck" },
      ],
    },
    {
      key: "year",
      type: "number",
      placeholder: "Filter by year...",
      min: 2020,
      max: 2025,
    },
    {
      key: "price",
      type: "number",
      placeholder: "Max price...",
      min: 0,
      max: 100000,
    },
    {
      key: "createdAt",
      type: "date",
      placeholder: "Filter by date...",
    },
  ];

  // Handle bulk delete using mutation
  const handleBulkDelete = async () => {
    try {
      await bulkDelete.mutateAsync(Array.from(selectedRows));
      toast.success(`Deleted ${selectedRows.size} vehicles`);
      setSelectedRows(new Set());
    } catch (error) {
      toast.error("Failed to delete vehicles");
    }
  };

  return (
    <div className="space-y-4 relative">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Car className="h-6 w-6" />
            Vehicles DataTable Example
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            Demonstrating all features: search, filters, sorting, pagination,
            selection, and actions
          </p>
        </div>
      </div>

      <div ref={tableRef}>
        <DataTable
          data={data?.data || []}
          loading={isLoading}
          columns={columns}
          filters={vehicleFilters}
          pagination={{
            currentPage: data?.pagination.currentPage || 1,
            totalPages: data?.pagination.totalPages || 1,
          }}
        
          onPageChange={table.setPage}
          searchable
          searchPlaceholder="Search vehicles by name or model..."
          onSearchChange={table.setSearch}
          onFilterChange={table.setFilters}
          sortable
          onSortChange={table.setSort}
          
          selectedRows={selectedRows}
          onSelectionChange={setSelectedRows}
          rowKey="id"
          emptyMessage="No vehicles found. Try adjusting your search or filters."
        />
      </div>

      {/* Fixed Bulk Actions Bar */}
      {selectedRows.size > 0 && (
        <div 
          className="fixed rounded-full bottom-14 bg-background border-t shadow-lg z-50"
          style={{
            left: tableRef.current ? `${tableLeft + tableRef.current.offsetWidth / 2}px` : '50%',
            transform: 'translateX(-50%)'
          }}
        >
          <div className="max-w-7xl mx-auto px-3 py-2 flex items-center justify-between gap-10">
            <div className="flex items-center gap-2 ps-1">
              <Checkbox
                checked={true}
                onCheckedChange={() => setSelectedRows(new Set())}
                aria-label="Unselect all"
                className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
              />
              <span className="text-sm font-medium">
                {selectedRows.size} Selected
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="contained"
                color="orange"
                size="lg"
                onClick={handleBulkDelete}
                disabled={bulkDelete.isPending}
                className="rounded-full py-3 text-md leading-6 h-12"
              >
                {bulkDelete.isPending ? "Reassigning..." : `Reassign`}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
