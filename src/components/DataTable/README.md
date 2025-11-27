# DataTable Component Documentation

A powerful, feature-rich data table component built with React, TypeScript, and Tailwind CSS.

## 📋 Table of Contents

- [Features](#features)
- [Quick Start](#quick-start)
- [Props Reference](#props-reference)
- [Column Definitions](#column-definitions)
- [Filter Types](#filter-types)
- [Server-Side Integration](#server-side-integration)
- [Advanced Usage](#advanced-usage)
- [Examples](#examples)
- [TypeScript Types](#typescript-types)

---

## ✨ Features

- 🔍 **Search** - Full-text search with debouncing
- 🎯 **Filters** - 5 filter types (text, number, select, multi-select, date)
- ⬆️⬇️ **Sorting** - 3-state sorting (asc → desc → none)
- 📄 **Pagination** - Server-side pagination with page numbers
- ☑️ **Selection** - Row selection with bulk actions
- 🎨 **Cell Types** - Badge, custom renderers, text
- ⚡ **Actions** - Row actions with confirmation dialogs
- 💀 **Loading States** - Skeleton loading, empty states, error handling
- 🎭 **Sticky Header** - Optional sticky table header
- 📱 **Responsive** - Mobile-friendly design
- 🎨 **Customizable** - Full styling control with Tailwind CSS

---

## 🚀 Quick Start

### Basic Example

```tsx
import { DataTable } from '@/components/DataTable'
import type { ColumnDef } from '@/components/DataTable'

interface User {
  id: string
  name: string
  email: string
  status: 'active' | 'inactive'
}

const columns: ColumnDef<User>[] = [
  {
    key: 'name',
    header: 'Name',
    sortable: true,
  },
  {
    key: 'email',
    header: 'Email',
  },
  {
    key: 'status',
    header: 'Status',
    cellType: 'badge',
    badgeVariant: (status) => status === 'active' ? 'default' : 'destructive',
  },
]

function UsersTable() {
  const [data, setData] = useState<User[]>([])
  const [loading, setLoading] = useState(false)

  return (
    <DataTable
      data={data}
      columns={columns}
      loading={loading}
      pagination={{
        currentPage: 1,
        totalPages: 10,
      }}
    />
  )
}
```

---

## 📚 Props Reference

### DataTable Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `TData[]` | **required** | Array of data to display |
| `columns` | `ColumnDef<TData>[]` | **required** | Column definitions |
| `loading` | `boolean` | `false` | Show loading skeleton |
| `error` | `Error` | `undefined` | Error object to display error state |
| `pagination` | `PaginationMeta` | **required** | Pagination metadata |
| `onPageChange` | `(page: number) => void` | `undefined` | Page change callback |
| `filters` | `FilterDef<TData>[]` | `[]` | Filter definitions |
| `searchable` | `boolean` | `false` | Enable search |
| `searchPlaceholder` | `string` | `undefined` | Search input placeholder |
| `onSearchChange` | `(query: string) => void` | `undefined` | Search callback |
| `onFilterChange` | `(filters: FilterState) => void` | `undefined` | Filter change callback |
| `sortable` | `boolean` | `false` | Enable sorting (column level override) |
| `defaultSort` | `SortConfig` | `null` | Default sort configuration |
| `onSortChange` | `(sort: SortConfig \| null) => void` | `undefined` | Sort change callback |
| `selectable` | `boolean` | `false` | Enable row selection |
| `selectedRows` | `Set<string>` | `new Set()` | Selected row IDs |
| `onSelectionChange` | `(selected: Set<string>) => void` | `undefined` | Selection change callback |
| `rowKey` | `keyof TData \| ((row: TData) => string)` | `'id'` | Unique row identifier |
| `onRowClick` | `(row: TData) => void` | `undefined` | Row click handler |
| `stickyHeader` | `boolean` | `true` | Enable sticky header |
| `emptyMessage` | `string` | `'No results found.'` | Empty state message |
| `className` | `string` | `undefined` | Additional CSS classes |

---

## 🎯 Column Definitions

### ColumnDef Interface

```typescript
interface ColumnDef<TData> {
  key: keyof TData | string
  header: string
  
  // Rendering
  cell?: (row: TData, index: number) => ReactNode
  cellType?: 'text' | 'badge'
  badgeVariant?: (value: any) => BadgeVariant
  
  // Styling
  width?: string
  align?: 'left' | 'center' | 'right'
  className?: string
  headerClassName?: string
  
  // Sorting
  sortable?: boolean
}
```

### Column Examples

#### Basic Text Column

```tsx
{
  key: 'name',
  header: 'Name',
  sortable: true,
  width: '200px',
}
```

#### Custom Cell Renderer

```tsx
{
  key: 'price',
  header: 'Price',
  align: 'right',
  cell: (row) => `$${row.price.toLocaleString()}`,
}
```

#### Badge Cell

```tsx
{
  key: 'status',
  header: 'Status',
  cellType: 'badge',
  badgeVariant: (status) => {
    if (status === 'active') return 'default'
    if (status === 'pending') return 'secondary'
    return 'destructive'
  },
  align: 'center',
}
```

#### Actions Column

```tsx
{
  key: 'actions',
  header: 'Actions',
  align: 'center',
  width: '80px',
  cell: (row) => (
    <ActionsCell
      actions={[
        {
          label: 'Edit',
          icon: Pencil,
          onClick: () => handleEdit(row.id),
        },
        {
          label: 'Delete',
          icon: Trash,
          onClick: () => handleDelete(row.id),
          variant: 'destructive',
          requireConfirm: true,
          confirmMessage: `Delete "${row.name}"?`,
        },
      ]}
    />
  ),
}
```

---

## 🎛️ Filter Types

### 1. Text Filter

```tsx
{
  key: 'name',
  type: 'text',
  placeholder: 'Filter by name...',
}
```

**Features:**
- Debounced input (300ms default)
- Full-text search

### 2. Number Filter

```tsx
{
  key: 'age',
  type: 'number',
  placeholder: 'Enter age...',
  min: 18,
  max: 100,
}
```

**Features:**
- Min/max validation
- Numeric input only

### 3. Select Filter

```tsx
{
  key: 'status',
  type: 'select',
  placeholder: 'Filter by status...',
  options: [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
  ],
}
```

**Features:**
- Single selection
- Searchable dropdown

### 4. Multi-Select Filter

```tsx
{
  key: 'categories',
  type: 'multi-select',
  placeholder: 'Select categories...',
  options: [
    { label: 'Category A', value: 'a' },
    { label: 'Category B', value: 'b' },
    { label: 'Category C', value: 'c' },
  ],
}
```

**Features:**
- Multiple selection
- "Select All" option
- Shows count when multiple selected

### 5. Date Filter

```tsx
{
  key: 'createdAt',
  type: 'date',
  placeholder: 'Filter by date...',
}
```

**Features:**
- Calendar picker
- Date formatting

---

## 🔄 Server-Side Integration

### Using React Query

```tsx
import { useQuery } from '@tanstack/react-query'

function VehiclesTable() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({})
  const [sort, setSort] = useState(null)

  // Fetch data with React Query
  const { data, isLoading } = useQuery({
    queryKey: ['vehicles', { page, search, filters, sort }],
    queryFn: () => fetchVehicles({ page, pageSize: 10, search, filters, sort }),
  })

  return (
    <DataTable
      data={data?.data || []}
      loading={isLoading}
      columns={columns}
      filters={vehicleFilters}
      
      // Pagination
      pagination={{
        currentPage: data?.pagination.currentPage || 1,
        totalPages: data?.pagination.totalPages || 1,
      }}
      onPageChange={setPage}
      
      // Search
      searchable
      searchPlaceholder="Search vehicles..."
      onSearchChange={(query) => {
        setSearch(query)
        setPage(1) // Reset to first page
      }}
      
      // Filters
      onFilterChange={(newFilters) => {
        setFilters(newFilters)
        setPage(1)
      }}
      
      // Sorting
      sortable
      onSortChange={setSort}
    />
  )
}
```

### Expected API Response Format

```typescript
{
  data: [
    { id: '1', name: 'Item 1', ... },
    { id: '2', name: 'Item 2', ... },
  ],
  pagination: {
    currentPage: 1,
    totalPages: 10,
    totalRecords: 100,
    pageSize: 10,
  }
}
```

### Backend Implementation Example

```typescript
// Express.js example
app.post('/api/vehicles/search', async (req, res) => {
  const { page, pageSize, search, filters, sort } = req.body
  
  let query = db.vehicles.find()
  
  // Apply search
  if (search) {
    query = query.where('name').regex(new RegExp(search, 'i'))
  }
  
  // Apply filters
  Object.entries(filters).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      query = query.where(key).in(value)
    } else {
      query = query.where(key).equals(value)
    }
  })
  
  // Apply sorting
  if (sort) {
    const direction = sort.direction === 'asc' ? 1 : -1
    query = query.sort({ [sort.key]: direction })
  }
  
  // Get total count
  const totalRecords = await query.clone().countDocuments()
  
  // Apply pagination
  const data = await query
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .exec()
  
  res.json({
    data,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(totalRecords / pageSize),
      totalRecords,
      pageSize,
    }
  })
})
```

---

## 🎨 Advanced Usage

### Row Selection with Bulk Actions

```tsx
function DataTableWithBulkActions() {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
  const bulkDelete = useBulkDeleteMutation()

  const handleBulkDelete = async () => {
    await bulkDelete.mutateAsync(Array.from(selectedRows))
    setSelectedRows(new Set())
  }

  return (
    <>
      <DataTable
        data={data}
        columns={columns}
        selectable
        selectedRows={selectedRows}
        onSelectionChange={setSelectedRows}
      />
      
      {/* Fixed Bulk Actions Bar */}
      {selectedRows.size > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t shadow-lg z-50">
          <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
            <span>{selectedRows.size} items selected</span>
            <div className="flex gap-2">
              <Button onClick={() => setSelectedRows(new Set())}>
                Clear Selection
              </Button>
              <Button variant="destructive" onClick={handleBulkDelete}>
                Delete {selectedRows.size} selected
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
```

### Custom Row Key

```tsx
// Using a function
<DataTable
  data={data}
  columns={columns}
  rowKey={(row) => `${row.id}-${row.version}`}
/>

// Using a property name
<DataTable
  data={data}
  columns={columns}
  rowKey="uuid"
/>
```

### Clickable Rows

```tsx
<DataTable
  data={data}
  columns={columns}
  onRowClick={(row) => {
    navigate(`/users/${row.id}`)
  }}
/>
```

### Active Filters Display

The DataTable automatically shows active filters as badges that can be removed:

```tsx
// Active filters appear as:
// [Name: "John" ✕] [Status: "Active" ✕] [Clear All]
```

### Error Handling

```tsx
const { data, error, isLoading } = useQuery({
  queryKey: ['vehicles'],
  queryFn: fetchVehicles,
})

<DataTable
  data={data?.data || []}
  loading={isLoading}
  error={error}  // Shows error state
  columns={columns}
/>
```

---

## 📖 Examples

### Example 1: Simple User Table

```tsx
interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user'
}

const columns: ColumnDef<User>[] = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email' },
  {
    key: 'role',
    header: 'Role',
    cellType: 'badge',
    badgeVariant: (role) => role === 'admin' ? 'default' : 'secondary',
  },
]

function UserTable() {
  const [users, setUsers] = useState<User[]>([])
  
  return (
    <DataTable
      data={users}
      columns={columns}
      pagination={{ currentPage: 1, totalPages: 1 }}
    />
  )
}
```

### Example 2: Full-Featured Product Table

```tsx
function ProductTable() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({})
  const [sort, setSort] = useState(null)

  const { data, isLoading } = useProductsQuery({
    page, pageSize: 10, search, filters, sort
  })

  const columns: ColumnDef<Product>[] = [
    { key: 'name', header: 'Product', sortable: true },
    {
      key: 'price',
      header: 'Price',
      sortable: true,
      align: 'right',
      cell: (row) => `$${row.price.toFixed(2)}`,
    },
    {
      key: 'stock',
      header: 'Stock',
      align: 'center',
      cell: (row) => (
        <span className={row.stock < 10 ? 'text-destructive' : ''}>
          {row.stock}
        </span>
      ),
    },
    {
      key: 'category',
      header: 'Category',
      cellType: 'badge',
    },
  ]

  const filters: FilterDef<Product>[] = [
    {
      key: 'name',
      type: 'text',
      placeholder: 'Search products...',
    },
    {
      key: 'category',
      type: 'multi-select',
      placeholder: 'Filter by category...',
      options: [
        { label: 'Electronics', value: 'electronics' },
        { label: 'Clothing', value: 'clothing' },
        { label: 'Food', value: 'food' },
      ],
    },
    {
      key: 'price',
      type: 'number',
      placeholder: 'Max price...',
      min: 0,
      max: 10000,
    },
  ]

  return (
    <DataTable
      data={data?.data || []}
      loading={isLoading}
      columns={columns}
      filters={filters}
      pagination={data?.pagination}
      onPageChange={setPage}
      searchable
      onSearchChange={(q) => {
        setSearch(q)
        setPage(1)
      }}
      onFilterChange={(f) => {
        setFilters(f)
        setPage(1)
      }}
      sortable
      onSortChange={setSort}
    />
  )
}
```

---

## 🔧 TypeScript Types

### Core Types

```typescript
// Column Definition
interface ColumnDef<TData> {
  key: keyof TData | string
  header: string
  cell?: (row: TData, index: number) => ReactNode
  cellType?: 'text' | 'badge'
  badgeVariant?: (value: any) => 'default' | 'secondary' | 'destructive' | 'outline'
  width?: string
  align?: 'left' | 'center' | 'right'
  className?: string
  headerClassName?: string
  sortable?: boolean
}

// Filter Definition
interface FilterDef<TData> {
  key: keyof TData | string
  label?: string
  type: 'text' | 'number' | 'select' | 'multi-select' | 'date'
  placeholder?: string
  options?: FilterOption[]
  min?: number
  max?: number
}

// Filter Option
interface FilterOption {
  label: string
  value: any
  icon?: ReactNode
  disabled?: boolean
}

// Sort Configuration
interface SortConfig {
  key: string
  direction: 'asc' | 'desc'
}

// Filter State
interface FilterState {
  [key: string]: any
}

// Pagination Metadata
interface PaginationMeta {
  currentPage: number
  totalPages: number
  totalRecords?: number
  pageSize?: number
}

// Action Definition
interface Action {
  label: string
  icon?: LucideIcon | ReactNode
  onClick: () => void | Promise<void>
  variant?: 'default' | 'destructive' | 'ghost'
  disabled?: boolean
  requireConfirm?: boolean
  confirmMessage?: string
  confirmTitle?: string
}
```

---

## 🎯 Best Practices

### 1. Always Reset Page on Filter/Search Change

```tsx
onSearchChange={(query) => {
  setSearch(query)
  setPage(1)  // ✅ Reset to first page
}}
```

### 2. Use React Query for Data Fetching

```tsx
const { data, isLoading } = useQuery({
  queryKey: ['items', { page, search, filters, sort }],
  queryFn: () => fetchItems({ page, search, filters, sort }),
  placeholderData: (previousData) => previousData,  // Keep previous data while loading
})
```

### 3. Memoize Column Definitions

```tsx
const columns = useMemo<ColumnDef<User>[]>(() => [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email' },
], [])
```

### 4. Handle Empty States

```tsx
<DataTable
  data={data?.data || []}
  columns={columns}
  emptyMessage="No users found. Try adjusting your filters."
  pagination={data?.pagination}
/>
```

### 5. Use TypeScript Generics

```tsx
interface Vehicle {
  id: string
  name: string
  model: string
}

const columns: ColumnDef<Vehicle>[] = [...]
const filters: FilterDef<Vehicle>[] = [...]

<DataTable<Vehicle>
  data={vehicles}
  columns={columns}
  filters={filters}
/>
```

---

## 🐛 Troubleshooting

### Issue: Filters not working

**Solution:** Make sure `onFilterChange` callback is implemented and triggers a new API call.

```tsx
onFilterChange={(newFilters) => {
  setFilters(newFilters)  // ✅ Update state
  setPage(1)              // ✅ Reset page
}}
```

### Issue: Sorting doesn't persist

**Solution:** Store sort state and pass to API.

```tsx
const [sort, setSort] = useState<SortConfig | null>(null)

<DataTable
  sortable
  onSortChange={setSort}  // ✅ Store sort state
/>
```

### Issue: Selection not clearing after action

**Solution:** Manually clear selection after successful action.

```tsx
const handleBulkDelete = async () => {
  await bulkDelete.mutateAsync(selectedIds)
  setSelectedRows(new Set())  // ✅ Clear selection
}
```

---

## 📝 License

MIT

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📧 Support

For issues and questions, please open an issue on GitHub.
