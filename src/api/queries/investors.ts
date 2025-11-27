import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../axios';
import { endpoints } from '../endpoints';
import { queryKeys } from '../queryKeys';
import type {
  Investor,
  InvestorListResponse,
  InvestorDetailResponse,
  CreateInvestorRequest,
  UpdateInvestorRequest,
  InvestorFilters,
} from '../types';

/**
 * Get investors list query
 */
export const useInvestors = (filters?: InvestorFilters) => {
  return useQuery({
    queryKey: queryKeys.investors.list(filters),
    queryFn: async (): Promise<InvestorListResponse> => {
      const response = await axiosInstance.get<InvestorListResponse>(
        endpoints.investors.list,
        { params: filters }
      );
      return response.data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

/**
 * Get investor detail query
 */
export const useInvestor = (id: string | number, enabled = true) => {
  return useQuery({
    queryKey: queryKeys.investors.detail(id),
    queryFn: async (): Promise<InvestorDetailResponse> => {
      const response = await axiosInstance.get<InvestorDetailResponse>(
        endpoints.investors.detail(id)
      );
      return response.data;
    },
    enabled: enabled && !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Create investor mutation
 */
export const useCreateInvestor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateInvestorRequest): Promise<Investor> => {
      const response = await axiosInstance.post<Investor>(
        endpoints.investors.create,
        data
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.investors.lists() });
    },
  });
};

/**
 * Update investor mutation
 */
export const useUpdateInvestor = (id: string | number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateInvestorRequest): Promise<Investor> => {
      const response = await axiosInstance.put<Investor>(
        endpoints.investors.update(id),
        data
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.investors.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.investors.lists() });
    },
  });
};

/**
 * Delete investor mutation
 */
export const useDeleteInvestor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string | number): Promise<void> => {
      await axiosInstance.delete(endpoints.investors.delete(id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.investors.lists() });
    },
  });
};

/**
 * Verify investor mutation
 */
export const useVerifyInvestor = (id: string | number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (): Promise<Investor> => {
      const response = await axiosInstance.post<Investor>(
        endpoints.investors.verify(id)
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.investors.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.investors.lists() });
    },
  });
};
