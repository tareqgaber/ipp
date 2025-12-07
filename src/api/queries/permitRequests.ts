import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { queryKeys } from "../queryKeys";
import type { PermitRequest, PermitRequestListParams } from "../types";
import type { TableResponse } from "@/components/DataTable";

// Mock data generator
const generateMockPermitRequests = (
  params: PermitRequestListParams
): TableResponse<PermitRequest> => {
  const allRequests: PermitRequest[] = [
    {
      id: "PR-2024-001",
      assignedTo: "Team A",
      contractors: "ABC Construction",
      type: "Construction",
      status: "pending",
      conflict: "None",
      rDate: "2024-01-15",
      vip: "Yes",
      assignee: "John Smith",
      countdown: "on_track",
    },
    {
      id: "PR-2024-002",
      assignedTo: "Team B",
      contractors: "XYZ Builders",
      type: "Renovation",
      status: "under_review",
      conflict: "Minor",
      rDate: "2024-01-18",
      vip: "No",
      assignee: "Sarah Johnson",
      countdown: "at_risk",
    },
    {
      id: "PR-2024-003",
      assignedTo: "Team A",
      contractors: "Demo Corp",
      type: "Demolition",
      status: "approved",
      conflict: "None",
      rDate: "2024-01-10",
      vip: "Yes",
      assignee: "Michael Chen",
      countdown: "on_track",
    },
    {
      id: "PR-2024-004",
      assignedTo: "Team C",
      contractors: "Home Builders Inc",
      type: "Construction",
      status: "approved",
      conflict: "Major",
      rDate: "2024-01-12",
      vip: "No",
      assignee: "Emily Davis",
      countdown: "breached",
    },
    {
      id: "PR-2024-005",
      assignedTo: "Team B",
      contractors: "Deck Masters",
      type: "Renovation",
      status: "rejected",
      conflict: "Minor",
      rDate: "2024-01-14",
      vip: "No",
      assignee: "David Wilson",
      countdown: "at_risk",
    },
    {
      id: "PR-2024-006",
      assignedTo: "Team A",
      contractors: "Fence Pro",
      type: "Other",
      status: "pending",
      conflict: "None",
      rDate: "2024-01-20",
      vip: "Yes",
      assignee: "Lisa Anderson",
      countdown: "on_track",
    },
  ];

  // Apply filters
  let filteredRequests = [...allRequests];

  // Search filter
  if (params.search) {
    const searchLower = params.search.toLowerCase();
    filteredRequests = filteredRequests.filter(
      (req) =>
        req.id.toLowerCase().includes(searchLower) ||
        req.assignedTo.toLowerCase().includes(searchLower) ||
        req.contractors.toLowerCase().includes(searchLower) ||
        req.assignee.toLowerCase().includes(searchLower)
    );
  }

  // Status filter
  if (params.filters?.status) {
    filteredRequests = filteredRequests.filter(
      (req) => req.status === params.filters?.status
    );
  }

  // Team filter
  if (params.filters?.team) {
    filteredRequests = filteredRequests.filter((req) =>
      req.assignedTo
        .toLowerCase()
        .includes(params.filters?.team?.toLowerCase() ?? "")
    );
  }

  // Conflict filter
  if (params.filters?.conflict) {
    filteredRequests = filteredRequests.filter(
      (req) =>
        req.conflict.toLowerCase() === params.filters?.conflict?.toLowerCase()
    );
  }

  // SLA Status (countdown) filter
  if (params.filters?.slaStatus) {
    filteredRequests = filteredRequests.filter(
      (req) => req.countdown === params.filters?.slaStatus
    );
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
  const { i18n } = useTranslation();

  return useQuery({
    queryKey: [...queryKeys.permitRequests.list(params), i18n.language],
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
