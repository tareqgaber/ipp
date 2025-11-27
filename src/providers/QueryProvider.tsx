import { useState } from 'react';
import { QueryClient, QueryClientProvider, QueryCache, MutationCache } from '@tanstack/react-query';
import toast, { Toaster } from 'react-hot-toast';
import i18n from '../lib/i18n';

interface QueryProviderProps {
  children: React.ReactNode;
}

/**
 * TanStack Query Provider with optimized defaults and global error/success handling
 * 
 * Toast notifications can be controlled via meta options:
 * 
 * @example
 * // Disable error toast for a specific query
 * useQuery({
 *   queryKey: ['example'],
 *   queryFn: fetchData,
 *   meta: { disableErrorToast: true }
 * })
 * 
 * @example
 * // Disable success toast for a specific mutation
 * useMutation({
 *   mutationFn: saveData,
 *   meta: { disableSuccessToast: true }
 * })
 * 
 * @example
 * // Custom success message
 * useMutation({
 *   mutationFn: saveData,
 *   meta: { successMessage: 'Data saved successfully!' }
 * })
 */
export function QueryProvider({ children }: QueryProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error, query) => {
            // Check if error toast is disabled via meta
            if (query.meta?.disableErrorToast) {
              return;
            }
            // Global error handler for all queries
            toast.error(error.message || i18n.t('errors.queryError'));
          },
        }),
        mutationCache: new MutationCache({
          onError: (error, _variables, _context, mutation) => {
            // Check if error toast is disabled via meta
            if (mutation.meta?.disableErrorToast) {
              return;
            }
            // Global error handler for all mutations
            toast.error(error.message || i18n.t('errors.mutationError'));
          },
          onSuccess: (_data, _variables, _context, mutation) => {
            // Check if success toast is disabled via meta
            if (mutation.meta?.disableSuccessToast) {
              return;
            }
            // Get custom success message from meta or use default
            const successMessage = mutation.meta?.successMessage as string | undefined;
            toast.success(successMessage || i18n.t('errors.mutationSuccess'));
          },
        }),
        defaultOptions: {
          queries: {
            // Stale time: 1 minute (data considered fresh for 1 min)
            staleTime: 1 * 60 * 1000,
            
            // Cache time: 5 minutes (unused data kept in cache for 5 min)
            gcTime: 5 * 60 * 1000,
            
            // Retry failed requests 2 times
            retry: 2,
            
            // Retry delay: exponential backoff
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
            
            // Refetch on window focus in production
            refetchOnWindowFocus: import.meta.env.PROD,
            
            // Don't refetch on mount if data is fresh
            refetchOnMount: false,
            
            // Refetch on reconnect
            refetchOnReconnect: true,
          },
          mutations: {
            // Retry failed mutations once
            retry: 1,
            
            // Retry delay for mutations
            retryDelay: 1000,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      {/* React Query Devtools: Install @tanstack/react-query-devtools to enable */}
    </QueryClientProvider>
  );
}
