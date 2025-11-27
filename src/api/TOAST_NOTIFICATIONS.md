# Toast Notifications System

This project includes automatic toast notifications for all TanStack Query operations (queries and mutations).

## Features

- ✅ Automatic error notifications for all queries and mutations
- ✅ Automatic success notifications for all mutations
- ✅ Translated messages based on user language (EN/AR)
- ✅ Customizable per-query/mutation behavior
- ✅ RTL support for Arabic

## Default Behavior

### Queries
- **Errors**: Automatically show error toast with the error message or fallback translation

### Mutations
- **Errors**: Automatically show error toast with the error message or fallback translation
- **Success**: Automatically show success toast with default or custom message

## Customization via Meta Options

You can control toast notifications for specific queries/mutations using the `meta` option:

### Disable Error Toast

```typescript
// For queries
useQuery({
  queryKey: ['data'],
  queryFn: fetchData,
  meta: {
    disableErrorToast: true, // Won't show error toast
  },
});

// For mutations
useMutation({
  mutationFn: saveData,
  meta: {
    disableErrorToast: true, // Won't show error toast
  },
});
```

### Disable Success Toast

```typescript
useMutation({
  mutationFn: saveData,
  meta: {
    disableSuccessToast: true, // Won't show success toast
  },
});
```

### Custom Success Message

```typescript
useMutation({
  mutationFn: updateProfile,
  meta: {
    successMessage: 'Profile updated successfully!',
  },
});
```

### Disable All Notifications

```typescript
useMutation({
  mutationFn: saveData,
  meta: {
    disableErrorToast: true,
    disableSuccessToast: true,
  },
});
```

## Real Examples

### Login (No Success Toast)
```typescript
export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      navigate('/dashboard');
    },
    meta: {
      disableSuccessToast: true, // Disabled because we navigate away
    },
  });
};
```

### Update Profile (Custom Success Message)
```typescript
export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: updateProfile,
    meta: {
      successMessage: 'Profile updated successfully',
    },
  });
};
```

### Background Polling Query (Silent Errors)
```typescript
export const useBackgroundData = () => {
  return useQuery({
    queryKey: ['background'],
    queryFn: fetchBackgroundData,
    refetchInterval: 30000,
    meta: {
      disableErrorToast: true, // Silent polling, don't annoy users
    },
  });
};
```

## Translation Keys

Error fallback messages are stored in `src/lib/i18n/messages/{lang}/errors.json`:

```json
{
  "queryError": "An error occurred while fetching data",
  "mutationError": "An error occurred",
  "mutationSuccess": "Operation completed successfully"
}
```

## Toast Configuration

Toast styling is configured in `src/providers/QueryProvider.tsx`:

- Position: top-right
- Duration: 4s (errors), 3s (success)
- Theme: Dark with colored icons
- RTL support included

## Manual Toast Usage

You can also trigger toasts manually anywhere in your app:

```typescript
import toast from 'react-hot-toast';

toast.success('Success message');
toast.error('Error message');
toast.loading('Loading...');
```
