import { DirectionProvider as RadixDirectionProvider } from '@radix-ui/react-direction';
import { useTranslation } from '@/hooks/useTranslation';

/**
 * Provides text direction (LTR/RTL) context to all Radix UI components
 * Automatically syncs with the current i18n language
 */
export function DirectionProvider({ children }: { children: React.ReactNode }) {
  const { isArabic } = useTranslation();
  
  return (
    <RadixDirectionProvider dir={isArabic ? 'rtl' : 'ltr'}>
      {children}
    </RadixDirectionProvider>
  );
}
