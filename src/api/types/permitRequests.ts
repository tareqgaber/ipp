export interface PermitRequest {
  id: string;
  assignedTo: string;
  contractors: string;
  type: string;
  status: "pending" | "approved" | "rejected" | "under_review";
  conflict: string;
  rDate: string;
  vip: string;
  assignee: string;
  countdown: "on_track" | "at_risk" | "breached";
}

export interface PermitRequestListParams {
  page: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  search?: string;
  filters?: {
    status?: string;
    team?: string;
    slaStatus?: string;
    conflict?: string;
    dateRange?: {
      from?: string;
      to?: string;
    };
  };
}
