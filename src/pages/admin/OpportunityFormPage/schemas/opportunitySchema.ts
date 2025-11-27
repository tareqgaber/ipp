import { z } from "zod";

type TranslationFunction = (key: string) => string;

// Step 1 schema factory
export const createStep1Schema = (t: TranslationFunction) =>
  z.object({
    opportunityTitle: z
      .string()
      .min(1, t("pages.opportunityForm.validation.opportunityTitleRequired"))
      .max(50, t("pages.opportunityForm.validation.opportunityTitleMaxLength")),
    shortDescription: z
      .string()
      .max(500, t("pages.opportunityForm.validation.shortDescriptionMaxLength"))
      .optional(),
    spend: z
      .number()
      .nonnegative(t("pages.opportunityForm.validation.spendPositive")),
    quantity: z
      .number()
      .int(t("pages.opportunityForm.validation.quantityInteger"))
      .nonnegative(t("pages.opportunityForm.validation.quantityPositive")),
    localSuppliers: z
      .number()
      .int(t("pages.opportunityForm.validation.localSuppliersInteger"))
      .nonnegative(t("pages.opportunityForm.validation.localSuppliersPositive")),
    globalSuppliers: z
      .number()
      .int(t("pages.opportunityForm.validation.globalSuppliersInteger"))
      .nonnegative(t("pages.opportunityForm.validation.globalSuppliersPositive")),
    dateRange: z.object({
      startDate: z.date(),
      endDate: z.date(),
    }),
    image: z.instanceof(File).optional().or(z.string().optional()),
  });

// Step 2 schema factory
export const createStep2Schema = (t: TranslationFunction) =>
  z.object({
    localizationTarget: z
      .number()
      .min(1, t("pages.opportunityForm.validation.localizationTargetRequired"))
      .max(100, t("pages.opportunityForm.validation.localizationTargetRange")),
  });

// Full form schema factory
export const createOpportunityFormSchema = (t: TranslationFunction) => {
  const step1 = createStep1Schema(t);
  const step2 = createStep2Schema(t);
  
  return z.object({
    ...step1.shape,
    ...step2.shape,
  });
};

// Backwards compatibility - default schemas with English messages
export const step1Schema = createStep1Schema((key) => key);
export const step2Schema = createStep2Schema((key) => key);
export const opportunityFormSchema = createOpportunityFormSchema((key) => key);

export type OpportunityFormData = z.infer<typeof opportunityFormSchema>;
