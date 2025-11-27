import { ArrowRight, ArrowLeft, X, Calculator } from "@untitledui/icons";
import type { WizardConfig } from "@/components/wizard/core/types";
import { presetActions } from "@/components/wizard/core/actionsEngine";

/**
 * Demo wizard configuration with 4 steps
 * - Step 1: Basic Information (will be marked completed)
 * - Step 2: Product Details (active, with custom "Recalculate" action)
 * - Step 3: Optional Setup (skipped via shouldSkip)
 * - Step 4: Review & Submit (pending)
 */
export const demoWizardConfig: WizardConfig = {
  id: "demo-localization-wizard",
  steps: [
    {
      id: "basic-info",
      title: "Basic & Company Information",
      subtitle: "Enter basic plan details and company information",
      description: "Provide essential information about your localization plan and company.",

      onEnter: (_ctx) => {
        console.log("[Demo] Entered step: basic-info");
      },

      onLeave: (_ctx) => {
        console.log("[Demo] Leaving step: basic-info");
      },

      getActions: (_ctx) => [
        {
          ...presetActions.cancel,
          icon: { left: <X className="directional-icon" /> },
        },
        {
          ...presetActions.next,
          icon: { right: <ArrowRight className="directional-icon" /> },
        },
      ],
    },

    {
      id: "product-details",
      title: "Product & Plant Overview",
      subtitle: "Enter product and facility details",
      description: "Provide information about your products and manufacturing facilities.",

      onEnter: (_ctx) => {
        console.log("[Demo] Entered step: product-details");
      },

      canLeave: (_ctx) => {
        console.log("[Demo] Checking if can leave product-details");
        return true;
      },

      getActions: (_ctx) => [
        {
          ...presetActions.back,
          icon: { left: <ArrowLeft className="directional-icon" /> },
        },
        {
          key: "recalculate",
          label: "Recalculate",
          variant: "outlined",
          color: "indigo",
          align: "end",
          icon: { left: <Calculator /> },
          tooltip: "Recalculate projections",
          effects: [
            (_ctx) => {
              console.log("[Demo] Recalculating values...");
              // Simulate recalculation
              setTimeout(() => {
                console.log("[Demo] Recalculation complete!");
              }, 500);
            },
          ],
        },
        {
          ...presetActions.next,
          icon: { right: <ArrowRight className="directional-icon" /> },
        },
      ],
    },

    {
      id: "optional-setup",
      title: "Optional Setup",
      subtitle: "Additional configuration",
      description: "Optional settings for advanced users.",

      // This step will be skipped in the demo
      shouldSkip: () => {
        console.log("[Demo] Skipping optional-setup step");
        return true;
      },

      getActions: (_ctx) => [
        {
          ...presetActions.back,
          icon: { left: <ArrowLeft className="directional-icon" /> },
        },
        {
          ...presetActions.next,
          icon: { right: <ArrowRight className="directional-icon" /> },
        },
      ],
    },

    {
      id: "review",
      title: "Summary",
      subtitle: "Review your localization plan before final submission",
      description: "Please review all information before submitting your plan.",

      onEnter: (_ctx) => {
        console.log("[Demo] Entered final step: review");
      },

      canLeave: (_ctx) => {
        console.log("[Demo] Checking if can leave review step");
        return true;
      },

      getActions: (_ctx) => [
        {
          ...presetActions.back,
          icon: { left: <ArrowLeft className="directional-icon" /> },
        },
        {
          ...presetActions.saveDraft,
        },
        {
          key: "submit",
          label: "Submit Plan",
          variant: "contained",
          color: "success",
          align: "end",
          effects: [
            (ctx) => {
              console.log("[Demo] Submitting wizard...");
              console.log("[Demo] All steps completed!", {
                totalSteps: ctx.steps.length,
                visibleSteps: ctx.visibleSteps.length,
                values: ctx.values,
              });
            },
          ],
        },
      ],
    },
  ],

  onComplete: () => {
    console.log("[Demo] Wizard completed!");
  },
};
