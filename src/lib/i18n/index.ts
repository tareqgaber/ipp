import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resources } from './messages';

const defaultLanguage = 'en';
const fallbackLanguage = 'en';

// Get saved language from localStorage or use default
const getSavedLanguage = (): string => {
  try {
    return localStorage.getItem('language') || defaultLanguage;
  } catch {
    return defaultLanguage;
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getSavedLanguage(),
    fallbackLng: fallbackLanguage,
    debug: import.meta.env.DEV,
    
    interpolation: {
      escapeValue: false, // React already does escaping
    },

    react: {
      useSuspense: false,
    },
  });

// Save language preference when it changes
i18n.on('languageChanged', (lng) => {
  try {
    localStorage.setItem('language', lng);
    // Update document direction for RTL languages
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lng;
  } catch (error) {
    console.error('Failed to save language preference:', error);
  }
});

// Set initial direction
document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
document.documentElement.lang = i18n.language;

export default i18n;
