import type { WizardAction, WizardContext } from "./types";

/**
 * Create a wizard action with defaults
 */
export function createAction(config: Partial<WizardAction>): WizardAction {
  return {
    key: config.key || "action",
    label: config.label || "Action",
    variant: config.variant || "contained",
    color: config.color || "primary",
    align: config.align || "end",
    ...config,
  } as WizardAction;
}

/**
 * Preset action configurations (without icons - add icons at component level)
 * Icons should be added when using these presets, e.g.:
 * { ...presetActions.next, icon: { right: <ArrowRight className="directional-icon" /> } }
 */
export const presetActions = {
  next: createAction({
    key: "next",
    label: "Next",
    variant: "contained",
    color: "primary",
    align: "end",
    navigation: "next",
  }),

  back: createAction({
    key: "back",
    label: "Back",
    variant: "outlined",
    color: "gray",
    align: "start",
    navigation: "back",
  }),

  cancel: createAction({
    key: "cancel",
    label: "Cancel",
    variant: "ghost",
    color: "gray",
    align: "end",
    effects: [
      () => {
        console.log("[Wizard] Cancel action triggered");
        // In real implementation, this would navigate away or show confirmation
      },
    ],
  }),

  saveDraft: createAction({
    key: "saveDraft",
    label: "Save Draft",
    variant: "outlined",
    color: "gray",
    align: "start",
    effects: [
      (ctx) => {
        console.log("[Wizard] Save draft action triggered", {
          activeStep: ctx.activeStep.id,
          values: ctx.values,
        });
        // In real implementation, this would save to backend
      },
    ],
  }),

  submit: createAction({
    key: "submit",
    label: "Submit",
    variant: "contained",
    color: "success",
    align: "end",
    effects: [
      (ctx) => {
        console.log("[Wizard] Submit action triggered", {
          values: ctx.values,
        });
        // In real implementation, this would submit to backend
      },
    ],
  }),
};

/**
 * Execute a wizard action through its pipeline:
 * 1. Run guards (all must pass)
 * 2. Execute effects in sequence
 * 3. Perform navigation (if specified)
 */
export async function executeAction(
  action: WizardAction,
  ctx: WizardContext
): Promise<void> {
  console.log(`[Wizard] Executing action: ${action.key}`);

  // Step 1: Run guards
  if (action.guards && action.guards.length > 0) {
    for (const guard of action.guards) {
      const canProceed = await Promise.resolve(guard(ctx));
      if (!canProceed) {
        console.log(`[Wizard] Action ${action.key} blocked by guard`);
        return;
      }
    }
  }

  // Step 2: Execute effects
  if (action.effects && action.effects.length > 0) {
    for (const effect of action.effects) {
      await Promise.resolve(effect(ctx));
    }
  }

  // Step 3: Perform navigation
  if (action.navigation) {
    switch (action.navigation) {
      case "next":
        await ctx.goNext();
        break;
      case "back":
        await ctx.goBack();
        break;
      case "goto":
        // Custom goto would need target specified elsewhere
        console.log("[Wizard] Navigation type 'goto' requires target");
        break;
      default:
        if (typeof action.navigation === "function") {
          await Promise.resolve(action.navigation(ctx));
        }
    }
  }
}
