import type { ReactNode } from "react";

/**
 * Step status types for visual representation
 */
export type StepStatus =
  | "pending"
  | "active"
  | "completed"
  | "skipped"
  | "error"
  | "disabled";

/**
 * Wizard state during transitions
 */
export type WizardState = "idle" | "transitioning" | "error";

/**
 * Button variant and color types (matching your Button component)
 */
export type ButtonVariant = "contained" | "outlined" | "ghost" | "link";
export type ButtonColor =
  | "primary"
  | "secondary"
  | "success"
  | "orange"
  | "gray"
  | "indigo"
  | "blue"
  | "error";

/**
 * Badge variant types (matching your Badge component)
 */
export type BadgeVariant =
  | "default"
  | "secondary"
  | "destructive"
  | "outline"
  | "primary"
  | "warning"
  | "pink"
  | "blue"
  | "error"
  | "gray"
  | "success"
  | "indigo";

/**
 * Configuration for a single wizard step
 */
export interface WizardStepConfig {
  id: string;
  title: string;
  description?: string;
  subtitle?: string;
  keepAlive?: boolean;

  // Navigation guards
  shouldSkip?(values: any): boolean | Promise<boolean>;
  canEnter?(ctx: WizardContext): boolean | Promise<boolean>;
  canLeave?(ctx: WizardContext): boolean | Promise<boolean>; // Only checked for forward navigation (goNext), not backwards (goBack)

  // Lifecycle hooks
  onEnter?(ctx: WizardContext): void | Promise<void>;
  onLeave?(ctx: WizardContext): void | Promise<void>;

  // Dynamic actions for this step
  getActions?(ctx: WizardContext): WizardAction[];
}

/**
 * Complete wizard configuration
 */
export interface WizardConfig {
  id: string;
  steps: WizardStepConfig[];
  routing?: {
    syncURL?: boolean;
    basePath?: string;
  };
  mode?: "single-form" | "per-step";
  onComplete?(): void | Promise<void>;
}

/**
 * Action button configuration
 */
export interface WizardAction {
  key: string;
  label: string;
  variant?: ButtonVariant;
  color?: ButtonColor;
  align?: "start" | "end";
  icon?: {
    left?: ReactNode;
    right?: ReactNode;
  };
  tooltip?: string;
  hidden?: boolean;
  disabled?: boolean;
  loading?: boolean;

  // Action pipeline
  guards?: Array<(ctx: WizardContext) => boolean | Promise<boolean>>;
  effects?: Array<(ctx: WizardContext) => void | Promise<void>>;
  navigation?: "next" | "back" | "goto" | ((ctx: WizardContext) => void);
}

/**
 * Context provided by useWizard hook
 */
export interface WizardContext {
  config: WizardConfig;
  steps: WizardStepConfig[];
  activeStepIndex: number;
  activeStep: WizardStepConfig;
  values: any; // Placeholder for form data
  visibleSteps: WizardStepConfig[];
  state: WizardState;
  error: Error | null;

  // Navigation methods
  goNext(): Promise<void>;
  goBack(): Promise<void>;
  goto(stepId: string): Promise<void>;

  // Action execution
  runAction(key: string): Promise<void>;
  getActions(): WizardAction[];

  // Computed properties
  progressPercent: number;
}

/**
 * UI representation of a step (for WizardStepper component)
 */
export interface StepUIConfig {
  id: string;
  title: string;
  subtitle?: string;
  status: StepStatus;
  clickable?: boolean;
}

/**
 * Banner configuration for WizardBanner component
 */
export interface BannerConfig {
  type: "info" | "warning" | "error" | "success";
  title?: string;
  message: string | ReactNode;
  dismissible?: boolean;
  onDismiss?(): void;
}

/**
 * Badge configuration for WizardContent component
 */
export interface BadgeConfig {
  label: string;
  variant?: BadgeVariant;
}
