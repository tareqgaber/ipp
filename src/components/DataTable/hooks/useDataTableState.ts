import { useState, useCallback, useMemo } from "react";
import type {
  DataTableState,
  TableParams,
  DataTableMetricCard,
} from "../types";

interface UseDataTableStateProps {
  defaultPageSize?: number;
  onStateChange?: (params: TableParams) => void;
  metricCards?: DataTableMetricCard[];
  selectionMode?: "radio" | "checkbox";
}

export const useDataTableState = ({
  defaultPageSize = 10,
  onStateChange,
  metricCards = [],
  selectionMode = "radio",
}: UseDataTableStateProps = {}) => {
  // Initialize active cards based on isActive property
  const getInitialActiveCards = () => {
    const activeCards = metricCards.filter((card) => card.isActive === true);

    if (selectionMode === "radio") {
      // For radio mode, only use the first active card
      return activeCards.length > 0 ? activeCards[0].id : undefined;
    } else {
      // For checkbox mode, use all active cards
      return activeCards.map((card) => card.id);
    }
  };

  // Initialize filters based on active cards
  const getInitialFilters = () => {
    const activeCards = metricCards.filter((card) => card.isActive === true);
    const filters: Record<string, any> = {};

    if (selectionMode === "radio" && activeCards.length > 0) {
      const card = activeCards[0];
      filters[card.filterKey] = card.filterValue;
    } else if (selectionMode === "checkbox") {
      activeCards.forEach((card) => {
        filters[card.filterKey] = card.filterValue;
      });
    }

    return filters;
  };

  const [state, setState] = useState<DataTableState>({
    pagination: {
      page: 1,
      pageSize: defaultPageSize,
    },
    sorting: {},
    search: "",
    filters: getInitialFilters(),
    activeMetricCard:
      selectionMode === "radio"
        ? (getInitialActiveCards() as string | undefined)
        : undefined,
    activeMetricCards:
      selectionMode === "checkbox" ? (getInitialActiveCards() as string[]) : [],
  });

  // Set pagination
  const setPagination = useCallback((page: number, pageSize?: number) => {
    setState((prev) => ({
      ...prev,
      pagination: {
        page,
        pageSize: pageSize ?? prev.pagination.pageSize,
      },
    }));
  }, []);

  // Set sorting
  const setSorting = useCallback(
    (sortBy?: string, sortOrder?: "asc" | "desc") => {
      setState((prev) => ({
        ...prev,
        sorting: { sortBy, sortOrder },
        pagination: { ...prev.pagination, page: 1 }, // Reset to first page
      }));
    },
    []
  );

  // Toggle sort
  const toggleSort = useCallback((columnId: string) => {
    setState((prev) => {
      const currentSortBy = prev.sorting.sortBy;
      const currentSortOrder = prev.sorting.sortOrder;

      let newSortOrder: "asc" | "desc" | undefined = "asc";

      if (currentSortBy === columnId) {
        if (currentSortOrder === "asc") {
          newSortOrder = "desc";
        } else if (currentSortOrder === "desc") {
          newSortOrder = undefined;
        }
      }

      return {
        ...prev,
        sorting: {
          sortBy: newSortOrder ? columnId : undefined,
          sortOrder: newSortOrder,
        },
        pagination: { ...prev.pagination, page: 1 },
      };
    });
  }, []);

  // Set search
  const setSearch = useCallback((search: string) => {
    setState((prev) => ({
      ...prev,
      search,
      pagination: { ...prev.pagination, page: 1 }, // Reset to first page
    }));
  }, []);

  // Set filters
  const setFilters = useCallback((filters: Record<string, any>) => {
    setState((prev) => ({
      ...prev,
      filters,
      pagination: { ...prev.pagination, page: 1 }, // Reset to first page
    }));
  }, []);

  // Set active metric card (radio mode - single selection)
  const setActiveMetricCard = useCallback(
    (cardId: string | undefined, filterKey: string, filterValue: any) => {
      setState((prev) => {
        // If clicking the same card, deactivate it
        if (prev.activeMetricCard === cardId) {
          const { [filterKey]: _, ...restFilters } = prev.filters;
          return {
            ...prev,
            activeMetricCard: undefined,
            filters: restFilters,
            pagination: { ...prev.pagination, page: 1 },
          };
        }

        // Activate new card
        return {
          ...prev,
          activeMetricCard: cardId,
          filters: {
            ...prev.filters,
            [filterKey]: filterValue,
          },
          pagination: { ...prev.pagination, page: 1 },
        };
      });
    },
    []
  );

  // Toggle active metric card (checkbox mode - multiple selection)
  const toggleActiveMetricCard = useCallback(
    (cardId: string, filterKey: string, filterValue: any) => {
      setState((prev) => {
        const activeCards = prev.activeMetricCards || [];
        const isActive = activeCards.includes(cardId);

        if (isActive) {
          // Remove card from active list
          const newActiveCards = activeCards.filter((id) => id !== cardId);
          const { [filterKey]: _, ...restFilters } = prev.filters;
          return {
            ...prev,
            activeMetricCards: newActiveCards,
            filters: restFilters,
            pagination: { ...prev.pagination, page: 1 },
          };
        } else {
          // Add card to active list
          return {
            ...prev,
            activeMetricCards: [...activeCards, cardId],
            filters: {
              ...prev.filters,
              [filterKey]: filterValue,
            },
            pagination: { ...prev.pagination, page: 1 },
          };
        }
      });
    },
    []
  );

  // Reset all filters
  const resetFilters = useCallback(() => {
    setState((prev) => ({
      ...prev,
      filters: {},
      activeMetricCard: undefined,
      activeMetricCards: [],
      search: "",
      pagination: { ...prev.pagination, page: 1 },
    }));
  }, []);

  // Reset state
  const resetState = useCallback(() => {
    setState({
      pagination: {
        page: 1,
        pageSize: defaultPageSize,
      },
      sorting: {},
      search: "",
      filters: {},
      activeMetricCard: undefined,
      activeMetricCards: [],
    });
  }, [defaultPageSize]);

  // Convert state to API params
  const tableParams = useMemo<TableParams>(() => {
    const params: TableParams = {
      page: state.pagination.page,
      pageSize: state.pagination.pageSize,
    };

    if (state.sorting.sortBy) {
      params.sortBy = state.sorting.sortBy;
      params.sortOrder = state.sorting.sortOrder;
    }

    if (state.search) {
      params.search = state.search;
    }

    if (Object.keys(state.filters).length > 0) {
      params.filters = state.filters;
    }

    return params;
  }, [state]);

  // Notify parent of state changes
  useMemo(() => {
    onStateChange?.(tableParams);
  }, [tableParams, onStateChange]);

  return {
    state,
    tableParams,
    setPagination,
    setSorting,
    toggleSort,
    setSearch,
    setFilters,
    setActiveMetricCard,
    toggleActiveMetricCard,
    resetFilters,
    resetState,
  };
};
