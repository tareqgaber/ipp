import RHFInput from "@/components/RHFInputs/RHFInput";
import { useTranslation } from "@/hooks/useTranslation";

/**
 * LocalizationStep - Step 2: Localization Details
 * Uses RHFInput components that connect via FormProvider
 */
export function LocalizationStep() {
  const { t } = useTranslation();

  return (
    <RHFInput
      name="localizationTarget"
      label={t("pages.opportunityForm.fields.localizationTarget.label")}
      type="number"
      placeholder={t("pages.opportunityForm.fields.localizationTarget.placeholder")}
      required
    />
  );
}
