import {
  ArrowRight,
  ArrowLeft,
  Save01,
  X,
  CheckCircle,
} from "@untitledui/icons";
import type {
  WizardConfig,
  WizardAction,
} from "@/components/wizard/core/types";

/**
 * Reusable action factories
 */
const createSaveDraftAction = (): WizardAction => ({
  key: "saveDraft",
  label: "Save as Draft",
  variant: "ghost",
  color: "gray",
  align: "start",
  icon: { left: <Save01 /> },
  guards: [
    async (ctx) => {
      const isValid = await ctx.values.validateStep1?.();
      if (!isValid) {
        console.log("Cannot save draft: Opportunity title is required");
        return false;
      }
      return true;
    },
  ],
  effects: [
    (ctx) => {
      console.log("Saving draft...", ctx.values.formData);
      // API call here: await api.saveDraft(ctx.values.formData);
    },
  ],
});

const createCancelAction = (): WizardAction => ({
  key: "cancel",
  label: "Cancel",
  variant: "outlined",
  color: "gray",
  align: "end",
  effects: [
    () => {
      console.log("Cancel clicked");
      // Navigate away or show confirmation
      // window.history.back();
    },
  ],
});

const createNextAction = (): WizardAction => ({
  key: "next",
  label: "Next",
  variant: "contained",
  color: "primary",
  align: "end",
  navigation: "next",
});

const createBackAction = (): WizardAction => ({
  key: "back",
  label: "Back",
  variant: "outlined",
  color: "gray",
  align: "end",
  navigation: "back",
});

const createPublishAction = (): WizardAction => ({
  key: "publish",
  label: "Publish",
  variant: "contained",
  color: "primary",
  align: "end",
  guards: [
    async (ctx) => {
      const isValid = await ctx.values.validateStep2?.();
      if (!isValid) {
        console.log("Cannot publish: Please complete all required fields");
        return false;
      }
      return true;
    },
  ],
  effects: [
    async (ctx) => {
      console.log("Publishing opportunity...", ctx.values.formData);
      // API call here: await api.publishOpportunity(ctx.values.formData);
      alert("Opportunity published successfully!");
    },
  ],
});

export const opportunityWizardConfig: WizardConfig = {
  id: "opportunity-wizard",
  mode: "single-form",

  steps: [
    {
      id: "opportunity-info",
      title: "Opportunity Information",
      subtitle: "Enter Opportunity details",

      canLeave: async (ctx) => {
        const isValid = await ctx.values.validateStep1?.();
        return isValid || false;
      },

      getActions: (_ctx) => [
        createSaveDraftAction(),
        createCancelAction(),
        createNextAction(),
      ],
    },

    {
      id: "localization",
      title: "Localization",
      subtitle: "Enter localization details",

      canLeave: async (ctx) => {
        const isValid = await ctx.values.validateStep2?.();
        return isValid || false;
      },

      getActions: (_ctx) => [
        createSaveDraftAction(),
        createBackAction(),
        createPublishAction(),
      ],
    },
  ],

  onComplete: () => {
    console.log("Opportunity wizard completed!");
  },
};
