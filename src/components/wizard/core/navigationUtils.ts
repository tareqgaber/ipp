import type { WizardStepConfig, StepUIConfig, StepStatus } from "./types";

/**
 * Find the next non-skipped step index
 */
export async function resolveNextStepIndex(
  from: number,
  values: any,
  steps: WizardStepConfig[]
): Promise<number> {
  for (let i = from + 1; i < steps.length; i++) {
    const step = steps[i];
    if (step.shouldSkip) {
      const shouldSkip = await Promise.resolve(step.shouldSkip(values));
      if (!shouldSkip) return i;
    } else {
      return i;
    }
  }
  return from; // No next step available
}

/**
 * Find the previous non-skipped step index
 */
export async function resolvePrevStepIndex(
  from: number,
  values: any,
  steps: WizardStepConfig[]
): Promise<number> {
  for (let i = from - 1; i >= 0; i--) {
    const step = steps[i];
    if (step.shouldSkip) {
      const shouldSkip = await Promise.resolve(step.shouldSkip(values));
      if (!shouldSkip) return i;
    } else {
      return i;
    }
  }
  return from; // No previous step available
}

/**
 * Map step configs to UI representation with status
 */
export async function mapStepsToUI(
  steps: WizardStepConfig[],
  activeId: string,
  activeIndex: number,
  values: any
): Promise<StepUIConfig[]> {
  const uiSteps: StepUIConfig[] = [];

  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    let status: StepStatus;

    // Check if step should be skipped
    if (step.shouldSkip) {
      const shouldSkip = await Promise.resolve(step.shouldSkip(values));
      if (shouldSkip) {
        status = "skipped";
        uiSteps.push({
          id: step.id,
          title: step.title,
          subtitle: step.subtitle,
          status,
          clickable: false,
        });
        continue;
      }
    }

    // Determine status based on position relative to active step
    if (step.id === activeId) {
      status = "active";
    } else if (i < activeIndex) {
      status = "completed";
    } else {
      status = "pending";
    }

    uiSteps.push({
      id: step.id,
      title: step.title,
      subtitle: step.subtitle,
      status,
      clickable: i < activeIndex, // Can click on completed steps
    });
  }

  return uiSteps;
}

/**
 * Calculate progress percentage based on visible (non-skipped) steps
 */
export async function calculateProgress(
  activeIndex: number,
  steps: WizardStepConfig[],
  values: any
): Promise<number> {
  // Count visible (non-skipped) steps
  let visibleCount = 0;
  let visibleActiveIndex = 0;

  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    const shouldSkip = step.shouldSkip
      ? await Promise.resolve(step.shouldSkip(values))
      : false;

    if (!shouldSkip) {
      if (i <= activeIndex) {
        visibleActiveIndex = visibleCount;
      }
      visibleCount++;
    }
  }

  if (visibleCount === 0) return 0;
  return Math.round(((visibleActiveIndex + 1) / visibleCount) * 100);
}

/**
 * Get visible (non-skipped) steps
 */
export async function getVisibleSteps(
  steps: WizardStepConfig[],
  values: any
): Promise<WizardStepConfig[]> {
  const visible: WizardStepConfig[] = [];

  for (const step of steps) {
    const shouldSkip = step.shouldSkip
      ? await Promise.resolve(step.shouldSkip(values))
      : false;

    if (!shouldSkip) {
      visible.push(step);
    }
  }

  return visible;
}
