/**
 * Investors API types
 */

export interface Investor {
  id: string | number;
  userId: string | number;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  investmentRange: {
    min: number;
    max: number;
  };
  industries: string[];
  location: string;
  bio?: string;
  avatar?: string;
  verified: boolean;
  totalInvestments: number;
  portfolioSize: number;
  createdAt: string;
  updatedAt: string;
}

export interface InvestorListResponse {
  data: Investor[];
  total: number;
  page: number;
  limit: number;
}

export interface InvestorDetailResponse {
  data: Investor;
}

export interface CreateInvestorRequest {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  investmentRange: {
    min: number;
    max: number;
  };
  industries: string[];
  location: string;
  bio?: string;
  avatar?: string;
}

export interface UpdateInvestorRequest {
  name?: string;
  phone?: string;
  company?: string;
  investmentRange?: {
    min: number;
    max: number;
  };
  industries?: string[];
  location?: string;
  bio?: string;
  avatar?: string;
}

export interface InvestorFilters {
  page?: number;
  limit?: number;
  verified?: boolean;
  industries?: string[];
  minInvestment?: number;
  maxInvestment?: number;
  location?: string;
  search?: string;
}
