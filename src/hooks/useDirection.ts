import { useTranslation } from "@/hooks";

/**
 * Hook to detect text direction based on current language
 * @returns {Object} Object containing isRTL flag and direction string
 */
export function useDirection() {
  const { currentLanguage } = useTranslation();
  const isRTL = currentLanguage === "ar";
  const direction = isRTL ? ("rtl" as const) : ("ltr" as const);

  return { isRTL, direction };
}
