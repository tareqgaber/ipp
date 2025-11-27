import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import type {
  WizardConfig,
  WizardContext,
  WizardState,
  WizardAction,
} from "@/components/wizard/core/types";
import {
  resolveNextStepIndex,
  resolvePrevStepIndex,
  calculateProgress,
  getVisibleSteps,
} from "@/components/wizard/core/navigationUtils";
import { executeAction } from "@/components/wizard/core/actionsEngine";

/**
 * useWizard - Core wizard state management hook
 * Handles navigation, guards, lifecycles, and action execution
 */
export function useWizard(config: WizardConfig): WizardContext {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [state, setState] = useState<WizardState>("idle");
  const [error, setError] = useState<Error | null>(null);
  const [values] = useState<any>({}); // Placeholder for form data
  const [progressPercent, setProgressPercent] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState(config.steps);

  const activeStep = config.steps[activeStepIndex];
  
  // Use ref to store context for callbacks to access
  const contextRef = useRef<WizardContext | null>(null);

  // Update progress and visible steps whenever active step changes
  useMemo(() => {
    (async () => {
      const progress = await calculateProgress(
        activeStepIndex,
        config.steps,
        values
      );
      setProgressPercent(progress);

      const visible = await getVisibleSteps(config.steps, values);
      setVisibleSteps(visible);
    })();
  }, [activeStepIndex, config.steps, values]);

  /**
   * Navigate to next step with guards and lifecycles
   */
  const goNext = useCallback(async () => {
    if (state === "transitioning") return;
    if (!contextRef.current) return;

    try {
      setState("transitioning");
      console.log(`[Wizard] Attempting to leave step: ${activeStep.id}`);

      // Run canLeave guard
      if (activeStep.canLeave) {
        const canLeave = await Promise.resolve(
          activeStep.canLeave(contextRef.current)
        );
        if (!canLeave) {
          console.log(`[Wizard] Cannot leave step: ${activeStep.id}`);
          setState("idle");
          return;
        }
      }

      // Run onLeave lifecycle
      if (activeStep.onLeave) {
        await Promise.resolve(activeStep.onLeave(contextRef.current));
        console.log(`[Wizard] onLeave executed for step: ${activeStep.id}`);
      }

      // Resolve next step
      const nextIndex = await resolveNextStepIndex(
        activeStepIndex,
        values,
        config.steps
      );

      if (nextIndex === activeStepIndex) {
        console.log("[Wizard] No next step available");
        setState("idle");
        return;
      }

      const nextStep = config.steps[nextIndex];

      // Run canEnter guard
      if (nextStep.canEnter) {
        const canEnter = await Promise.resolve(
          nextStep.canEnter(contextRef.current)
        );
        if (!canEnter) {
          console.log(`[Wizard] Cannot enter step: ${nextStep.id}`);
          setState("idle");
          return;
        }
      }

      // Transition to next step
      setActiveStepIndex(nextIndex);
      console.log(`[Wizard] Navigated to step: ${nextStep.id}`);

      // Run onEnter lifecycle
      if (nextStep.onEnter) {
        await Promise.resolve(nextStep.onEnter(contextRef.current));
        console.log(`[Wizard] onEnter executed for step: ${nextStep.id}`);
      }

      setState("idle");
    } catch (err) {
      console.error("[Wizard] Error during navigation:", err);
      setError(err as Error);
      setState("error");
    }
  }, [activeStepIndex, activeStep, config.steps, state, values]);

  /**
   * Navigate to previous step with guards and lifecycles
   * Note: Does NOT check canLeave - backwards navigation is always allowed
   */
  const goBack = useCallback(async () => {
    if (state === "transitioning") return;
    if (!contextRef.current) return;

    try {
      setState("transitioning");
      console.log(`[Wizard] Going back from step: ${activeStep.id}`);

      // Skip canLeave validation for backwards navigation
      // Users should always be able to go back to fix issues

      // Run onLeave lifecycle
      if (activeStep.onLeave) {
        await Promise.resolve(activeStep.onLeave(contextRef.current));
        console.log(`[Wizard] onLeave executed for step: ${activeStep.id}`);
      }

      // Resolve previous step
      const prevIndex = await resolvePrevStepIndex(
        activeStepIndex,
        values,
        config.steps
      );

      if (prevIndex === activeStepIndex) {
        console.log("[Wizard] No previous step available");
        setState("idle");
        return;
      }

      const prevStep = config.steps[prevIndex];

      // Transition to previous step
      setActiveStepIndex(prevIndex);
      console.log(`[Wizard] Navigated back to step: ${prevStep.id}`);

      // Run onEnter lifecycle
      if (prevStep.onEnter) {
        await Promise.resolve(prevStep.onEnter(contextRef.current));
        console.log(`[Wizard] onEnter executed for step: ${prevStep.id}`);
      }

      setState("idle");
    } catch (err) {
      console.error("[Wizard] Error during back navigation:", err);
      setError(err as Error);
      setState("error");
    }
  }, [activeStepIndex, activeStep, config.steps, state, values]);

  /**
   * Navigate to specific step by ID
   */
  const goto = useCallback(
    async (stepId: string) => {
      if (state === "transitioning") return;
      if (!contextRef.current) return;

      const targetIndex = config.steps.findIndex((s) => s.id === stepId);
      if (targetIndex === -1) {
        console.error(`[Wizard] Step not found: ${stepId}`);
        return;
      }

      if (targetIndex === activeStepIndex) {
        console.log(`[Wizard] Already on step: ${stepId}`);
        return;
      }

      try {
        setState("transitioning");
        console.log(`[Wizard] Attempting to go to step: ${stepId}`);

        // Run canLeave guard for current step
        if (activeStep.canLeave) {
          const canLeave = await Promise.resolve(
            activeStep.canLeave(contextRef.current)
          );
          if (!canLeave) {
            console.log(`[Wizard] Cannot leave current step: ${activeStep.id}`);
            setState("idle");
            return;
          }
        }

        // Run onLeave lifecycle
        if (activeStep.onLeave) {
          await Promise.resolve(activeStep.onLeave(contextRef.current));
        }

        const targetStep = config.steps[targetIndex];

        // Run canEnter guard for target step
        if (targetStep.canEnter) {
          const canEnter = await Promise.resolve(
            targetStep.canEnter(contextRef.current)
          );
          if (!canEnter) {
            console.log(`[Wizard] Cannot enter step: ${stepId}`);
            setState("idle");
            return;
          }
        }

        // Transition to target step
        setActiveStepIndex(targetIndex);
        console.log(`[Wizard] Navigated to step: ${stepId}`);

        // Run onEnter lifecycle
        if (targetStep.onEnter) {
          await Promise.resolve(targetStep.onEnter(contextRef.current));
        }

        setState("idle");
      } catch (err) {
        console.error(`[Wizard] Error navigating to step ${stepId}:`, err);
        setError(err as Error);
        setState("error");
      }
    },
    [activeStepIndex, activeStep, config.steps, state, values]
  );

  /**
   * Get actions for current step
   */
  const getActions = useCallback((): WizardAction[] => {
    if (activeStep.getActions && contextRef.current) {
      return activeStep.getActions(contextRef.current);
    }
    return [];
  }, [activeStep]);

  /**
   * Execute an action by key
   */
  const runAction = useCallback(
    async (key: string) => {
      if (!contextRef.current) return;
      
      const actions = getActions();
      const action = actions.find((a) => a.key === key);

      if (!action) {
        console.error(`[Wizard] Action not found: ${key}`);
        return;
      }

      await executeAction(action, contextRef.current);
    },
    [getActions]
  );

  // Build context object
  const context: WizardContext = {
    config,
    steps: config.steps,
    activeStepIndex,
    activeStep,
    values,
    visibleSteps,
    state,
    error,
    goNext,
    goBack,
    goto,
    runAction,
    getActions,
    progressPercent,
  };

  // Update ref whenever context changes
  useEffect(() => {
    contextRef.current = context;
  });

  return context;
}
