import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { WizardAction } from "../core/types";

export interface WizardFooterProps {
  actions: WizardAction[];
  onActionClick: (key: string) => void;
  className?: string;
}

/**
 * WizardFooter - Sticky action buttons bar
 * RTL-aware: Uses justify-between, icons get .directional-icon class
 */
export function WizardFooter({
  actions,
  onActionClick,
  className,
}: WizardFooterProps) {
  const visibleActions = actions.filter((action) => !action.hidden);
  const startActions = visibleActions.filter((a) => a.align === "start");
  const endActions = visibleActions.filter((a) => a.align !== "start");

  if (visibleActions.length === 0) return null;

  return (
    <div
      className={cn(
        "sticky bottom-0 z-10 border-t bg-background px-6 py-4 shadow-sm",
        className
      )}
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        {/* Start-aligned actions */}
        <div className="flex flex-wrap items-center gap-2">
          {startActions.map((action) => (
            <ActionButton
              key={action.key}
              action={action}
              onClick={() => onActionClick(action.key)}
            />
          ))}
        </div>

        {/* End-aligned actions */}
        <div className="flex flex-wrap items-center gap-2 md:ms-auto">
          {endActions.map((action) => (
            <ActionButton
              key={action.key}
              action={action}
              onClick={() => onActionClick(action.key)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * ActionButton - Individual action button with optional tooltip
 */
function ActionButton({
  action,
  onClick,
}: {
  action: WizardAction;
  onClick: () => void;
}) {
  const button = (
    <Button
      variant={action.variant || "contained"}
      color={action.color || "primary"}
      size="lg"
      disabled={action.disabled}
      loading={action.loading}
      onClick={onClick}
      className="min-w-[100px]"
    >
      {action.icon?.left && (
        <span className="directional-icon">{action.icon.left}</span>
      )}
      {action.label}
      {action.icon?.right && (
        <span className="directional-icon">{action.icon.right}</span>
      )}
    </Button>
  );

  if (action.tooltip) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent>
          <p>{action.tooltip}</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  return button;
}
