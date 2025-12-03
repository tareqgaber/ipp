# DataTable Component

A powerful, reusable data table component with server-side pagination, sorting, filtering, and bulk actions.

## Features

✅ **Server-side operations** - Pagination, sorting, and filtering  
✅ **Metric card filters** - Visual filter cards acting as checkboxes  
✅ **Advanced filtering** - Side drawer with multiple filter types  
✅ **Bulk actions** - Select multiple rows and perform batch operations  
✅ **Row actions** - Dropdown menu for individual row actions  
✅ **Search** - Debounced search functionality  
✅ **Fully typed** - Complete TypeScript support  
✅ **Customizable** - Configure everything via config object  
✅ **Responsive** - Mobile-friendly design

## Installation

The DataTable component is already set up in your project. It uses:

- **TanStack Table** for table logic
- **TanStack Query** for data fetching
- **Untitled UI** components for styling
- **Framer Motion** for animations
- **Radix UI** for accessible dialogs

## Basic Usage

```tsx
import { DataTable } from "@/components/DataTable";
import type { DataTableConfig } from "@/components/DataTable";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const config: DataTableConfig<User> = {
  title: "Users",
  subtitle: "Manage your team members",

  columns: [
    { id: "name", header: "Name", accessorKey: "name", sortable: true },
    { id: "email", header: "Email", accessorKey: "email", sortable: true },
    { id: "role", header: "Role", accessorKey: "role" },
  ],
};

function UsersPage() {
  const { data, isLoading } = useUsersQuery(params);

  return <DataTable config={config} data={data} isLoading={isLoading} />;
}
```

## Configuration

### DataTableConfig<T>

| Property          | Type                       | Required | Description                                    |
| ----------------- | -------------------------- | -------- | ---------------------------------------------- |
| `title`           | `string`                   | ✅       | Table title                                    |
| `subtitle`        | `string`                   | ❌       | Table subtitle                                 |
| `columns`         | `DataTableColumn<T>[]`     | ✅       | Column definitions                             |
| `metricCards`     | `DataTableMetricCard[]`    | ❌       | Metric card filters                            |
| `filters`         | `DataTableFilter[]`        | ❌       | Filter field definitions                       |
| `actions`         | `DataTableAction<T>[]`     | ❌       | Row action definitions                         |
| `bulkActions`     | `DataTableBulkAction<T>[]` | ❌       | Bulk action definitions                        |
| `enableSearch`    | `boolean`                  | ❌       | Enable search (default: true)                  |
| `enableFilters`   | `boolean`                  | ❌       | Enable filters (default: true)                 |
| `enableSelection` | `boolean`                  | ❌       | Enable row selection (default: true)           |
| `defaultPageSize` | `number`                   | ❌       | Default page size (default: 10)                |
| `pageSizeOptions` | `number[]`                 | ❌       | Page size options (default: [10, 25, 50, 100]) |
| `getRowId`        | `(row: T) => string`       | ❌       | Custom row ID getter                           |

### Column Definition

```tsx
{
  id: "name",
  header: "Name",
  accessorKey: "name",
  sortable: true,
  cell: (row) => <CustomCell data={row} />,
  width: "200px",
  align: "left"
}
```

### Metric Cards

```tsx
metricCards: [
  {
    id: "all",
    label: "All Users",
    value: 120,
    icon: <Users />,
    filterKey: "status",
    filterValue: undefined, // null/undefined clears filter
    description: "Total users",
  },
  {
    id: "active",
    label: "Active",
    value: 95,
    icon: <CheckCircle />,
    filterKey: "status",
    filterValue: "active",
  },
];
```

### Filters

Supported filter types:

- `text` - Text input
- `select` - Single select dropdown
- `multiSelect` - Multiple select (not yet implemented)
- `dateRange` - Date range picker with presets (Untitled UI)
- `numberRange` - Number range inputs
- `checkbox` - Checkbox (not yet implemented)

```tsx
filters: [
  {
    type: "text",
    name: "name",
    label: "Name",
    placeholder: "Search by name...",
  },
  {
    type: "select",
    name: "role",
    label: "Role",
    options: [
      { value: "admin", label: "Admin" },
      { value: "user", label: "User" },
    ],
  },
  {
    type: "dateRange",
    name: "createdAt",
    label: "Created Date",
  },
  {
    type: "numberRange",
    name: "age",
    label: "Age Range",
  },
];
```

### Actions

```tsx
actions: [
  {
    id: "edit",
    label: "Edit",
    icon: <Edit />,
    onClick: (row) => navigate(`/edit/${row.id}`),
    variant: "default",
    disabled: (row) => row.status === "archived",
    hidden: (row) => !canEdit(row),
  },
];
```

Variants: `default`, `success`, `danger`, `warning`

### Bulk Actions

```tsx
bulkActions: [
  {
    id: "delete",
    label: "Delete Selected",
    icon: <Trash />,
    onClick: (ids, rows) => handleBulkDelete(ids),
    variant: "danger",
    confirmMessage: "Are you sure?",
  },
];
```

## API Integration

### Query Hook Pattern

```tsx
// src/api/queries/users.ts
export const useUsersQuery = (params: TableParams) => {
  return useQuery({
    queryKey: queryKeys.users.list(params),
    queryFn: async () => {
      const response = await axiosInstance.get(endpoints.users.list, {
        params,
      });
      return response.data;
    },
  });
};
```

### Expected Response Format

```tsx
{
  data: T[],
  meta: {
    total: number,
    page: number,
    pageSize: number,
    totalPages: number
  }
}
```

### Table Params

The DataTable automatically manages and passes these params to your query:

```tsx
{
  page: number,
  pageSize: number,
  sortBy?: string,
  sortOrder?: "asc" | "desc",
  search?: string,
  filters?: Record<string, any>
}
```

## Example: Permit Requests

See the complete example at:

- **Page**: `src/pages/admin/PermitRequestsPage/PermitRequestsPage.tsx`
- **Config**: `src/pages/admin/PermitRequestsPage/config/permitRequestsTableConfig.tsx`
- **API**: `src/api/queries/permitRequests.ts`
- **Types**: `src/api/types/permitRequests.ts`

Access it at: `/admin/permit-requests`

## Customization

### Custom Cell Renderers

```tsx
{
  id: "status",
  header: "Status",
  accessorKey: "status",
  cell: (row) => (
    <Badge color={row.status === "active" ? "success" : "gray"}>
      {row.status}
    </Badge>
  )
}
```

### Custom Row ID

```tsx
const config: DataTableConfig<User> = {
  // ...
  getRowId: (row) => row.customId || row.id,
};
```

## Notes

- The DataTable manages its own internal state for pagination, sorting, and filtering
- All server operations are handled automatically
- Mock data is supported - see `permitRequests.ts` for example
- Filter drawer uses React Hook Form for form management
- Bulk actions appear in a floating bar at the bottom when rows are selected

## Recent Updates

✅ **Date Range Filter** - Now uses Untitled UI DateRangePicker with presets instead of two separate date inputs
✅ **Filter Drawer** - Fixed SelectItem type issues

## Known Issues

- Some TypeScript warnings for unused variables (non-breaking)
- Sorting comparison needs null/undefined handling

These are minor issues that don't affect functionality.
