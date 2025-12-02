import { useState, useCallback, useMemo } from "react";

export const useDataTableSelection = <T extends { id?: string }>(
  data: T[] = [],
  getRowId?: (row: T) => string
) => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Get row ID
  const getIdFromRow = useCallback(
    (row: T): string => {
      if (getRowId) {
        return getRowId(row);
      }
      return row.id ?? "";
    },
    [getRowId]
  );

  // All available IDs from current data
  const allIds = useMemo(() => {
    return data.map(getIdFromRow);
  }, [data, getIdFromRow]);

  // Check if all rows are selected
  const isAllSelected = useMemo(() => {
    if (allIds.length === 0) return false;
    return allIds.every((id) => selectedIds.has(id));
  }, [allIds, selectedIds]);

  // Check if some (but not all) rows are selected
  const isSomeSelected = useMemo(() => {
    if (allIds.length === 0) return false;
    const selectedCount = allIds.filter((id) => selectedIds.has(id)).length;
    return selectedCount > 0 && selectedCount < allIds.length;
  }, [allIds, selectedIds]);

  // Toggle single row
  const toggleRow = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  // Toggle all rows
  const toggleAll = useCallback(() => {
    if (isAllSelected) {
      // Deselect all
      setSelectedIds(new Set());
    } else {
      // Select all
      setSelectedIds(new Set(allIds));
    }
  }, [isAllSelected, allIds]);

  // Clear selection
  const clearSelection = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  // Check if specific row is selected
  const isRowSelected = useCallback(
    (id: string) => {
      return selectedIds.has(id);
    },
    [selectedIds]
  );

  // Get selected rows
  const selectedRows = useMemo(() => {
    return data.filter((row) => selectedIds.has(getIdFromRow(row)));
  }, [data, selectedIds, getIdFromRow]);

  return {
    selectedIds: Array.from(selectedIds),
    selectedRows,
    selectedCount: selectedIds.size,
    isAllSelected,
    isSomeSelected,
    isRowSelected,
    toggleRow,
    toggleAll,
    clearSelection,
  };
};
