export interface PermitRequest {
  id: string;
  requestNumber: string;
  applicantName: string;
  applicantEmail: string;
  permitType: "construction" | "renovation" | "demolition" | "other";
  status: "pending" | "approved" | "rejected" | "under_review";
  submittedDate: string;
  reviewedDate?: string;
  location: string;
  estimatedCost: number;
  priority: "low" | "medium" | "high" | "urgent";
  description?: string;
}

export interface PermitRequestListParams {
  page: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  search?: string;
  filters?: {
    status?: string;
    permitType?: string;
    priority?: string;
    applicantName?: string;
    submittedDate?: {
      from?: string;
      to?: string;
    };
    estimatedCost?: {
      min?: number;
      max?: number;
    };
  };
}
