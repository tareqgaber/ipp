import { Eye, CheckCircle, XCircle, Edit, Trash, Download } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/base/badges/badges";
import type { DataTableConfig } from "@/components/DataTable";
import type { PermitRequest } from "@/api/types";

// Status badge component
const StatusBadge = ({
  status,
  t,
}: {
  status: PermitRequest["status"];
  t?: (key: string) => string;
}) => {
  const statusConfig = {
    pending: {
      color: "warning" as const,
      label: t?.("pages.permitRequests.status.pending") ?? "Pending",
    },
    under_review: {
      color: "blue" as const,
      label: t?.("pages.permitRequests.status.underReview") ?? "Under Review",
    },
    approved: {
      color: "success" as const,
      label: t?.("pages.permitRequests.status.approved") ?? "Approved",
    },
    rejected: {
      color: "error" as const,
      label: t?.("pages.permitRequests.status.rejected") ?? "Rejected",
    },
  };

  const config = statusConfig[status];

  return (
    <Badge color={config.color} size="sm">
      {config.label}
    </Badge>
  );
};

// Permit type badge component
const PermitTypeBadge = ({
  type,
  t,
}: {
  type: PermitRequest["permitType"];
  t?: (key: string) => string;
}) => {
  const typeConfig = {
    construction: {
      color: "brand" as const,
      label:
        t?.("pages.permitRequests.permitType.construction") ?? "Construction",
    },
    renovation: {
      color: "blue" as const,
      label: t?.("pages.permitRequests.permitType.renovation") ?? "Renovation",
    },
    demolition: {
      color: "error" as const,
      label: t?.("pages.permitRequests.permitType.demolition") ?? "Demolition",
    },
    other: {
      color: "gray" as const,
      label: t?.("pages.permitRequests.permitType.other") ?? "Other",
    },
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
  t,
}: {
  priority: PermitRequest["priority"];
  t?: (key: string) => string;
}) => {
  const priorityConfig = {
    low: {
      color: "gray" as const,
      label: t?.("pages.permitRequests.priority.low") ?? "Low",
    },
    medium: {
      color: "blue" as const,
      label: t?.("pages.permitRequests.priority.medium") ?? "Medium",
    },
    high: {
      color: "warning" as const,
      label: t?.("pages.permitRequests.priority.high") ?? "High",
    },
    urgent: {
      color: "error" as const,
      label: t?.("pages.permitRequests.priority.urgent") ?? "Urgent",
    },
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
  title: t?.("pages.permitRequests.title") ?? "Permit Requests",
  subtitle:
    t?.("pages.permitRequests.subtitle") ??
    "Manage and review all permit requests",
  enableSearch: true,
  enableFilters: true,
  enableSelection: true,
  searchPlaceholder:
    t?.("pages.permitRequests.searchPlaceholder") ??
    "Search permit requests...",
  filterSubtitle:
    t?.("pages.permitRequests.filterSubtitle") ??
    "Apply filters to narrow down permit requests",
  defaultPageSize: 10,

  columns: [
    {
      id: "requestNumber",
      header: t?.("pages.permitRequests.columns.requestNumber") ?? "Request #",
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
      header: t?.("pages.permitRequests.columns.applicant") ?? "Applicant",
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
      header: t?.("pages.permitRequests.columns.type") ?? "Type",
      accessorKey: "permitType",
      sortable: true,
      cell: (row) => <PermitTypeBadge type={row.permitType} t={t} />,
    },
    {
      id: "status",
      header: t?.("pages.permitRequests.columns.status") ?? "Status",
      accessorKey: "status",
      sortable: true,
      cell: (row) => <StatusBadge status={row.status} t={t} />,
    },
    {
      id: "submittedDate",
      header: t?.("pages.permitRequests.columns.submitted") ?? "Submitted",
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
      header: t?.("pages.permitRequests.columns.priority") ?? "Priority",
      accessorKey: "priority",
      sortable: true,
      cell: (row) => <PriorityBadge priority={row.priority} t={t} />,
    },
    {
      id: "estimatedCost",
      header: t?.("pages.permitRequests.columns.estimatedCost") ?? "Est. Cost",
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
      label:
        t?.("pages.permitRequests.metricCards.totalOpenRequests") ??
        "All Requests",
      value: 248,
      filterKey: "status",
      filterValue: undefined,
      percentage: "+12%",
      subtext:
        t?.("pages.permitRequests.metricCards.ofTotal") ?? "vs last month",
      directionIcon: "up",
      isActive: true, // This card will be active by default
    },
    {
      id: "pending",
      label: t?.("pages.permitRequests.metricCards.vipRequests") ?? "Pending",
      value: 89,
      filterKey: "status",
      filterValue: "pending",
      percentage: "+8%",
      subtext:
        t?.("pages.permitRequests.metricCards.ofTotal") ?? "vs last month",
      directionIcon: "up",
    },
    {
      id: "under_review",
      label:
        t?.("pages.permitRequests.metricCards.urgentRequests") ??
        "Under Review",
      value: 45,
      filterKey: "status",
      filterValue: "under_review",
      percentage: "-5%",
      subtext:
        t?.("pages.permitRequests.metricCards.ofTotal") ?? "vs last month",
      directionIcon: "down",
    },
    {
      id: "approved",
      label:
        t?.("pages.permitRequests.metricCards.normalRequests") ?? "Approved",
      value: 98,
      filterKey: "status",
      filterValue: "approved",
      percentage: "+15%",
      subtext:
        t?.("pages.permitRequests.metricCards.ofTotal") ?? "vs last month",
      directionIcon: "up",
    },
    {
      id: "approved",
      label:
        t?.("pages.permitRequests.metricCards.completedRequests") ?? "Approved",
      value: 98,
      filterKey: "status",
      filterValue: "approved",
      percentage: "+15%",
      subtext:
        t?.("pages.permitRequests.metricCards.ofTotal") ?? "vs last month",
      directionIcon: "up",
    },
  ],

  filters: [
    {
      type: "text",
      name: "applicantName",
      label:
        t?.("pages.permitRequests.filters.applicantName") ?? "Applicant Name",
      placeholder:
        t?.("pages.permitRequests.filters.applicantNamePlaceholder") ??
        "Search by name...",
    },
    {
      type: "separator",
    },
    {
      type: "select",
      name: "permitType",
      label: t?.("pages.permitRequests.filters.permitType") ?? "Permit Type",
      options: [
        {
          value: "construction",
          label:
            t?.("pages.permitRequests.permitType.construction") ??
            "Construction",
        },
        {
          value: "renovation",
          label:
            t?.("pages.permitRequests.permitType.renovation") ?? "Renovation",
        },
        {
          value: "demolition",
          label:
            t?.("pages.permitRequests.permitType.demolition") ?? "Demolition",
        },
        {
          value: "other",
          label: t?.("pages.permitRequests.permitType.other") ?? "Other",
        },
      ],
    },
    {
      type: "select",
      name: "priority",
      label: "Priority",
      options: [
        {
          value: "low",
          label: t?.("pages.permitRequests.priority.low") ?? "Low",
        },
        {
          value: "medium",
          label: t?.("pages.permitRequests.priority.medium") ?? "Medium",
        },
        {
          value: "high",
          label: t?.("pages.permitRequests.priority.high") ?? "High",
        },
        {
          value: "urgent",
          label: t?.("pages.permitRequests.priority.urgent") ?? "Urgent",
        },
      ],
    },
    {
      type: "separator",
    },
    {
      type: "dateRange",
      name: "submittedDate",
      label:
        t?.("pages.permitRequests.filters.submittedDateRange") ??
        "Submitted Date Range",
    },
    {
      type: "numberRange",
      name: "estimatedCost",
      label:
        t?.("pages.permitRequests.filters.estimatedCostRange") ??
        "Estimated Cost Range",
    },
  ],

  actions: [
    {
      id: "view",
      label: t?.("pages.permitRequests.actions.viewDetails") ?? "View Details",
      icon: <Eye className="h-4 w-4" />,
      onClick: (row) => onView(row.id),
    },
    {
      id: "approve",
      label: t?.("pages.permitRequests.actions.approve") ?? "Approve",
      icon: <CheckCircle className="h-4 w-4" />,
      onClick: (row) => onApprove(row.id),
      variant: "success",
      hidden: (row) => row.status === "approved",
    },
    {
      id: "reject",
      label: t?.("pages.permitRequests.actions.reject") ?? "Reject",
      icon: <XCircle className="h-4 w-4" />,
      onClick: (row) => onReject(row.id),
      variant: "danger",
      hidden: (row) => row.status === "rejected",
    },
    {
      id: "edit",
      label: t?.("pages.permitRequests.actions.edit") ?? "Edit",
      icon: <Edit className="h-4 w-4" />,
      onClick: (row) => onEdit(row.id),
    },
  ],

  bulkActions: [
    {
      id: "approve",
      label:
        t?.("pages.permitRequests.bulkActions.approveSelected") ??
        "Approve Selected",
      icon: <CheckCircle className="h-4 w-4" />,
      onClick: (ids) => onBulkApprove(ids),
      variant: "success",
    },
    {
      id: "delete",
      label:
        t?.("pages.permitRequests.bulkActions.deleteSelected") ??
        "Delete Selected",
      icon: <Trash className="h-4 w-4" />,
      onClick: (ids) => onBulkDelete(ids),
      variant: "danger",
    },
    {
      id: "export",
      label:
        t?.("pages.permitRequests.bulkActions.exportSelected") ??
        "Export Selected",
      icon: <Download className="h-4 w-4" />,
      onClick: (ids) => onExport(ids),
    },
  ],

  getRowId: (row) => row.id,
});
