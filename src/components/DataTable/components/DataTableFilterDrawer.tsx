import { X } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/base/buttons/button";
import {
  RHFInput,
  RHFSelect,
  RHFDateRangePicker,
} from "@/components/RHFInputs";
import { SelectItem } from "@/components/base/select/select-item";
import type { DataTableFilter } from "../types";
import { cn } from "@/lib/utils";

interface DataTableFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: DataTableFilter[];
  activeFilters: Record<string, any>;
  onApply: (filters: Record<string, any>) => void;
  onReset: () => void;
}

export const DataTableFilterDrawer = ({
  isOpen,
  onClose,
  filters,
  activeFilters,
  onApply,
  onReset,
}: DataTableFilterDrawerProps) => {
  const methods = useForm({
    defaultValues: activeFilters,
    values: activeFilters,
  });

  const handleApply = methods.handleSubmit((data) => {
    onApply(data);
  });

  const handleReset = () => {
    methods.reset({});
    onReset();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

        {/* Content */}
        <Dialog.Content
          className={cn(
            "fixed right-0 top-0 z-50 h-full w-full max-w-md",
            "bg-white shadow-xl dark:bg-gray-900",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
            "duration-300"
          )}
        >
          <div className="flex h-full flex-col">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
              <Dialog.Title className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Filters
              </Dialog.Title>
              <Dialog.Close asChild>
                <button
                  className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </Dialog.Close>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <FormProvider {...methods}>
                <form className="space-y-4">
                  {filters.map((filter) => {
                    switch (filter.type) {
                      case "text":
                        return (
                          <RHFInput
                            key={filter.name}
                            name={filter.name}
                            label={filter.label}
                            placeholder={filter.placeholder}
                          />
                        );

                      case "select":
                        // Convert options to SelectItemType format
                        const selectItems = (filter.options || []).map(
                          (opt) => ({
                            id: opt.value,
                            label: opt.label,
                          })
                        );

                        return (
                          <RHFSelect
                            key={filter.name}
                            name={filter.name}
                            label={filter.label}
                            placeholder={filter.placeholder}
                            items={selectItems}
                          >
                            {(item) => (
                              <SelectItem id={item.id} key={item.id}>
                                {item.label}
                              </SelectItem>
                            )}
                          </RHFSelect>
                        );

                      case "numberRange":
                        return (
                          <div key={filter.name} className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {filter.label}
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                              <RHFInput
                                name={`${filter.name}.min`}
                                placeholder="Min"
                                type="number"
                              />
                              <RHFInput
                                name={`${filter.name}.max`}
                                placeholder="Max"
                                type="number"
                              />
                            </div>
                          </div>
                        );

                      case "dateRange":
                        return (
                          <RHFDateRangePicker
                            key={filter.name}
                            name={filter.name}
                            label={filter.label}
                          />
                        );

                      default:
                        return null;
                    }
                  })}
                </form>
              </FormProvider>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4 dark:border-gray-700">
              <Button color="tertiary" size="sm" onClick={handleReset}>
                Reset
              </Button>
              <div className="flex gap-2">
                <Button color="secondary" size="sm" onClick={onClose}>
                  Cancel
                </Button>
                <Button color="primary" size="sm" onClick={handleApply}>
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
