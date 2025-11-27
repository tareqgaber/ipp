


import { DataTable } from "@/components/DataTable"
import { Button } from "@/components/ui/button";
import { Edit, Trash2, MoreVertical, Mail, Phone, Calendar } from "lucide-react";
import type { ColumnDef } from "@/components/DataTable/types";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: "admin" | "manager" | "user";
  status: "active" | "inactive";
  avatar: string;
  joinDate: string;
  lastActive: string;
}

const columns: ColumnDef<User>[] = [
  {
    key: "id",
    header: "ID",
    width: "80px",
    align: "center",
  },
  {
    key: "name",
    header: "Full Name",
    sortable: true,
    cell: (row) => (
      <div className="flex items-center gap-3">
        <img 
          src={row.avatar} 
          alt={row.name}
          className="w-10 h-10 rounded-full object-cover border border-gray-200"
        />
        <div className="flex flex-col">
          <span className="font-medium">{row.name}</span>
          <span className="text-sm text-gray-500">{row.phone}</span>
        </div>
      </div>
    )
  },
  {
    key: "email",
    header: "Contact",
    sortable: true,
    cell: (row) => (
      <div className="flex items-center gap-2">
        <Mail className="h-4 w-4 text-gray-500" />
        <span>{row.email}</span>
      </div>
    )
  },
  {
    key: "role",
    header: "Role",
    cellType: "badge",
    sortable: true,
    badgeVariant: (value) => {
      switch (value) {
        case 'admin':
          return 'destructive'
        case 'manager':
          return 'warning'
        default:
          return 'secondary'
      }
    }
  },
  {
    key: "joinDate",
    header: "Join Date",
    sortable: true,
    cell: (row) => (
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 text-gray-500" />
        <span>{new Date(row.joinDate).toLocaleDateString()}</span>
      </div>
    )
  },
  {
    key: "status",
    header: "Status",
    cellType: "badge",
    align: "center",
    badgeVariant: (value) => {
      return value === "active" ? "success" : "destructive";
    },
  },
  {
    key: "actions",
    header: "",
    width: "100px",
    align: "right",
    cell: (row) => (
      <div className="flex items-center justify-end gap-2">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => console.log('Edit:', row)}
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => console.log('Delete:', row)}
        >
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </div>
    ),
  },
];

const mockData: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    role: "admin",
    status: "active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    joinDate: "2023-01-15",
    lastActive: "2023-10-28",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1 (555) 234-5678",
    role: "manager",
    status: "active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    joinDate: "2023-03-20",
    lastActive: "2023-10-27",
  },
  {
    id: 3,
    name: "Bob Wilson",
    email: "bob@example.com",
    phone: "+1 (555) 345-6789",
    role: "user",
    status: "inactive",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
    joinDate: "2023-06-10",
    lastActive: "2023-10-25",
  },
];




// const generateMockData = (count: number) => {
//   return Array.from({ length: count }, (_, index) => ({
//     id: index + 1,
//     name: [
//       "John Doe",
//       "Jane Smith",
//       "Bob Wilson",
//       "Alice Johnson",
//       "Charlie Brown",
//       "Diana Prince",
//       "Edward Norton",
//       "Fiona Apple",
//       "George Harris",
//       "Helen Miller"
//     ][index % 10],
//     email: `user${index + 1}@example.com`,
//     role: ["admin", "manager", "user"][index % 3],
//     status: index % 4 === 0 ? "inactive" : "active",
//     avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${index}`,
//   }));
// };



const UsersPage = () => {
  return (
    <div className=" h-full w-full  flex flex-col gap-5">
      <div className="w-full flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold  leading-8">Users</h2>
          <p className="text-Colors-Text-text-tertiary-(600) text-base font-normal ">
            Manage employee roles and permissions
          </p>
        </div>
      </div>
      <div className=" w-full">
         <DataTable
      // Data
      data={mockData}
      columns={columns}
      rowKey="id"
      
      // Loading & Error states
      loading={false}
    //   error={error}
      
      // Search & Filters
      searchable={true}
      searchPlaceholder="Search..."
      onSearchChange={(value) => console.log('Search:', value)}
      filters={[
        {
          key: 'status',
          label: 'Status',
          type: 'select',
          options: [
            { label: 'Active', value: 'active' },
            { label: 'Inactive', value: 'inactive' },
          ]
        }
      ]}
      onFilterChange={(filters) => console.log('Filters:', filters)}
      
      // Pagination
      pagination={{
        currentPage: 56,
        totalPages: 10,        
      }}
      onPageChange={()=>{}}
      
      // Sorting
      sortable={true}
      defaultSort={{ key: 'name', direction: 'asc' }}
      
      // Selection
      selectable={true}
    //   selectedRows={[]}
      onSelectionChange={()=>{}}
      
      // Row interaction
      onRowClick={(row) => console.log('Clicked row:', row)}
      
      // Styling
      className="mt-4"
      stickyHeader={true}
    />

      </div>


    </div>
  )
}

export default UsersPage
