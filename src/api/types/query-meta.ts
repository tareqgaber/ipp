/**
 * Meta options for TanStack Query queries and mutations
 * Used to control toast notifications and other behaviors
 */
export interface QueryMeta {
  /**
   * Disable automatic error toast notification for this query
   * @default false
   */
  disableErrorToast?: boolean;
}

export interface MutationMeta {
  /**
   * Disable automatic error toast notification for this mutation
   * @default false
   */
  disableErrorToast?: boolean;

  /**
   * Disable automatic success toast notification for this mutation
   * @default false
   */
  disableSuccessToast?: boolean;

  /**
   * Custom success message to display instead of the default
   * Can be a translation key or a plain string
   */
  successMessage?: string;
}
