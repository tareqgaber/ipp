# Admin Layout Control Guide

This guide explains how to hide/show AdminLayout components on specific pages.

## Overview

The AdminLayout now supports route-based configuration to control visibility of layout elements using the `handle` property in route definitions.

## Available Options

You can control three aspects of the layout:

- **`hideLayout`**: Hides entire layout (sidebar + header) - renders only page content
- **`hideHeader`**: Hides only the header (keeps sidebar)
- **`hideSidebar`**: Hides only the sidebar (keeps header)

## Usage

### 1. Hide Entire Layout

Use this for full-screen pages (editors, presentations, etc.):

```typescript
{
  path: "/admin/full-screen-editor",
  element: <EditorPage />,
  handle: { hideLayout: true } as RouteHandle,
}
```

### 2. Hide Only Sidebar

Use this for pages that need more horizontal space:

```typescript
{
  path: "/admin/wide-dashboard",
  element: <WideDashboard />,
  handle: { hideSidebar: true } as RouteHandle,
}
```

### 3. Hide Only Header

Use this for focused content pages:

```typescript
{
  path: "/admin/focus-mode",
  element: <FocusPage />,
  handle: { hideHeader: true } as RouteHandle,
}
```

### 4. Combine Options

You can combine multiple options:

```typescript
{
  path: "/admin/custom-view",
  element: <CustomPage />,
  handle: { 
    hideHeader: true,
    hideSidebar: true 
  } as RouteHandle,
}
```

## Performance

- **Zero runtime overhead**: Configuration is read once on route mount
- **No re-renders**: Static configuration doesn't trigger component updates
- **Optimal**: Layout elements are completely unmounted when hidden (not just hidden with CSS)

## Examples in Routes

See `src/router/routes.tsx` for commented examples on existing routes.

## Type Safety

The `RouteHandle` type is defined in `src/router/types.ts` and provides full TypeScript support.
