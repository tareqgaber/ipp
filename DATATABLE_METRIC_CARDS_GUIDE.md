# DataTable Metric Cards - Selection & Control Guide

## Overview

The DataTable metric cards now support advanced selection modes and clickability control, allowing you to create flexible filtering interfaces.

## Features

### 1. Selection Modes

#### Radio Mode (Single Selection) - Default

Only one metric card can be active at a time. Clicking a card deselects any previously selected card.

```typescript
const config: DataTableConfig<YourType> = {
  // ... other config
  metricCardsSelectionMode: "radio", // or omit for default
  metricCards: [
    {
      id: "pending",
      label: "Pending",
      value: 89,
      filterKey: "status",
      filterValue: "pending",
    },
    // ... more cards
  ],
};
```

#### Checkbox Mode (Multiple Selection)

Multiple metric cards can be active simultaneously. Users can select/deselect cards independently.

```typescript
const config: DataTableConfig<YourType> = {
  // ... other config
  metricCardsSelectionMode: "checkbox",
  metricCards: [
    {
      id: "pending",
      label: "Pending",
      value: 89,
      filterKey: "status",
      filterValue: "pending",
    },
    {
      id: "approved",
      label: "Approved",
      value: 98,
      filterKey: "status",
      filterValue: "approved",
    },
    // ... more cards
  ],
};
```

### 2. Initial Active State

Control which cards are initially active when the table loads using the `isActive` property.

#### Setting Initial Active Cards

```typescript
metricCards: [
  {
    id: "pending",
    label: "Pending",
    value: 89,
    filterKey: "status",
    filterValue: "pending",
    isActive: true, // This card will be active on initial load
  },
  {
    id: "approved",
    label: "Approved",
    value: 98,
    filterKey: "status",
    filterValue: "approved",
    // isActive: false is the default
  },
];
```

#### Behavior by Selection Mode

**Radio Mode (Single Selection)**:

- Only the **first** card with `isActive: true` will be initially active
- If multiple cards have `isActive: true`, only the first one is used
- The corresponding filter is automatically applied on load

**Checkbox Mode (Multiple Selection)**:

- **All** cards with `isActive: true` will be initially active
- Multiple cards can be pre-selected
- All corresponding filters are automatically applied on load

### 3. Clickable Control

Control whether individual cards can be clicked/activated using the `clickable` property.

#### Non-Clickable Cards (Display Only)

Set `clickable: false` to make a card display-only (e.g., for total counts).

```typescript
metricCards: [
  {
    id: "all",
    label: "All Requests",
    value: 248,
    filterKey: "status",
    filterValue: undefined,
    clickable: false, // This card cannot be clicked
  },
  {
    id: "pending",
    label: "Pending",
    value: 89,
    filterKey: "status",
    filterValue: "pending",
    // clickable: true is the default
  },
];
```

#### Visual Indicators

- **Clickable cards**: Show pointer cursor, hover effects, and shadow on hover
- **Non-clickable cards**: Show default cursor, reduced opacity (75%), no hover effects

### 4. Direction Icons

Cards support trend indicators with color coding:

```typescript
{
  id: "pending",
  label: "Pending",
  value: 89,
  percentage: "+8%",
  subtext: "vs last month",
  directionIcon: "up", // Shows green arrow up-right
}

{
  id: "under_review",
  label: "Under Review",
  value: 45,
  percentage: "-5%",
  subtext: "vs last month",
  directionIcon: "down", // Shows red arrow down-right
}
```

- **`"up"`**: Green `ArrowUpRight` icon (success-500)
- **`"down"`**: Red `ArrowDownRight` icon (error-500)
- **`undefined`**: No icon displayed

## Complete Example

```typescript
export const createTableConfig = (): DataTableConfig<PermitRequest> => ({
  title: "Permit Requests",
  subtitle: "Manage and review all permit requests",

  // Enable checkbox mode for multiple selections
  metricCardsSelectionMode: "checkbox",

  metricCards: [
    {
      id: "all",
      label: "All Requests",
      value: 248,
      filterKey: "status",
      filterValue: undefined,
      percentage: "+12%",
      subtext: "vs last month",
      directionIcon: "up",
      clickable: false, // Display only, not filterable
    },
    {
      id: "pending",
      label: "Pending",
      value: 89,
      filterKey: "status",
      filterValue: "pending",
      percentage: "+8%",
      subtext: "vs last month",
      directionIcon: "up",
      isActive: true, // Initially active on load
      // clickable: true (default)
    },
    {
      id: "under_review",
      label: "Under Review",
      value: 45,
      filterKey: "status",
      filterValue: "under_review",
      percentage: "-5%",
      subtext: "vs last month",
      directionIcon: "down",
    },
    {
      id: "approved",
      label: "Approved",
      value: 98,
      filterKey: "status",
      filterValue: "approved",
      percentage: "+15%",
      subtext: "vs last month",
      directionIcon: "up",
    },
  ],

  // ... rest of config
});
```

## Type Definitions

### DataTableMetricCard

```typescript
interface DataTableMetricCard {
  id: string;
  label: string;
  value: number | string;
  filterKey: string;
  filterValue: any;
  percentage?: string;
  subtext?: string;
  directionIcon?: "up" | "down";
  clickable?: boolean; // Default: true
  isActive?: boolean; // Default: false
}
```

### DataTableConfig

```typescript
interface DataTableConfig<T> {
  // ... other properties
  metricCards?: DataTableMetricCard[];
  metricCardsSelectionMode?: "radio" | "checkbox"; // Default: "radio"
}
```

## Behavior

### Radio Mode

1. Click a card → It becomes active, any other active card is deselected
2. Click the active card → It becomes inactive
3. Filters are applied/removed based on the active card

### Checkbox Mode

1. Click an inactive card → It becomes active (added to selection)
2. Click an active card → It becomes inactive (removed from selection)
3. Multiple cards can be active simultaneously
4. Filters are applied for all active cards

### Non-Clickable Cards

1. Cannot be selected/activated
2. Do not apply filters
3. Useful for displaying totals or summary information
4. Visual styling indicates they are not interactive
