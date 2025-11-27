import ar from './ar';
import en from './en';

export const resources = {
  ar: { translation: ar },
  en: { translation: en },
} as const;

export type Language = keyof typeof resources;

export default resources;
