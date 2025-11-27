import { useQuery } from '@tanstack/react-query';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { axiosInstance } from '../axios';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { endpoints } from '../endpoints';
import { queryKeys } from '../queryKeys';
import type {
  SiteOpportunity,
  SiteOpportunityListResponse,
  SiteOpportunityDetailResponse,
  SiteOpportunityFilters,
} from '../types';

// Mock data for site opportunities
const mockSiteOpportunities: SiteOpportunity[] = [
  {
    id: '1',
    title: 'EHV Power Transformers',
    description: 'High-voltage transformers with strong demand and localization potential in manufacturing and services.',
    spendRange: '12-16B',
    quantityRange: '550-750',
    localSuppliers: 0,
    globalSuppliers: 5,
    icon: 'TrendingUp',
    category: 'Energy Infrastructure',
    localizationAreas: [
      {
        title: 'Design & Engineering',
      },
      {
        title: 'Sourcing',
        items: ['Silicon steel'],
      },
      {
        title: 'Manufacturing',
        items: [
          'Core manufacturing',
          'Winding of Cu/Al conductors',
          'Insulation wrapping',
          'Coil drying',
          'Tank fabrication etc.',
        ],
      },
      {
        title: 'Assembly & Testing',
        items: [
          'Assemble the reactor with core, windings, and other accessories',
          'Conduct required tests to ensure safety and performance standards are met.',
        ],
      },
      {
        title: 'After Sales Services',
      },
    ],
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: '2',
    title: 'Solar Panel Systems',
    description: 'Renewable energy solutions with growing market demand and government support for local manufacturing.',
    spendRange: '8-12B',
    quantityRange: '2000-3000',
    localSuppliers: 2,
    globalSuppliers: 12,
    icon: 'Sun',
    category: 'Renewable Energy',
    localizationAreas: [
      {
        title: 'Research & Development',
        items: ['Solar cell efficiency research', 'New materials development'],
      },
      {
        title: 'Manufacturing',
        items: [
          'Solar cell production',
          'Panel assembly',
          'Glass and frame manufacturing',
          'Junction box assembly',
        ],
      },
      {
        title: 'Installation & Integration',
        items: [
          'Mounting systems installation',
          'Grid integration services',
          'System commissioning',
        ],
      },
      {
        title: 'Maintenance & Support',
        items: ['Regular maintenance', 'Performance monitoring', 'Warranty services'],
      },
    ],
    createdAt: '2024-02-20T00:00:00Z',
    updatedAt: '2024-02-20T00:00:00Z',
  },
  {
    id: '3',
    title: 'Smart Grid Infrastructure',
    description: 'Advanced grid technology with high demand for modernization and digitalization of energy networks.',
    spendRange: '15-20B',
    quantityRange: '300-500',
    localSuppliers: 1,
    globalSuppliers: 8,
    icon: 'Network',
    category: 'Smart Infrastructure',
    createdAt: '2024-03-10T00:00:00Z',
    updatedAt: '2024-03-10T00:00:00Z',
  },
  {
    id: '4',
    title: 'Wind Turbine Components',
    description: 'Critical components for wind energy generation with significant localization opportunities.',
    spendRange: '10-14B',
    quantityRange: '400-600',
    localSuppliers: 0,
    globalSuppliers: 6,
    icon: 'Wind',
    category: 'Renewable Energy',
    localizationAreas: [
      {
        title: 'Component Manufacturing',
        items: [
          'Blade manufacturing',
          'Tower fabrication',
          'Nacelle assembly',
          'Generator production',
        ],
      },
      {
        title: 'Installation Services',
        items: ['Site preparation', 'Turbine installation', 'Grid connection'],
      },
      {
        title: 'Operations & Maintenance',
        items: [
          'Preventive maintenance',
          'Condition monitoring',
          'Spare parts supply',
          'Emergency repairs',
        ],
      },
    ],
    createdAt: '2024-01-25T00:00:00Z',
    updatedAt: '2024-01-25T00:00:00Z',
  },
  {
    id: '5',
    title: 'Battery Storage Systems',
    description: 'Energy storage solutions with rapidly growing demand for grid stability and renewable integration.',
    spendRange: '18-25B',
    quantityRange: '1000-1500',
    localSuppliers: 1,
    globalSuppliers: 10,
    icon: 'Battery',
    category: 'Energy Storage',
    createdAt: '2024-02-15T00:00:00Z',
    updatedAt: '2024-02-15T00:00:00Z',
  },
  {
    id: '6',
    title: 'Electric Vehicle Charging Stations',
    description: 'EV infrastructure with government backing and growing market adoption across urban areas.',
    spendRange: '5-8B',
    quantityRange: '3000-5000',
    localSuppliers: 3,
    globalSuppliers: 15,
    icon: 'Zap',
    category: 'Transportation',
    createdAt: '2024-03-05T00:00:00Z',
    updatedAt: '2024-03-05T00:00:00Z',
  },
  {
    id: '7',
    title: 'Water Desalination Plants',
    description: 'Essential water infrastructure with critical need for capacity expansion and modernization.',
    spendRange: '20-30B',
    quantityRange: '50-100',
    localSuppliers: 2,
    globalSuppliers: 7,
    icon: 'Droplet',
    category: 'Water Infrastructure',
    createdAt: '2024-01-20T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z',
  },
  {
    id: '8',
    title: 'Industrial Automation Systems',
    description: 'Advanced automation solutions for manufacturing sector with strong localization potential.',
    spendRange: '9-13B',
    quantityRange: '800-1200',
    localSuppliers: 4,
    globalSuppliers: 20,
    icon: 'Settings',
    category: 'Manufacturing',
    createdAt: '2024-02-28T00:00:00Z',
    updatedAt: '2024-02-28T00:00:00Z',
  },
  {
    id: '9',
    title: 'Telecommunications Infrastructure',
    description: '5G network equipment with urgent demand for nationwide coverage expansion.',
    spendRange: '25-35B',
    quantityRange: '10000-15000',
    localSuppliers: 5,
    globalSuppliers: 9,
    icon: 'Signal',
    category: 'Telecommunications',
    createdAt: '2024-03-15T00:00:00Z',
    updatedAt: '2024-03-15T00:00:00Z',
  },
  {
    id: '10',
    title: 'LED Lighting Systems',
    description: 'Energy-efficient lighting solutions for urban infrastructure and commercial applications.',
    spendRange: '4-6B',
    quantityRange: '5000-8000',
    localSuppliers: 6,
    globalSuppliers: 18,
    icon: 'Lightbulb',
    category: 'Energy Efficiency',
    createdAt: '2024-02-10T00:00:00Z',
    updatedAt: '2024-02-10T00:00:00Z',
  },
  {
    id: '11',
    title: 'Railway Signaling Equipment',
    description: 'Modern signaling systems for expanding railway network with safety and efficiency improvements.',
    spendRange: '8-12B',
    quantityRange: '200-400',
    localSuppliers: 2,
    globalSuppliers: 8,
    icon: 'Train',
    category: 'Transportation',
    createdAt: '2024-01-18T00:00:00Z',
    updatedAt: '2024-01-18T00:00:00Z',
  },
  {
    id: '12',
    title: 'Medical Imaging Equipment',
    description: 'Advanced diagnostic equipment for healthcare expansion and modernization initiatives.',
    spendRange: '15-22B',
    quantityRange: '300-500',
    localSuppliers: 1,
    globalSuppliers: 12,
    icon: 'Activity',
    category: 'Healthcare',
    createdAt: '2024-03-08T00:00:00Z',
    updatedAt: '2024-03-08T00:00:00Z',
  },
  {
    id: '13',
    title: 'Construction Heavy Machinery',
    description: 'Heavy equipment for mega-projects and infrastructure development initiatives.',
    spendRange: '12-18B',
    quantityRange: '600-900',
    localSuppliers: 3,
    globalSuppliers: 14,
    icon: 'Truck',
    category: 'Construction',
    createdAt: '2024-02-05T00:00:00Z',
    updatedAt: '2024-02-05T00:00:00Z',
  },
  {
    id: '14',
    title: 'Data Center Infrastructure',
    description: 'Cloud computing infrastructure with growing demand for digital transformation initiatives.',
    spendRange: '20-28B',
    quantityRange: '100-200',
    localSuppliers: 1,
    globalSuppliers: 10,
    icon: 'Server',
    category: 'Technology',
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-03-01T00:00:00Z',
  },
  {
    id: '15',
    title: 'Petrochemical Processing Equipment',
    description: 'Advanced refining and processing equipment for expanding petrochemical sector.',
    spendRange: '30-45B',
    quantityRange: '150-250',
    localSuppliers: 2,
    globalSuppliers: 9,
    icon: 'Factory',
    category: 'Oil & Gas',
    createdAt: '2024-01-30T00:00:00Z',
    updatedAt: '2024-01-30T00:00:00Z',
  },
  {
    id: '16',
    title: 'Agricultural Machinery',
    description: 'Modern farming equipment to support food security and agricultural modernization.',
    spendRange: '7-10B',
    quantityRange: '1000-1500',
    localSuppliers: 4,
    globalSuppliers: 16,
    icon: 'Tractor',
    category: 'Agriculture',
    createdAt: '2024-02-22T00:00:00Z',
    updatedAt: '2024-02-22T00:00:00Z',
  },
  {
    id: '17',
    title: 'Airport Security Systems',
    description: 'Advanced security and screening systems for airport expansion projects.',
    spendRange: '6-9B',
    quantityRange: '250-400',
    localSuppliers: 2,
    globalSuppliers: 11,
    icon: 'Shield',
    category: 'Security',
    createdAt: '2024-03-12T00:00:00Z',
    updatedAt: '2024-03-12T00:00:00Z',
  },
  {
    id: '18',
    title: 'Marine Navigation Equipment',
    description: 'Navigation and communication systems for expanding maritime and port operations.',
    spendRange: '5-8B',
    quantityRange: '400-600',
    localSuppliers: 1,
    globalSuppliers: 13,
    icon: 'Anchor',
    category: 'Maritime',
    createdAt: '2024-01-28T00:00:00Z',
    updatedAt: '2024-01-28T00:00:00Z',
  },
  {
    id: '19',
    title: 'Waste Management Systems',
    description: 'Modern waste processing and recycling equipment for environmental sustainability.',
    spendRange: '8-12B',
    quantityRange: '300-500',
    localSuppliers: 3,
    globalSuppliers: 10,
    icon: 'Recycle',
    category: 'Environment',
    createdAt: '2024-02-18T00:00:00Z',
    updatedAt: '2024-02-18T00:00:00Z',
  },
  {
    id: '20',
    title: 'Building Management Systems',
    description: 'Smart building automation for commercial and residential mega-projects.',
    spendRange: '6-9B',
    quantityRange: '2000-3000',
    localSuppliers: 5,
    globalSuppliers: 17,
    icon: 'Building',
    category: 'Smart Buildings',
    createdAt: '2024-03-03T00:00:00Z',
    updatedAt: '2024-03-03T00:00:00Z',
  },
  {
    id: '21',
    title: 'Fire Safety Equipment',
    description: 'Advanced fire detection and suppression systems for industrial and commercial facilities.',
    spendRange: '4-7B',
    quantityRange: '3000-5000',
    localSuppliers: 7,
    globalSuppliers: 19,
    icon: 'Flame',
    category: 'Safety',
    createdAt: '2024-01-22T00:00:00Z',
    updatedAt: '2024-01-22T00:00:00Z',
  },
  {
    id: '22',
    title: 'Cybersecurity Solutions',
    description: 'Advanced threat detection and protection systems for critical infrastructure.',
    spendRange: '10-15B',
    quantityRange: '500-800',
    localSuppliers: 2,
    globalSuppliers: 15,
    icon: 'Lock',
    category: 'Technology',
    createdAt: '2024-03-07T00:00:00Z',
    updatedAt: '2024-03-07T00:00:00Z',
  },
  {
    id: '23',
    title: 'HVAC Systems',
    description: 'Energy-efficient heating, ventilation, and air conditioning for large-scale projects.',
    spendRange: '12-18B',
    quantityRange: '1500-2500',
    localSuppliers: 4,
    globalSuppliers: 16,
    icon: 'Wind',
    category: 'Infrastructure',
    createdAt: '2024-02-12T00:00:00Z',
    updatedAt: '2024-02-12T00:00:00Z',
  },
  {
    id: '24',
    title: 'Laboratory Equipment',
    description: 'Scientific research and testing equipment for education and R&D facilities.',
    spendRange: '7-11B',
    quantityRange: '600-1000',
    localSuppliers: 2,
    globalSuppliers: 14,
    icon: 'Microscope',
    category: 'Research',
    createdAt: '2024-01-26T00:00:00Z',
    updatedAt: '2024-01-26T00:00:00Z',
  },
  {
    id: '25',
    title: 'Pumping Stations',
    description: 'Water and wastewater pumping infrastructure for expanding urban areas.',
    spendRange: '9-14B',
    quantityRange: '200-350',
    localSuppliers: 3,
    globalSuppliers: 11,
    icon: 'Droplets',
    category: 'Water Infrastructure',
    createdAt: '2024-03-11T00:00:00Z',
    updatedAt: '2024-03-11T00:00:00Z',
  },
];

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock API function to simulate fetching site opportunities
async function fetchSiteOpportunities(
  filters?: SiteOpportunityFilters
): Promise<SiteOpportunityListResponse> {
  // Simulate network delay
  await delay(500);

  let filteredData = [...mockSiteOpportunities];

  // Apply search filter
  if (filters?.search) {
    const searchLower = filters.search.toLowerCase();
    filteredData = filteredData.filter(
      (opp) =>
        opp.title.toLowerCase().includes(searchLower) ||
        opp.description.toLowerCase().includes(searchLower) ||
        opp.category?.toLowerCase().includes(searchLower)
    );
  }

  // Apply pagination
  const page = filters?.page || 1;
  const limit = filters?.limit || 9;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  // In real implementation, this would be:
  // const response = await axiosInstance.get<SiteOpportunityListResponse>(
  //   endpoints.siteOpportunities.list,
  //   { params: filters }
  // );
  // return response.data;

  return {
    data: paginatedData,
    total: filteredData.length,
    page,
    limit,
  };
}

// Mock API function to simulate fetching single opportunity
async function fetchSiteOpportunity(
  id: string | number
): Promise<SiteOpportunityDetailResponse> {
  // Simulate network delay
  await delay(300);

  const opportunity = mockSiteOpportunities.find((opp) => opp.id === String(id));
  
  if (!opportunity) {
    throw new Error('Site opportunity not found');
  }

  // In real implementation, this would be:
  // const response = await axiosInstance.get<SiteOpportunityDetailResponse>(
  //   endpoints.siteOpportunities.detail(id)
  // );
  // return response.data;

  return {
    data: opportunity,
  };
}

/**
 * Get site opportunities list query
 */
export const useSiteOpportunities = (filters?: SiteOpportunityFilters) => {
  return useQuery({
    queryKey: queryKeys.siteOpportunities.list(filters),
    queryFn: async (): Promise<SiteOpportunityListResponse> => {
      // Using mock data for now
      return fetchSiteOpportunities(filters);
      
      // Real implementation (when backend is ready):
      // const response = await axiosInstance.get<SiteOpportunityListResponse>(
      //   endpoints.siteOpportunities.list,
      //   { params: filters }
      // );
      // return response.data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

/**
 * Get site opportunity detail query
 */
export const useSiteOpportunity = (id: string | number, enabled = true) => {
  return useQuery({
    queryKey: queryKeys.siteOpportunities.detail(id),
    queryFn: async (): Promise<SiteOpportunityDetailResponse> => {
      // Using mock data for now
      return fetchSiteOpportunity(id);
      
      // Real implementation (when backend is ready):
      // const response = await axiosInstance.get<SiteOpportunityDetailResponse>(
      //   endpoints.siteOpportunities.detail(id)
      // );
      // return response.data;
    },
    enabled: enabled && !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
