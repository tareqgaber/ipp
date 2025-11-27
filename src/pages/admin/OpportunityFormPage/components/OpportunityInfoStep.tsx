import RHFInput from "@/components/RHFInputs/RHFInput";
import RHFTextArea from "@/components/RHFInputs/RHFTextArea";
import RHFDateRangePicker from "@/components/RHFInputs/RHFDateRangePicker";
import RHFFileUpload from "@/components/RHFInputs/RHFFileUpload";
import { useTranslation } from "@/hooks/useTranslation";

/**
 * OpportunityInfoStep - Step 1: Opportunity Information
 * Uses RHFInput components that connect via FormProvider
 */
export function OpportunityInfoStep() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      {/* Opportunity Title */}
      <RHFInput
        name="opportunityTitle"
        label={t("pages.opportunityForm.fields.opportunityTitle.label")}
        placeholder={t("pages.opportunityForm.fields.opportunityTitle.placeholder")}
        maxLength={50}
        required
      />

      {/* Short Description */}
      <RHFTextArea
        name="shortDescription"
        label={t("pages.opportunityForm.fields.shortDescription.label")}
        placeholder={t("pages.opportunityForm.fields.shortDescription.placeholder")}
        maxLength={500}
      />

      {/* Spend (SAR) */}
      <RHFInput
        name="spend"
        label={t("pages.opportunityForm.fields.spend.label")}
        placeholder={t("pages.opportunityForm.fields.spend.placeholder")}
        type="number"
        required
      />

      {/* Quantity (Units) */}
      <RHFInput
        name="quantity"
        label={t("pages.opportunityForm.fields.quantity.label")}
        placeholder={t("pages.opportunityForm.fields.quantity.placeholder")}
        type="number"
        required
      />

      {/* Local Suppliers */}
      <RHFInput
        name="localSuppliers"
        label={t("pages.opportunityForm.fields.localSuppliers.label")}
        placeholder={t("pages.opportunityForm.fields.localSuppliers.placeholder")}
        type="number"
        required
      />

      {/* Global Suppliers */}
      <RHFInput
        name="globalSuppliers"
        label={t("pages.opportunityForm.fields.globalSuppliers.label")}
        placeholder={t("pages.opportunityForm.fields.globalSuppliers.placeholder")}
        type="number"
        required
      />

      {/* Date Range */}
      <RHFDateRangePicker
        name="dateRange"
        label={t("pages.opportunityForm.fields.dateRange.label")}
        placeholder={t("pages.opportunityForm.fields.dateRange.placeholder")}
        disablePastDates
      />

      {/* Image Upload */}
      <RHFFileUpload
        name="image"
        label={t("pages.opportunityForm.fields.image.label")}
        accept="image/*"
      />
    </div>
  );
}
