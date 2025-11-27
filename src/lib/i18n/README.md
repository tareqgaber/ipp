# i18n (Internationalization) Setup

This directory contains the internationalization configuration for the Bena application, supporting **Arabic (ar)** and **English (en)** languages.

## Directory Structure

```
i18n/
├── index.ts                 # i18next configuration and initialization
├── i18next.d.ts            # TypeScript declarations for type safety
├── README.md               # This file
└── messages/
    ├── index.ts            # Exports merged resources
    ├── ar.ts               # Arabic language exports
    ├── en.ts               # English language exports
    ├── ar/                 # Arabic translations
    │   ├── auth.json
    │   ├── common.json
    │   ├── errors.json
    │   ├── messages.json
    │   ├── sidebar.json
    │   ├── validation.json
    │   └── pages/
    │       └── dashboard.json
    └── en/                 # English translations
        ├── auth.json
        ├── common.json
        ├── errors.json
        ├── messages.json
        ├── sidebar.json
        ├── validation.json
        └── pages/
            └── dashboard.json
```

## Usage

### 1. Initialize i18n in your app

Import i18n in your main entry file (e.g., `main.tsx` or `App.tsx`):

```tsx
import '@/lib/i18n';
```

### 2. Using translations in components

```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('common.welcome')}</h1>
      <p>{t('auth.login.title')}</p>
    </div>
  );
}
```

### 3. Using translations with interpolation

```tsx
const { t } = useTranslation();

// With variables
t('validation.minLength', { min: 8 }); // "Must be at least 8 characters"
```

### 4. Changing language

```tsx
import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('ar')}>العربية</button>
    </div>
  );
}
```

### 5. Getting current language

```tsx
const { i18n } = useTranslation();
const currentLanguage = i18n.language; // 'en' or 'ar'
```

## Features

- ✅ **Type Safety**: Full TypeScript support with autocomplete for translation keys
- ✅ **RTL Support**: Automatic direction switching for Arabic (RTL) and English (LTR)
- ✅ **Persistence**: Language preference is saved to localStorage
- ✅ **Fallback**: Falls back to English if a translation is missing
- ✅ **Namespaces**: Organized by feature (auth, common, errors, etc.)

## Adding New Translations

1. Add the translation key-value pair to both `en/[namespace].json` and `ar/[namespace].json`
2. TypeScript will automatically provide autocomplete for the new keys
3. No need to restart the dev server

### Example: Adding a new namespace

1. Create `en/feature.json` and `ar/feature.json`
2. Update `en.ts`:
   ```ts
   import feature from './en/feature.json';
   
   export default {
     // ... existing
     feature,
   } as const;
   ```
3. Update `ar.ts` similarly
4. Use in components: `t('feature.key')`

## Translation Namespaces

- **auth**: Authentication related (login, register, logout)
- **common**: Common UI elements (buttons, labels)
- **errors**: Error messages
- **messages**: Success/info messages and confirmations
- **sidebar**: Navigation items
- **validation**: Form validation messages
- **pages**: Page-specific translations (organized by page)

## RTL Support

The i18n configuration automatically:
- Sets `dir="rtl"` on `<html>` for Arabic
- Sets `dir="ltr"` on `<html>` for English
- Updates when language changes

Make sure your CSS supports RTL. Use logical properties when possible:
- `margin-inline-start` instead of `margin-left`
- `padding-inline-end` instead of `padding-right`
