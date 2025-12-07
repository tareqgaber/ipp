import { Badge } from "@/components/base/badges/badges";
import type { DataTableConfig } from "@/components/DataTable";
import type { PermitRequest } from "@/api/types";
import { Plus } from "@untitledui/icons";

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

// Countdown badge component
const CountdownBadge = ({
  countdown,
  t,
}: {
  countdown: PermitRequest["countdown"];
  t?: (key: string) => string;
}) => {
  const countdownConfig = {
    on_track: {
      color: "success" as const,
      label: t?.("pages.permitRequests.countdown.onTrack") ?? "On Track",
    },
    at_risk: {
      color: "warning" as const,
      label: t?.("pages.permitRequests.countdown.atRisk") ?? "At Risk",
    },
    breached: {
      color: "error" as const,
      label: t?.("pages.permitRequests.countdown.breached") ?? "Breached",
    },
  };

  const config = countdownConfig[countdown];

  return (
    <Badge color={config.color} size="sm">
      {config.label}
    </Badge>
  );
};

export const createPermitRequestsTableConfig = (
  onAssign: (id: string) => void,
  onViewHistory: (id: string) => void,
  onViewRequest: (id: string) => void,
  onBulkAssign: (ids: string[]) => void,
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
      id: "id",
      header: t?.("pages.permitRequests.columns.id") ?? "ID",
      accessorKey: "id",
      sortable: true,
      cell: (row) => (
        <span className="font-medium text-primary-600 dark:text-primary-400 text-nowrap">
          {row.id}
        </span>
      ),
    },
    {
      id: "assignedTo",
      header: t?.("pages.permitRequests.columns.assignedTo") ?? "Assigned To",
      accessorKey: "assignedTo",
      sortable: true,
    },
    {
      id: "contractors",
      header: t?.("pages.permitRequests.columns.contractors") ?? "Contractors",
      accessorKey: "contractors",
      sortable: true,
      className: "text-nowrap",
    },
    {
      id: "type",
      header: t?.("pages.permitRequests.columns.type") ?? "Type",
      accessorKey: "type",
      sortable: true,
    },
    {
      id: "status",
      header: t?.("pages.permitRequests.columns.status") ?? "Status",
      accessorKey: "status",
      sortable: true,
      cell: (row) => <StatusBadge status={row.status} t={t} />,
    },
    {
      id: "conflict",
      header: t?.("pages.permitRequests.columns.conflict") ?? "Conflict",
      accessorKey: "conflict",
      sortable: true,
    },
    {
      id: "rDate",
      header: t?.("pages.permitRequests.columns.rDate") ?? "R. Date",
      accessorKey: "rDate",
      sortable: true,
      className: "text-nowrap",
    },
    {
      id: "vip",
      header: t?.("pages.permitRequests.columns.vip") ?? "VIP",
      accessorKey: "vip",
      sortable: true,
    },
    {
      id: "assignee",
      header: t?.("pages.permitRequests.columns.assignee") ?? "Assignee",
      accessorKey: "assignee",
      sortable: true,
      className: "text-nowrap",
    },
    {
      id: "countdown",
      header: t?.("pages.permitRequests.columns.countdown") ?? "Countdown",
      accessorKey: "countdown",
      sortable: true,
      cell: (row) => <CountdownBadge countdown={row.countdown} t={t} />,
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
      id: "completed",
      label:
        t?.("pages.permitRequests.metricCards.completedRequests") ??
        "Completed",
      value: 98,
      filterKey: "status",
      filterValue: "completed",
      percentage: "+15%",
      subtext:
        t?.("pages.permitRequests.metricCards.ofTotal") ?? "vs last month",
      directionIcon: "up",
    },
  ],

  filters: [
    {
      type: "select",
      name: "team",
      label: t?.("pages.permitRequests.filters.team") ?? "Team",
      options: [
        {
          value: "team_a",
          label: t?.("pages.permitRequests.team.teamA") ?? "Team A",
        },
        {
          value: "team_b",
          label: t?.("pages.permitRequests.team.teamB") ?? "Team B",
        },
        {
          value: "team_c",
          label: t?.("pages.permitRequests.team.teamC") ?? "Team C",
        },
      ],
    },
    {
      type: "separator",
    },
    {
      type: "select",
      name: "slaStatus",
      label: t?.("pages.permitRequests.filters.slaStatus") ?? "SLA Status",
      options: [
        {
          value: "on_track",
          label: t?.("pages.permitRequests.slaStatus.onTrack") ?? "On Track",
        },
        {
          value: "at_risk",
          label: t?.("pages.permitRequests.slaStatus.atRisk") ?? "At Risk",
        },
        {
          value: "breached",
          label: t?.("pages.permitRequests.slaStatus.breached") ?? "Breached",
        },
      ],
    },
    {
      type: "select",
      name: "conflict",
      label: t?.("pages.permitRequests.filters.conflict") ?? "Conflict",
      options: [
        {
          value: "none",
          label: t?.("pages.permitRequests.conflict.none") ?? "None",
        },
        {
          value: "minor",
          label: t?.("pages.permitRequests.conflict.minor") ?? "Minor",
        },
        {
          value: "major",
          label: t?.("pages.permitRequests.conflict.major") ?? "Major",
        },
      ],
    },
    {
      type: "separator",
    },
    {
      type: "dateRange",
      name: "dateRange",
      label: t?.("pages.permitRequests.filters.dateRange") ?? "Date Range",
    },
  ],

  actions: [
    {
      id: "assign",
      label: t?.("pages.permitRequests.actions.assign") ?? "Assign",
      onClick: (row) => onAssign(row.id),
    },
    {
      id: "viewHistory",
      label: t?.("pages.permitRequests.actions.viewHistory") ?? "View History",
      onClick: (row) => onViewHistory(row.id),
    },
    {
      id: "viewRequest",
      label: t?.("pages.permitRequests.actions.viewRequest") ?? "View Request",
      onClick: (row) => onViewRequest(row.id),
    },
  ],

  bulkActions: [
    {
      id: "assign",
      label:
        t?.("pages.permitRequests.bulkActions.assignSelected") ??
        "Assign Selected",
      icon: <Plus className="h-4 w-4" />,
      onClick: (ids) => onBulkAssign(ids),
      variant: "primary",
    },
  ],

  getRowId: (row) => row.id,
});
