/**
 * Centralized API endpoints
 */

export const endpoints = {
  // Auth endpoints
  auth: {
    login: '/login',
    logout: '/auth/logout',
    register: '/signup',
    refresh: '/auth/refresh',
    profile: '/auth/profile',
    updateProfile: '/auth/profile',
    changePassword: '/auth/change-password',
  },

  // Opportunities endpoints
  opportunities: {
    list: '/opportunities',
    detail: (id: string | number) => `/opportunities/${id}`,
    create: '/opportunities',
    update: (id: string | number) => `/opportunities/${id}`,
    delete: (id: string | number) => `/opportunities/${id}`,
    publish: (id: string | number) => `/opportunities/${id}/publish`,
    unpublish: (id: string | number) => `/opportunities/${id}/unpublish`,
  },

  // Investors endpoints
  investors: {
    list: '/investors',
    detail: (id: string | number) => `/investors/${id}`,
    create: '/investors',
    update: (id: string | number) => `/investors/${id}`,
    delete: (id: string | number) => `/investors/${id}`,
    verify: (id: string | number) => `/investors/${id}/verify`,
  },

  // Site Opportunities endpoints
  siteOpportunities: {
    list: '/site-opportunities',
    detail: (id: string | number) => `/site-opportunities/${id}`,
  },
} as const;
