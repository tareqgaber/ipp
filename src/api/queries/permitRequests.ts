import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";
import type { PermitRequest, PermitRequestListParams } from "../types";
import type { TableResponse } from "@/components/DataTable";

// Mock data generator
const generateMockPermitRequests = (
  params: PermitRequestListParams
): TableResponse<PermitRequest> => {
  const allRequests: PermitRequest[] = [
    {
      id: "1",
      requestNumber: "PR-2024-001",
      applicantName: "John Smith",
      applicantEmail: "john.smith@example.com",
      permitType: "construction",
      status: "pending",
      submittedDate: "2024-01-15T10:00:00Z",
      location: "123 Main St, Downtown",
      estimatedCost: 150000,
      priority: "high",
      description: "New commercial building construction",
    },
    {
      id: "2",
      requestNumber: "PR-2024-002",
      applicantName: "Sarah Johnson",
      applicantEmail: "sarah.j@example.com",
      permitType: "renovation",
      status: "under_review",
      submittedDate: "2024-01-18T14:30:00Z",
      location: "456 Oak Ave, Westside",
      estimatedCost: 75000,
      priority: "medium",
      description: "Residential kitchen and bathroom renovation",
    },
    {
      id: "3",
      requestNumber: "PR-2024-003",
      applicantName: "Michael Chen",
      applicantEmail: "m.chen@example.com",
      permitType: "demolition",
      status: "approved",
      submittedDate: "2024-01-10T09:15:00Z",
      reviewedDate: "2024-01-20T16:00:00Z",
      location: "789 Pine Rd, Eastside",
      estimatedCost: 50000,
      priority: "urgent",
      description: "Old warehouse demolition",
    },
    {
      id: "4",
      requestNumber: "PR-2024-004",
      applicantName: "Emily Davis",
      applicantEmail: "emily.davis@example.com",
      permitType: "construction",
      status: "approved",
      submittedDate: "2024-01-12T11:00:00Z",
      reviewedDate: "2024-01-22T10:30:00Z",
      location: "321 Elm St, Northside",
      estimatedCost: 200000,
      priority: "high",
      description: "Residential home construction",
    },
    {
      id: "5",
      requestNumber: "PR-2024-005",
      applicantName: "David Wilson",
      applicantEmail: "d.wilson@example.com",
      permitType: "renovation",
      status: "rejected",
      submittedDate: "2024-01-14T13:45:00Z",
      reviewedDate: "2024-01-24T09:00:00Z",
      location: "654 Maple Dr, Southside",
      estimatedCost: 30000,
      priority: "low",
      description: "Deck addition - zoning violation",
    },
    {
      id: "6",
      requestNumber: "PR-2024-006",
      applicantName: "Lisa Anderson",
      applicantEmail: "lisa.a@example.com",
      permitType: "other",
      status: "pending",
      submittedDate: "2024-01-20T08:30:00Z",
      location: "987 Birch Ln, Central",
      estimatedCost: 15000,
      priority: "low",
      description: "Fence installation",
    },
  ];

  // Apply filters
  let filteredRequests = [...allRequests];

  // Search filter
  if (params.search) {
    const searchLower = params.search.toLowerCase();
    filteredRequests = filteredRequests.filter(
      (req) =>
        req.requestNumber.toLowerCase().includes(searchLower) ||
        req.applicantName.toLowerCase().includes(searchLower) ||
        req.applicantEmail.toLowerCase().includes(searchLower) ||
        req.location.toLowerCase().includes(searchLower)
    );
  }

  // Status filter
  if (params.filters?.status) {
    filteredRequests = filteredRequests.filter(
      (req) => req.status === params.filters?.status
    );
  }

  // Permit type filter
  if (params.filters?.permitType) {
    filteredRequests = filteredRequests.filter(
      (req) => req.permitType === params.filters?.permitType
    );
  }

  // Priority filter
  if (params.filters?.priority) {
    filteredRequests = filteredRequests.filter(
      (req) => req.priority === params.filters?.priority
    );
  }

  // Applicant name filter
  if (params.filters?.applicantName) {
    const nameLower = params.filters.applicantName.toLowerCase();
    filteredRequests = filteredRequests.filter((req) =>
      req.applicantName.toLowerCase().includes(nameLower)
    );
  }

  // Cost range filter
  if (params.filters?.estimatedCost) {
    const { min, max } = params.filters.estimatedCost;
    if (min !== undefined) {
      filteredRequests = filteredRequests.filter(
        (req) => req.estimatedCost >= min
      );
    }
    if (max !== undefined) {
      filteredRequests = filteredRequests.filter(
        (req) => req.estimatedCost <= max
      );
    }
  }

  // Sorting
  if (params.sortBy) {
    filteredRequests.sort((a, b) => {
      const aValue = a[params.sortBy as keyof PermitRequest];
      const bValue = b[params.sortBy as keyof PermitRequest];

      if (aValue < bValue) return params.sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return params.sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }

  // Pagination
  const total = filteredRequests.length;
  const totalPages = Math.ceil(total / params.pageSize);
  const startIndex = (params.page - 1) * params.pageSize;
  const endIndex = startIndex + params.pageSize;
  const paginatedData = filteredRequests.slice(startIndex, endIndex);

  return {
    data: paginatedData,
    meta: {
      total,
      page: params.page,
      pageSize: params.pageSize,
      totalPages,
    },
  };
};

/**
 * Fetch permit requests list with pagination, sorting, and filtering
 */
export const usePermitRequestsQuery = (params: PermitRequestListParams) => {
  return useQuery({
    queryKey: queryKeys.permitRequests.list(params),
    queryFn: async (): Promise<TableResponse<PermitRequest>> => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Return mock data
      return generateMockPermitRequests(params);
    },
    staleTime: 30000, // 30 seconds
  });
};

/**
 * Approve a permit request
 */
export const useApprovePermitRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log("Approving permit request:", id);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.permitRequests.all });
    },
    meta: {
      successMessage: "Permit request approved successfully",
    },
  });
};

/**
 * Reject a permit request
 */
export const useRejectPermitRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log("Rejecting permit request:", id);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.permitRequests.all });
    },
    meta: {
      successMessage: "Permit request rejected",
    },
  });
};

/**
 * Bulk delete permit requests
 */
export const useBulkDeletePermitRequests = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ids: string[]): Promise<void> => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      console.log("Deleting permit requests:", ids);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.permitRequests.all });
    },
    meta: {
      successMessage: "Permit requests deleted successfully",
    },
  });
};

/**
 * Bulk approve permit requests
 */
export const useBulkApprovePermitRequests = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ids: string[]): Promise<void> => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      console.log("Approving permit requests:", ids);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.permitRequests.all });
    },
    meta: {
      successMessage: "Permit requests approved successfully",
    },
  });
};
