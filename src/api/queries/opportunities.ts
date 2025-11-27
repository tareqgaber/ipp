import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../axios';
import { endpoints } from '../endpoints';
import { queryKeys } from '../queryKeys';
import type {
  Opportunity,
  OpportunityListResponse,
  OpportunityDetailResponse,
  CreateOpportunityRequest,
  UpdateOpportunityRequest,
  OpportunityFilters,
} from '../types';

/**
 * Get opportunities list query
 */
export const useOpportunities = (filters?: OpportunityFilters) => {
  return useQuery({
    queryKey: queryKeys.opportunities.list(filters),
    queryFn: async (): Promise<OpportunityListResponse> => {
      const response = await axiosInstance.get<OpportunityListResponse>(
        endpoints.opportunities.list,
        { params: filters }
      );
      return response.data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

/**
 * Get opportunity detail query
 */
export const useOpportunity = (id: string | number, enabled = true) => {
  return useQuery({
    queryKey: queryKeys.opportunities.detail(id),
    queryFn: async (): Promise<OpportunityDetailResponse> => {
      const response = await axiosInstance.get<OpportunityDetailResponse>(
        endpoints.opportunities.detail(id)
      );
      return response.data;
    },
    enabled: enabled && !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Create opportunity mutation
 */
export const useCreateOpportunity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateOpportunityRequest): Promise<Opportunity> => {
      const response = await axiosInstance.post<Opportunity>(
        endpoints.opportunities.create,
        data
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.opportunities.lists() });
    },
  });
};

/**
 * Update opportunity mutation
 */
export const useUpdateOpportunity = (id: string | number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateOpportunityRequest): Promise<Opportunity> => {
      const response = await axiosInstance.put<Opportunity>(
        endpoints.opportunities.update(id),
        data
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.opportunities.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.opportunities.lists() });
    },
  });
};

/**
 * Delete opportunity mutation
 */
export const useDeleteOpportunity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string | number): Promise<void> => {
      await axiosInstance.delete(endpoints.opportunities.delete(id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.opportunities.lists() });
    },
  });
};

/**
 * Publish opportunity mutation
 */
export const usePublishOpportunity = (id: string | number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (): Promise<Opportunity> => {
      const response = await axiosInstance.post<Opportunity>(
        endpoints.opportunities.publish(id)
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.opportunities.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.opportunities.lists() });
    },
  });
};

/**
 * Unpublish opportunity mutation
 */
export const useUnpublishOpportunity = (id: string | number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (): Promise<Opportunity> => {
      const response = await axiosInstance.post<Opportunity>(
        endpoints.opportunities.unpublish(id)
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.opportunities.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.opportunities.lists() });
    },
  });
};
