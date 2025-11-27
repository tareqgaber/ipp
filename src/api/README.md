# API Layer Documentation

This directory contains the complete API layer for the application, organized for maintainability and scalability.

## Structure

```
api/
├── axios/                          # Axios configuration
│   ├── index.ts                   # Axios instance with base config
│   ├── requestInterceptor.ts      # Handles auth tokens, language, headers
│   └── responseInterceptor.ts     # Handles errors, token refresh, redirects
│
├── endpoints.ts                   # Centralized API endpoint definitions
├── queryKeys.ts                   # TanStack Query key factory
│
├── queries/                       # TanStack Query hooks
│   ├── auth.ts                    # Authentication hooks
│   ├── opportunities.ts           # Opportunities hooks
│   ├── investors.ts               # Investors hooks
│   └── index.ts                   # Barrel export
│
└── types/                         # TypeScript types
    ├── auth.ts                    # Auth-related types
    ├── opportunities.ts           # Opportunities types
    ├── investors.ts               # Investors types
    └── index.ts                   # Barrel export
```

## Usage Examples

### Authentication

```tsx
import { useLogin, useProfile, useLogout } from '@/api/queries';

function LoginForm() {
  const login = useLogin();
  
  const handleLogin = async (email: string, password: string) => {
    try {
      await login.mutateAsync({ email, password });
      // User is logged in, tokens stored automatically
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
}

function UserProfile() {
  const { data: profile, isLoading } = useProfile();
  
  if (isLoading) return <div>Loading...</div>;
  
  return <div>Welcome, {profile?.user.name}</div>;
}
```

### Opportunities

```tsx
import { useOpportunities, useCreateOpportunity } from '@/api/queries';

function OpportunitiesList() {
  const { data, isLoading } = useOpportunities({
    page: 1,
    limit: 10,
    status: 'published'
  });
  
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <div>
      {data?.data.map(opportunity => (
        <div key={opportunity.id}>{opportunity.title}</div>
      ))}
    </div>
  );
}

function CreateOpportunity() {
  const createOpportunity = useCreateOpportunity();
  
  const handleSubmit = async (formData) => {
    try {
      await createOpportunity.mutateAsync(formData);
      // Opportunity created, lists will auto-refresh
    } catch (error) {
      console.error('Failed to create:', error);
    }
  };
}
```

### Investors

```tsx
import { useInvestors, useInvestor } from '@/api/queries';

function InvestorsList() {
  const { data } = useInvestors({ verified: true });
  
  return (
    <div>
      {data?.data.map(investor => (
        <div key={investor.id}>{investor.name}</div>
      ))}
    </div>
  );
}

function InvestorDetail({ id }: { id: string }) {
  const { data, isLoading } = useInvestor(id);
  
  if (isLoading) return <div>Loading...</div>;
  
  return <div>{data?.data.name}</div>;
}
```

## Configuration

### Environment Variables

Create a `.env` file with:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

### Request Interceptor

Automatically attaches:
- **Authorization header** with Bearer token from localStorage
- **Accept-Language header** for i18n
- **Content-Type** set to application/json

### Response Interceptor

Handles:
- **401 Unauthorized**: Automatically refreshes access token
- **403 Forbidden**: Logs permission errors
- **404 Not Found**: Logs resource errors
- **500 Server Error**: Logs server errors

When token refresh fails, automatically clears tokens and redirects to `/login`.

## Query Keys

Consistent cache key structure using factory pattern:

```ts
queryKeys.auth.profile()
queryKeys.opportunities.list({ status: 'published' })
queryKeys.opportunities.detail(id)
queryKeys.investors.list({ verified: true })
queryKeys.investors.detail(id)
```

## Best Practices

1. **Always use the hooks** - Don't call axios directly in components
2. **Use query keys** - For manual cache invalidation
3. **Handle loading states** - All queries return `isLoading`, `isPending`, `isError`
4. **Type safety** - All requests/responses are fully typed
5. **Error handling** - Wrap mutations in try-catch blocks

## Adding New Entities

To add a new entity (e.g., "projects"):

1. Add endpoints in `endpoints.ts`
2. Add query keys in `queryKeys.ts`
3. Create types in `types/projects.ts`
4. Create hooks in `queries/projects.ts`
5. Export from barrel files

## Token Storage

Tokens are stored in `localStorage`:
- `accessToken` - Used for API authentication
- `refreshToken` - Used to refresh expired access tokens

For production, consider more secure storage (httpOnly cookies).
