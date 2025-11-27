/**
 * Opportunities API types
 */

export interface Opportunity {
  id: string | number;
  title: string;
  description: string;
  status: 'draft' | 'published' | 'closed' | 'archived';
  category: string;
  industry: string;
  fundingRequired: number;
  fundingRaised: number;
  equity: number;
  location: string;
  imageUrl?: string;
  documents?: string[];
  createdBy: string | number;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface OpportunityListResponse {
  data: Opportunity[];
  total: number;
  page: number;
  limit: number;
}

export interface OpportunityDetailResponse {
  data: Opportunity;
}

export interface CreateOpportunityRequest {
  title: string;
  description: string;
  category: string;
  industry: string;
  fundingRequired: number;
  equity: number;
  location: string;
  imageUrl?: string;
  documents?: string[];
}

export interface UpdateOpportunityRequest {
  title?: string;
  description?: string;
  category?: string;
  industry?: string;
  fundingRequired?: number;
  equity?: number;
  location?: string;
  imageUrl?: string;
  documents?: string[];
  status?: 'draft' | 'published' | 'closed' | 'archived';
}

export interface OpportunityFilters {
  page?: number;
  limit?: number;
  status?: string;
  category?: string;
  industry?: string;
  minFunding?: number;
  maxFunding?: number;
  search?: string;
}
