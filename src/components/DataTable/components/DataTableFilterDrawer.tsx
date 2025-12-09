import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { Button } from "@/components/base/buttons/button";
import {
  RHFInput,
  RHFSelect,
  RHFDateRangePicker,
} from "@/components/RHFInputs";
import { SelectItem } from "@/components/base/select/select-item";
import type { DataTableFilter } from "../types";
import { useTranslation } from "@/hooks/useTranslation";
import { Drawer } from "@/components/base/drawer";

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

  const footerContent = (
    <div className="flex gap-2 ms-auto">
      <Button color="secondary" size="sm" onClick={handleReset}>
        {t("components.dataTable.filterDrawer.resetButton")}
      </Button>
      <Button color="primary" size="sm" onClick={handleApply}>
        {t("components.dataTable.filterDrawer.applyButton")}
      </Button>
    </div>
  );

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={t("components.dataTable.filterDrawer.title")}
      description={subtitle}
      closeAriaLabel={t("components.dataTable.filterDrawer.closeLabel")}
      footer={footerContent}
    >
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
                const selectItems = (filter.options || []).map((opt) => ({
                  id: opt.value,
                  label: opt.label,
                }));

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
                    <RHFDateRangePicker name={filter.name} hidePresets />
                  </FilterFieldWrapper>
                );

              default:
                return null;
            }
          })}
        </form>
      </FormProvider>
    </Drawer>
  );
};
