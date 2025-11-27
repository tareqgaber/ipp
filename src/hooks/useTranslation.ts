import { useTranslation as useI18NextTranslation } from 'react-i18next';

/**
 * Custom hook for using translations with type safety
 * Re-exports react-i18next's useTranslation with proper typing
 */
export const useTranslation = () => {
  const { t, i18n, ready } = useI18NextTranslation();

  return {
    t,
    i18n,
    ready,
    currentLanguage: i18n.language,
    isArabic: i18n.language === 'ar',
    isEnglish: i18n.language === 'en',
    changeLanguage: (lng: 'ar' | 'en') => i18n.changeLanguage(lng),
    toggleLanguage: () => {
      const newLang = i18n.language === 'en' ? 'ar' : 'en';
      i18n.changeLanguage(newLang);
    },
  };
};
