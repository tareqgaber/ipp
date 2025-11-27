# Authentication System Guide

## Overview
This project implements a complete authentication system with:
- **Redux** for state management
- **Cookie-based** token storage
- **Role-based** access control (RBAC)
- **Protected routes** with React Router
- **Token refresh** mechanism

## User Roles
The system supports the following roles:
- `admin` - Full system access
- `investor` - Investor portal access
- `employee` - Employee features
- `dv_manager` - DV Manager privileges
- `department_manager` - Department management access

## Key Features

### 1. Authentication State Management
Located in `src/store/slices/authSlice.ts`

**Actions:**
- `setCredentials` - Store user and tokens
- `setUser` - Update user data
- `updateUser` - Partial user update
- `logout` - Clear auth state and tokens

**Selectors:**
- `selectCurrentUser` - Get current user
- `selectIsAuthenticated` - Check auth status
- `selectIsLoading` - Loading state
- `selectUserRole` - Get user role
- `selectHasRole` - Check specific role(s)

### 2. Token Management
Located in `src/lib/auth/tokenManager.ts`

Provides secure cookie-based token storage:
```typescript
import { tokenManager } from './lib/auth/tokenManager';

// Set tokens
tokenManager.setAccessToken(token);
tokenManager.setRefreshToken(token);

// Get tokens
const accessToken = tokenManager.getAccessToken();
const refreshToken = tokenManager.getRefreshToken();

// Remove tokens
tokenManager.clearTokens();

// Check if token exists
const hasToken = tokenManager.hasValidToken();
```

### 3. Auth Hook
Located in `src/hooks/useAuth.ts`

Main hook for authentication operations:
```typescript
import { useAuth } from './hooks';

function MyComponent() {
  const { 
    user,           // Current user object
    isAuthenticated, // Auth status
    isLoading,      // Loading state
    role,           // User role
    logout,         // Logout function
    hasRole,        // Role checker function
    isAdmin,        // Boolean shortcuts
    isInvestor,
    isEmployee,
    isDVManager,
    isDepartmentManager
  } = useAuth();
  
  return (
    <div>
      {isAuthenticated && <p>Welcome, {user?.name}</p>}
      {isAdmin && <button>Admin Panel</button>}
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### 4. Protected Routes
Located in `src/router/ProtectedRoute.tsx`

**Basic Protection:**
```tsx
<ProtectedRoute>
  <DashboardPage />
</ProtectedRoute>
```

**Role-Based Protection:**
```tsx
// Single role
<ProtectedRoute roles="admin">
  <AdminPage />
</ProtectedRoute>

// Multiple roles
<ProtectedRoute roles={["admin", "dv_manager"]}>
  <ManagerPage />
</ProtectedRoute>

// Custom fallback
<ProtectedRoute roles="admin" fallbackPath="/custom-unauthorized">
  <SecurePage />
</ProtectedRoute>
```

### 5. API Integration

**Login:**
```typescript
import { useLogin } from './api/queries/auth';

function LoginForm() {
  const login = useLogin();
  
  const handleLogin = () => {
    login.mutate({ 
      email: 'user@example.com', 
      password: 'password' 
    });
  };
  
  return <button onClick={handleLogin}>Login</button>;
}
```

**Logout:**
```typescript
import { useLogout } from './api/queries/auth';

function LogoutButton() {
  const logout = useLogout();
  
  return <button onClick={() => logout.mutate()}>Logout</button>;
}
```

**Profile Update:**
```typescript
import { useUpdateProfile } from './api/queries/auth';

function ProfileForm() {
  const updateProfile = useUpdateProfile();
  
  const handleUpdate = () => {
    updateProfile.mutate({ 
      name: 'New Name',
      avatar: 'https://...' 
    });
  };
  
  return <button onClick={handleUpdate}>Update</button>;
}
```

## Adding New Routes

### Public Route
```typescript
{
  path: "/about",
  element: <AboutPage />,
}
```

### Protected Route
```typescript
{
  path: "/profile",
  element: (
    <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>
  ),
}
```

### Role-Based Route
```typescript
{
  path: "/investors",
  element: (
    <ProtectedRoute roles="investor">
      <InvestorDashboard />
    </ProtectedRoute>
  ),
}

{
  path: "/management",
  element: (
    <ProtectedRoute roles={["admin", "dv_manager", "department_manager"]}>
      <ManagementPanel />
    </ProtectedRoute>
  ),
}
```

## Axios Interceptors

### Request Interceptor
Automatically attaches access token from cookies to all API requests.

### Response Interceptor
Handles:
- **401 Unauthorized** - Attempts token refresh
- **403 Forbidden** - Logs permission error
- **Token Refresh** - Auto-refreshes expired tokens
- **Auth Errors** - Clears tokens and redirects to login

## Session Persistence

The `AuthInitializer` component checks for existing tokens on app load, ensuring users remain logged in across page refreshes.

## Security Features

1. **Cookie Storage** - More secure than localStorage
   - `secure` flag in production (HTTPS only)
   - `sameSite: strict` to prevent CSRF

2. **Token Expiration**
   - Access token: 1 day
   - Refresh token: 7 days

3. **Automatic Token Refresh** - Handles expired tokens seamlessly

4. **Role-Based Access Control** - Prevents unauthorized access

## Environment Variables

Set in `.env`:
```
VITE_API_BASE_URL=http://localhost:3000/api
```

## Demo/Testing

Currently using mock login response for testing:
- **Any email/password** will authenticate
- **Default role:** admin
- See `MOCK_LOGIN_RESPONSE` in `src/api/queries/auth.ts`

To enable real API:
1. Uncomment the actual API call in `useLogin`
2. Comment out the mock response
3. Ensure your backend is running

## File Structure

```
src/
├── api/
│   ├── axios/
│   │   ├── requestInterceptor.ts   # Attach tokens
│   │   └── responseInterceptor.ts  # Handle refresh
│   ├── queries/
│   │   └── auth.ts                 # Auth API hooks
│   └── types/
│       └── auth.ts                 # Auth types
├── components/
│   └── AuthInitializer.tsx         # Session init
├── hooks/
│   └── useAuth.ts                  # Main auth hook
├── lib/
│   └── auth/
│       └── tokenManager.ts         # Cookie management
├── pages/
│   ├── LoginPage.tsx
│   ├── DashboardPage.tsx
│   ├── AdminPage.tsx
│   └── UnauthorizedPage.tsx
├── router/
│   ├── index.tsx                   # Router setup
│   ├── routes.tsx                  # Route definitions
│   └── ProtectedRoute.tsx          # Auth guard
└── store/
    └── slices/
        └── authSlice.ts            # Auth state
```

## Best Practices

1. Always use `useAuth()` hook for auth operations
2. Use typed hooks from `store/hooks.ts` for Redux
3. Protect sensitive routes with `<ProtectedRoute>`
4. Use role-based access for admin/management features
5. Clear tokens on logout
6. Handle loading states in protected components
