import {
  FileText,
  Clock,
  Eye,
  CheckCircle,
  XCircle,
  Edit,
  Trash,
  Download,
} from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/base/badges/badges";
import type { DataTableConfig } from "@/components/DataTable";
import type { PermitRequest } from "@/api/types";

// Status badge component
const StatusBadge = ({ status }: { status: PermitRequest["status"] }) => {
  const statusConfig = {
    pending: { color: "warning" as const, label: "Pending" },
    under_review: { color: "blue" as const, label: "Under Review" },
    approved: { color: "success" as const, label: "Approved" },
    rejected: { color: "error" as const, label: "Rejected" },
  };

  const config = statusConfig[status];

  return (
    <Badge color={config.color} size="sm">
      {config.label}
    </Badge>
  );
};

// Permit type badge component
const PermitTypeBadge = ({ type }: { type: PermitRequest["permitType"] }) => {
  const typeConfig = {
    construction: { color: "brand" as const, label: "Construction" },
    renovation: { color: "blue" as const, label: "Renovation" },
    demolition: { color: "error" as const, label: "Demolition" },
    other: { color: "gray" as const, label: "Other" },
  };

  const config = typeConfig[type];

  return (
    <Badge color={config.color} size="sm">
      {config.label}
    </Badge>
  );
};

// Priority badge component
const PriorityBadge = ({
  priority,
}: {
  priority: PermitRequest["priority"];
}) => {
  const priorityConfig = {
    low: { color: "gray" as const, label: "Low" },
    medium: { color: "blue" as const, label: "Medium" },
    high: { color: "warning" as const, label: "High" },
    urgent: { color: "error" as const, label: "Urgent" },
  };

  const config = priorityConfig[priority];

  return (
    <Badge color={config.color} size="sm">
      {config.label}
    </Badge>
  );
};

export const createPermitRequestsTableConfig = (
  onApprove: (id: string) => void,
  onReject: (id: string) => void,
  onEdit: (id: string) => void,
  onView: (id: string) => void,
  onBulkApprove: (ids: string[]) => void,
  onBulkDelete: (ids: string[]) => void,
  onExport: (ids: string[]) => void,
  t?: (key: string, ...args: any[]) => string
): DataTableConfig<PermitRequest> => ({
  title: "Permit Requests",
  subtitle: "Manage and review all permit requests",
  enableSearch: true,
  enableFilters: true,
  enableSelection: true,
  searchPlaceholder:
    t?.("pages.permitRequests.searchPlaceholder") ??
    "Search permit requests...",
  defaultPageSize: 10,

  columns: [
    {
      id: "requestNumber",
      header: "Request #",
      accessorKey: "requestNumber",
      sortable: true,
      cell: (row) => (
        <span className="font-medium text-primary-600 dark:text-primary-400 text-nowrap">
          {row.requestNumber}
        </span>
      ),
    },
    {
      id: "applicantName",
      header: "Applicant",
      accessorKey: "applicantName",
      sortable: true,
      cell: (row) => (
        <div>
          <div className="font-medium text-gray-900 dark:text-gray-100">
            {row.applicantName}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {row.applicantEmail}
          </div>
        </div>
      ),
    },
    {
      id: "permitType",
      header: "Type",
      accessorKey: "permitType",
      sortable: true,
      cell: (row) => <PermitTypeBadge type={row.permitType} />,
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      sortable: true,
      cell: (row) => <StatusBadge status={row.status} />,
    },
    {
      id: "submittedDate",
      header: "Submitted",
      accessorKey: "submittedDate",
      sortable: true,
      cell: (row) => (
        <span className="text-sm text-gray-600 dark:text-gray-400 text-nowrap">
          {format(new Date(row.submittedDate), "MMM dd, yyyy")}
        </span>
      ),
    },
    {
      id: "priority",
      header: "Priority",
      accessorKey: "priority",
      sortable: true,
      cell: (row) => <PriorityBadge priority={row.priority} />,
    },
    {
      id: "estimatedCost",
      header: "Est. Cost",
      accessorKey: "estimatedCost",
      sortable: true,
      cell: (row) => (
        <span className="font-medium text-gray-900 dark:text-gray-100">
          ${row.estimatedCost.toLocaleString()}
        </span>
      ),
    },
  ],

  metricCards: [
    {
      id: "all",
      label: "All Requests",
      value: 248,
      filterKey: "status",
      filterValue: undefined,
      percentage: "+12%",
      subtext: "vs last month",
      directionIcon: "up",
      isActive: true, // This card will be active by default
    },
    {
      id: "pending",
      label: "Pending",
      value: 89,
      filterKey: "status",
      filterValue: "pending",
      percentage: "+8%",
      subtext: "vs last month",
      directionIcon: "up",
    },
    {
      id: "under_review",
      label: "Under Review",
      value: 45,
      filterKey: "status",
      filterValue: "under_review",
      percentage: "-5%",
      subtext: "vs last month",
      directionIcon: "down",
    },
    {
      id: "approved",
      label: "Approved",
      value: 98,
      filterKey: "status",
      filterValue: "approved",
      percentage: "+15%",
      subtext: "vs last month",
      directionIcon: "up",
    },
  ],

  filters: [
    {
      type: "text",
      name: "applicantName",
      label: "Applicant Name",
      placeholder: "Search by name...",
    },
    {
      type: "select",
      name: "permitType",
      label: "Permit Type",
      options: [
        { value: "construction", label: "Construction" },
        { value: "renovation", label: "Renovation" },
        { value: "demolition", label: "Demolition" },
        { value: "other", label: "Other" },
      ],
    },
    {
      type: "select",
      name: "priority",
      label: "Priority",
      options: [
        { value: "low", label: "Low" },
        { value: "medium", label: "Medium" },
        { value: "high", label: "High" },
        { value: "urgent", label: "Urgent" },
      ],
    },
    {
      type: "dateRange",
      name: "submittedDate",
      label: "Submitted Date Range",
    },
    {
      type: "numberRange",
      name: "estimatedCost",
      label: "Estimated Cost Range",
    },
  ],

  actions: [
    {
      id: "view",
      label: "View Details",
      icon: <Eye className="h-4 w-4" />,
      onClick: (row) => onView(row.id),
    },
    {
      id: "approve",
      label: "Approve",
      icon: <CheckCircle className="h-4 w-4" />,
      onClick: (row) => onApprove(row.id),
      variant: "success",
      hidden: (row) => row.status === "approved",
    },
    {
      id: "reject",
      label: "Reject",
      icon: <XCircle className="h-4 w-4" />,
      onClick: (row) => onReject(row.id),
      variant: "danger",
      hidden: (row) => row.status === "rejected",
    },
    {
      id: "edit",
      label: "Edit",
      icon: <Edit className="h-4 w-4" />,
      onClick: (row) => onEdit(row.id),
    },
  ],

  bulkActions: [
    {
      id: "approve",
      label: "Approve Selected",
      icon: <CheckCircle className="h-4 w-4" />,
      onClick: (ids) => onBulkApprove(ids),
      variant: "success",
    },
    {
      id: "delete",
      label: "Delete Selected",
      icon: <Trash className="h-4 w-4" />,
      onClick: (ids) => onBulkDelete(ids),
      variant: "danger",
    },
    {
      id: "export",
      label: "Export Selected",
      icon: <Download className="h-4 w-4" />,
      onClick: (ids) => onExport(ids),
    },
  ],

  getRowId: (row) => row.id,
});
