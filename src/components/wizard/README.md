# Multi-Step Wizard System

A complete, config-driven wizard system for React with full RTL/LTR support.

## Features

✅ **Stateless UI Components** - Fully controlled via props  
✅ **Config-Driven** - Define steps, guards, lifecycles, and actions declaratively  
✅ **RTL/LTR Support** - Full bidirectional layout support with directional properties  
✅ **Responsive Design** - Desktop sidebar, mobile drawer  
✅ **Type-Safe** - Complete TypeScript support  
✅ **Accessible** - ARIA attributes, keyboard navigation  
✅ **Animated** - Smooth transitions with Framer Motion  
✅ **No Form Logic** - Pure navigation and UI (form integration optional)

## Quick Start

```tsx
import { useWizard } from '@/hooks';
import { WizardShell, WizardContent, WizardFooter } from '@/components/wizard/ui';
import { mapStepsToUI } from '@/components/wizard';
import type { WizardConfig } from '@/components/wizard';

// 1. Define your wizard config
const config: WizardConfig = {
  id: 'my-wizard',
  steps: [
    {
      id: 'step-1',
      title: 'Step One',
      subtitle: 'Getting started',
      getActions: (ctx) => [
        { key: 'next', label: 'Next', navigation: 'next' }
      ]
    },
    // ... more steps
  ]
};

// 2. Use in component
function MyWizard() {
  const ctx = useWizard(config);
  const [stepsUi, setStepsUi] = useState([]);

  useEffect(() => {
    mapStepsToUI(ctx.steps, ctx.activeStep.id, ctx.activeStepIndex, ctx.values)
      .then(setStepsUi);
  }, [ctx.activeStepIndex]);

  return (
    <WizardShell
      stepsUi={stepsUi}
      activeStepId={ctx.activeStep.id}
      onStepClick={ctx.goto}
      progressPercent={ctx.progressPercent}
      footerSlot={<WizardFooter actions={ctx.getActions()} onActionClick={ctx.runAction} />}
    >
      <WizardContent title={ctx.activeStep.title}>
        {/* Your step content */}
      </WizardContent>
    </WizardShell>
  );
}
```

## File Structure

```
wizard/
├── ui/                      # UI Components
│   ├── WizardProgress.tsx   # Progress bar
│   ├── WizardBanner.tsx     # Alert messages
│   ├── WizardStepper.tsx    # Step navigation
│   ├── WizardContent.tsx    # Content area
│   ├── WizardFooter.tsx     # Action buttons
│   ├── WizardMobileHeader.tsx
│   ├── WizardShell.tsx      # Main layout
│   └── index.ts
│
├── core/                    # Core Logic
│   ├── types.ts             # TypeScript types
│   ├── actionsEngine.ts     # Action execution
│   ├── navigationUtils.ts   # Navigation helpers
│   └── index.ts
│
└── index.ts                 # Main exports
```

## Step Configuration

```tsx
interface WizardStepConfig {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;

  // Navigation Guards
  shouldSkip?(values: any): boolean | Promise<boolean>;
  canEnter?(ctx: WizardContext): boolean | Promise<boolean>;
  canLeave?(ctx: WizardContext): boolean | Promise<boolean>;

  // Lifecycle Hooks
  onEnter?(ctx: WizardContext): void | Promise<void>;
  onLeave?(ctx: WizardContext): void | Promise<void>;

  // Dynamic Actions
  getActions?(ctx: WizardContext): WizardAction[];
}
```

## Actions

```tsx
interface WizardAction {
  key: string;
  label: string;
  variant?: 'contained' | 'outlined' | 'ghost';
  color?: 'primary' | 'gray' | 'error' | 'success';
  align?: 'start' | 'end';
  icon?: { left?: ReactNode; right?: ReactNode };
  tooltip?: string;
  hidden?: boolean;
  disabled?: boolean;
  loading?: boolean;

  // Action Pipeline
  guards?: Array<(ctx: WizardContext) => boolean | Promise<boolean>>;
  effects?: Array<(ctx: WizardContext) => void | Promise<void>>;
  navigation?: 'next' | 'back' | 'goto' | ((ctx: WizardContext) => void);
}
```

### Preset Actions

```tsx
import { presetActions } from '@/components/wizard';

const actions = [
  presetActions.back,    // Navigate back
  presetActions.next,    // Navigate forward
  presetActions.cancel,  // Cancel wizard
  presetActions.saveDraft,   // Save draft
  presetActions.submit,  // Submit wizard
];
```

## RTL/LTR Support

The wizard uses Tailwind's logical properties throughout:

- `ms-*` / `me-*` instead of `ml-*` / `mr-*`
- `ps-*` / `pe-*` instead of `pl-*` / `pr-*`
- `border-s` / `border-e` instead of `border-l` / `border-r`
- `start-*` / `end-*` for positioning

Icons with `.directional-icon` class automatically flip in RTL:

```tsx
<ArrowRight className="directional-icon" />  // Flips in RTL
```

## Lifecycle Flow

### Forward Navigation (Next)
```
1. User triggers action (e.g., clicks "Next")
2. Run action guards → all must pass
3. Execute action effects in sequence
4. Run current step's canLeave() → must return true (validation)
5. Execute current step's onLeave()
6. Resolve next step (skip if shouldSkip() returns true)
7. Run next step's canEnter() → must return true
8. Update active step index
9. Execute next step's onEnter()
10. Update UI (stepper, progress, content, footer)
```

### Backward Navigation (Back)
```
1. User triggers action (e.g., clicks "Back")
2. Run action guards → all must pass
3. Execute action effects in sequence
4. Skip canLeave() validation (always allow going back)
5. Execute current step's onLeave()
6. Resolve previous step
7. Update active step index
8. Execute previous step's onEnter()
9. Update UI (stepper, progress, content, footer)
```

**Note:** `canLeave()` is **only checked for forward navigation**. This allows users to freely navigate backwards to fix validation issues.

## Examples

See `/pages/examples/WizardDemo.tsx` for a complete working example with:
- 4 steps (1 auto-skipped)
- Custom actions
- RTL/LTR switching
- Console logging
- No form inputs

## Customization

### Custom Step Icons

Modify `WizardStepper.tsx` → `StepIcon` component

### Custom Transitions

Update `src/lib/animations.ts` → `wizardStepVariants`

### Custom Action Pipeline

Create actions with custom guards/effects:

```tsx
{
  key: 'validate',
  label: 'Validate',
  guards: [
    (ctx) => {
      // Check if data is valid
      return isValid(ctx.values);
    }
  ],
  effects: [
    async (ctx) => {
      // Call API
      await api.validate(ctx.values);
    }
  ],
  navigation: 'next'
}
```

## Notes

- **No form integration** - This wizard handles navigation only. Integrate react-hook-form separately if needed.
- **Console logging** - All lifecycle events are logged for debugging. Remove in production.
- **Unused `ctx` parameters** - Demo config intentionally keeps unused context parameters for documentation clarity.

## Dependencies

- React 19+
- Framer Motion
- Radix UI (Sheet, Progress, Dialog, Tooltip)
- Tailwind CSS 4+
- @untitledui/icons
- TypeScript 5+
