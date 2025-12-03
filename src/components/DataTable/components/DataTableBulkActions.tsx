import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/base/buttons/button";
import type { DataTableBulkAction } from "../types";

interface DataTableBulkActionsProps<T> {
  selectedCount: number;
  actions: DataTableBulkAction<T>[];
  onClearSelection: () => void;
  selectedIds: string[];
  selectedRows: T[];
}

export const DataTableBulkActions = <T,>({
  selectedCount,
  actions,
  onClearSelection,
  selectedIds,
  selectedRows,
}: DataTableBulkActionsProps<T>) => {
  if (selectedCount === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2"
      >
        <div className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-lg backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800">
          {/* Selected count */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {selectedCount} selected
            </span>
            <button
              onClick={onClearSelection}
              className="rounded p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
              aria-label="Clear selection"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Divider */}
          <div className="h-6 w-px bg-gray-200 dark:bg-gray-700" />

          {/* Bulk actions */}
          <div className="flex items-center gap-2">
            {actions.map((action) => {
              const colorMap = {
                success: "primary",
                danger: "primary-destructive",
                warning: "secondary",
                default: "secondary",
              } as const;

              return (
                <Button
                  key={action.id}
                  color={colorMap[action.variant || "default"]}
                  size="sm"
                  onClick={() => action.onClick(selectedIds, selectedRows)}
                  iconLeading={action.icon}
                >
                  {action.label}
                </Button>
              );
            })}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
