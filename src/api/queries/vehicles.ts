import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Mock data type
export interface Vehicle {
  id: string;
  name: string;
  model: string;
  status: "active" | "inactive" | "maintenance";
  category: string;
  price: number;
  year: number;
  mileage: number;
  createdAt: string;
}

// Mock data - 20 vehicles
const mockVehicles: Vehicle[] = [
  {
    id: "1",
    name: "Toyota Camry",
    model: "XSE",
    status: "active",
    category: "sedan",
    price: 28000,
    year: 2024,
    mileage: 1250,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Honda CR-V",
    model: "EX-L",
    status: "active",
    category: "suv",
    price: 35000,
    year: 2024,
    mileage: 2100,
    createdAt: "2024-02-20",
  },
  {
    id: "3",
    name: "Ford F-150",
    model: "Lariat",
    status: "maintenance",
    category: "truck",
    price: 45000,
    year: 2023,
    mileage: 15000,
    createdAt: "2023-12-10",
  },
  {
    id: "4",
    name: "Tesla Model 3",
    model: "Long Range",
    status: "active",
    category: "sedan",
    price: 48000,
    year: 2024,
    mileage: 850,
    createdAt: "2024-03-05",
  },
  {
    id: "5",
    name: "Jeep Wrangler",
    model: "Rubicon",
    status: "inactive",
    category: "suv",
    price: 42000,
    year: 2023,
    mileage: 22000,
    createdAt: "2023-11-22",
  },
  {
    id: "6",
    name: "BMW X5",
    model: "xDrive40i",
    status: "active",
    category: "suv",
    price: 62000,
    year: 2024,
    mileage: 3200,
    createdAt: "2024-01-08",
  },
  {
    id: "7",
    name: "Mercedes C-Class",
    model: "C300",
    status: "active",
    category: "sedan",
    price: 45000,
    year: 2024,
    mileage: 1800,
    createdAt: "2024-02-14",
  },
  {
    id: "8",
    name: "Chevrolet Silverado",
    model: "LTZ",
    status: "maintenance",
    category: "truck",
    price: 48000,
    year: 2023,
    mileage: 18000,
    createdAt: "2023-10-30",
  },
  {
    id: "9",
    name: "Audi A4",
    model: "Premium Plus",
    status: "active",
    category: "sedan",
    price: 42000,
    year: 2024,
    mileage: 950,
    createdAt: "2024-03-12",
  },
  {
    id: "10",
    name: "Toyota RAV4",
    model: "XLE",
    status: "active",
    category: "suv",
    price: 32000,
    year: 2024,
    mileage: 4100,
    createdAt: "2024-01-25",
  },
  {
    id: "11",
    name: "Honda Accord",
    model: "Sport",
    status: "inactive",
    category: "sedan",
    price: 31000,
    year: 2023,
    mileage: 12000,
    createdAt: "2023-09-18",
  },
  {
    id: "12",
    name: "Ford Explorer",
    model: "Limited",
    status: "active",
    category: "suv",
    price: 48000,
    year: 2024,
    mileage: 2800,
    createdAt: "2024-02-28",
  },
  {
    id: "13",
    name: "RAM 1500",
    model: "Big Horn",
    status: "active",
    category: "truck",
    price: 44000,
    year: 2024,
    mileage: 5200,
    createdAt: "2024-01-20",
  },
  {
    id: "14",
    name: "Nissan Altima",
    model: "SV",
    status: "maintenance",
    category: "sedan",
    price: 27000,
    year: 2023,
    mileage: 25000,
    createdAt: "2023-08-15",
  },
  {
    id: "15",
    name: "Mazda CX-5",
    model: "Touring",
    status: "active",
    category: "suv",
    price: 34000,
    year: 2024,
    mileage: 1500,
    createdAt: "2024-03-01",
  },
  {
    id: "16",
    name: "Hyundai Tucson",
    model: "SEL",
    status: "active",
    category: "suv",
    price: 30000,
    year: 2024,
    mileage: 3500,
    createdAt: "2024-02-10",
  },
  {
    id: "17",
    name: "Kia Sportage",
    model: "EX",
    status: "inactive",
    category: "suv",
    price: 29000,
    year: 2023,
    mileage: 18500,
    createdAt: "2023-11-05",
  },
  {
    id: "18",
    name: "Subaru Outback",
    model: "Limited",
    status: "active",
    category: "suv",
    price: 38000,
    year: 2024,
    mileage: 2200,
    createdAt: "2024-02-22",
  },
  {
    id: "19",
    name: "Volkswagen Jetta",
    model: "SEL",
    status: "active",
    category: "sedan",
    price: 26000,
    year: 2024,
    mileage: 4800,
    createdAt: "2024-01-18",
  },
  {
    id: "20",
    name: "GMC Sierra",
    model: "Denali",
    status: "maintenance",
    category: "truck",
    price: 58000,
    year: 2023,
    mileage: 21000,
    createdAt: "2023-10-12",
  },
];

// API Request/Response types
export interface FetchVehiclesParams {
  page: number;
  pageSize: number;
  search?: string;
  filters?: Record<string, any>;
  sort?: {
    key: string;
    direction: "asc" | "desc";
  } | null;
}

export interface FetchVehiclesResponse {
  data: Vehicle[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalRecords: number;
    pageSize: number;
  };
}

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock API function - simulates server-side filtering, sorting, and pagination
async function fetchVehicles(
  params: FetchVehiclesParams
): Promise<FetchVehiclesResponse> {
  // Simulate network delay
  await delay(500);

  let filteredData = [...mockVehicles];

  // Search filtering
  if (params.search) {
    const searchLower = params.search.toLowerCase();
    filteredData = filteredData.filter(
      (vehicle) =>
        vehicle.name.toLowerCase().includes(searchLower) ||
        vehicle.model.toLowerCase().includes(searchLower)
    );
  }

  // Column filters
  if (params.filters) {
    Object.entries(params.filters).forEach(([key, value]) => {
      if (value === null || value === undefined || value === "") return;

      if (key === "name" && value) {
        filteredData = filteredData.filter((v) =>
          v.name.toLowerCase().includes(String(value).toLowerCase())
        );
      } else if (key === "status" && value) {
        filteredData = filteredData.filter((v) => v.status === value);
      } else if (
        key === "category" &&
        Array.isArray(value) &&
        value.length > 0
      ) {
        filteredData = filteredData.filter((v) => value.includes(v.category));
      } else if (key === "year" && value) {
        filteredData = filteredData.filter((v) => v.year === Number(value));
      } else if (key === "price" && value) {
        filteredData = filteredData.filter((v) => v.price <= Number(value));
      } else if (key === "createdAt" && value) {
        const filterDate = new Date(value).toISOString().split("T")[0];
        filteredData = filteredData.filter((v) => v.createdAt === filterDate);
      }
    });
  }

  // Sorting
  if (params.sort) {
    filteredData.sort((a, b) => {
      const aVal = a[params.sort!.key as keyof Vehicle];
      const bVal = b[params.sort!.key as keyof Vehicle];
      const multiplier = params.sort!.direction === "asc" ? 1 : -1;

      if (typeof aVal === "number" && typeof bVal === "number") {
        return (aVal - bVal) * multiplier;
      }

      return String(aVal).localeCompare(String(bVal)) * multiplier;
    });
  }

  // Pagination
  const totalRecords = filteredData.length;
  const totalPages = Math.ceil(totalRecords / params.pageSize);
  const startIndex = (params.page - 1) * params.pageSize;
  const endIndex = startIndex + params.pageSize;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  return {
    data: paginatedData,
    pagination: {
      currentPage: params.page,
      totalPages,
      totalRecords,
      pageSize: params.pageSize,
    },
  };
}

// React Query Hook - This is what you would use in real app
export function useVehiclesQuery(params: FetchVehiclesParams) {
  return useQuery({
    queryKey: ["vehicles", params],
    queryFn: () => fetchVehicles(params),
    // In real app, this would be:
    // queryFn: () => api.post('/vehicles/search', params).then(res => res.data)
    placeholderData: (previousData) => previousData, // Replaced keepPreviousData in v5
    staleTime: 30000, // Cache for 30 seconds
  });
}

// Mutation for deleting a vehicle
export function useDeleteVehicle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (vehicleId: string) => {
      // Simulate API call
      await delay(500);
      // In real app: await api.delete(`/vehicles/${vehicleId}`)

      // For demo, just remove from mock data
      const index = mockVehicles.findIndex((v) => v.id === vehicleId);
      if (index > -1) {
        mockVehicles.splice(index, 1);
      }
    },
    onSuccess: () => {
      // Invalidate and refetch vehicles
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
    },
  });
}

// Mutation for bulk delete
export function useBulkDeleteVehicles() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (vehicleIds: string[]) => {
      // Simulate API call
      await delay(500);
      // In real app: await api.post('/vehicles/bulk-delete', { ids: vehicleIds })

      // For demo, remove from mock data
      vehicleIds.forEach((id) => {
        const index = mockVehicles.findIndex((v) => v.id === id);
        if (index > -1) {
          mockVehicles.splice(index, 1);
        }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
    },
  });
}
