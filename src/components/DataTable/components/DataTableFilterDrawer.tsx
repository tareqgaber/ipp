import { X } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { Button } from "@/components/base/buttons/button";
import {
  RHFInput,
  RHFSelect,
  RHFDateRangePicker,
} from "@/components/RHFInputs";
import { SelectItem } from "@/components/base/select/select-item";
import type { DataTableFilter } from "../types";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/useTranslation";

interface DataTableFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: DataTableFilter[];
  activeFilters: Record<string, any>;
  onApply: (filters: Record<string, any>) => void;
  onReset: () => void;
  subtitle?: string;
}

// Wrapper component for filter fields with reset button
const FilterFieldWrapper = ({
  label,
  name,
  children,
}: {
  label: string;
  name: string;
  children: React.ReactNode;
}) => {
  const { t } = useTranslation();
  const { setValue, watch } = useFormContext();
  const value = watch(name);
  const hasValue =
    value !== undefined &&
    value !== null &&
    value !== "" &&
    (typeof value !== "object" ||
      (Array.isArray(value)
        ? value.length > 0
        : Object.keys(value).length > 0));

  const handleReset = () => {
    setValue(name, undefined);
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-md font-medium text-brand-500">{label}</label>
        {hasValue && (
          <button
            type="button"
            onClick={handleReset}
            className="text-sm font-medium text-orange-500 underline hover:text-orange-600 transition-colors"
          >
            {t("components.dataTable.filterDrawer.resetButton")}
          </button>
        )}
      </div>
      {children}
    </div>
  );
};

export const DataTableFilterDrawer = ({
  isOpen,
  onClose,
  filters,
  activeFilters,
  onApply,
  onReset,
  subtitle,
}: DataTableFilterDrawerProps) => {
  const { t } = useTranslation();
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
            <div className="px-6 pt-4 pb-2">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <Dialog.Title className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {t("components.dataTable.filterDrawer.title")}
                  </Dialog.Title>
                  {subtitle && (
                    <Dialog.Description className="text-sm text-gray-600 dark:text-gray-400">
                      {subtitle}
                    </Dialog.Description>
                  )}
                </div>
                <Dialog.Close asChild>
                  <button
                    className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                    aria-label={t(
                      "components.dataTable.filterDrawer.closeLabel"
                    )}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </Dialog.Close>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <FormProvider {...methods}>
                <form className="space-y-4">
                  {filters.map((filter, index) => {
                    // Handle separator
                    if (filter.type === "separator") {
                      return (
                        <div
                          key={`separator-${index}`}
                          className="border-t border-gray-200 dark:border-gray-700 my-6"
                        />
                      );
                    }

                    switch (filter.type) {
                      case "text":
                        return (
                          <FilterFieldWrapper
                            key={filter.name}
                            label={filter.label}
                            name={filter.name}
                          >
                            <RHFInput
                              name={filter.name}
                              placeholder={filter.placeholder}
                            />
                          </FilterFieldWrapper>
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
                          <FilterFieldWrapper
                            key={filter.name}
                            label={filter.label}
                            name={filter.name}
                          >
                            <RHFSelect
                              name={filter.name}
                              placeholder={filter.placeholder}
                              items={selectItems}
                            >
                              {(item) => (
                                <SelectItem id={item.id} key={item.id}>
                                  {item.label}
                                </SelectItem>
                              )}
                            </RHFSelect>
                          </FilterFieldWrapper>
                        );

                      case "numberRange":
                        return (
                          <FilterFieldWrapper
                            key={filter.name}
                            label={filter.label}
                            name={filter.name}
                          >
                            <div className="grid grid-cols-2 gap-2">
                              <RHFInput
                                name={`${filter.name}.min`}
                                placeholder={t(
                                  "components.dataTable.filterDrawer.minPlaceholder"
                                )}
                                type="number"
                              />
                              <RHFInput
                                name={`${filter.name}.max`}
                                placeholder={t(
                                  "components.dataTable.filterDrawer.maxPlaceholder"
                                )}
                                type="number"
                              />
                            </div>
                          </FilterFieldWrapper>
                        );

                      case "dateRange":
                        return (
                          <FilterFieldWrapper
                            key={filter.name}
                            label={filter.label}
                            name={filter.name}
                          >
                            <RHFDateRangePicker
                              name={filter.name}
                              hidePresets
                            />
                          </FilterFieldWrapper>
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
              {/* <Button color="secondary" size="sm" onClick={onClose}>
                Cancel
              </Button> */}
              <div className="flex gap-2 ms-auto">
                <Button color="secondary" size="sm" onClick={handleReset}>
                  {t("components.dataTable.filterDrawer.resetButton")}
                </Button>
                <Button color="primary" size="sm" onClick={handleApply}>
                  {t("components.dataTable.filterDrawer.applyButton")}
                </Button>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
