/**
 * Unified TanStack Query keys factory
 * Provides consistent cache key structure across the app
 */

export const queryKeys = {
  // Auth keys
  auth: {
    all: ['auth'] as const,
    profile: () => [...queryKeys.auth.all, 'profile'] as const,
  },

  // Opportunities keys
  opportunities: {
    all: ['opportunities'] as const,
    lists: () => [...queryKeys.opportunities.all, 'list'] as const,
    list: (filters?: Record<string, any>) =>
      [...queryKeys.opportunities.lists(), { filters }] as const,
    details: () => [...queryKeys.opportunities.all, 'detail'] as const,
    detail: (id: string | number) =>
      [...queryKeys.opportunities.details(), id] as const,
  },

  // Investors keys
  investors: {
    all: ['investors'] as const,
    lists: () => [...queryKeys.investors.all, 'list'] as const,
    list: (filters?: Record<string, any>) =>
      [...queryKeys.investors.lists(), { filters }] as const,
    details: () => [...queryKeys.investors.all, 'detail'] as const,
    detail: (id: string | number) =>
      [...queryKeys.investors.details(), id] as const,
  },

  // Site Opportunities keys
  siteOpportunities: {
    all: ['siteOpportunities'] as const,
    lists: () => [...queryKeys.siteOpportunities.all, 'list'] as const,
    list: (filters?: Record<string, any>) =>
      [...queryKeys.siteOpportunities.lists(), { filters }] as const,
    details: () => [...queryKeys.siteOpportunities.all, 'detail'] as const,
    detail: (id: string | number) =>
      [...queryKeys.siteOpportunities.details(), id] as const,
  },
} as const;
