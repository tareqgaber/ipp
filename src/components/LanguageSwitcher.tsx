import { Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';

export function LanguageSwitcher() {
  const { t, toggleLanguage } = useTranslation();
  console.log(t)

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleLanguage}
      title={t('common.language')}
      aria-label={t('common.language')}
    >
      <Languages className="h-5 w-5" />
      <span className="sr-only">{t('common.language')}</span>
    </Button>
  );
}
