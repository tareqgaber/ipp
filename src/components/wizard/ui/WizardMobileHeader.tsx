import { Button } from "@/components/ui/button";
import { WizardProgress } from "./WizardProgress";
import { Menu01 } from "@untitledui/icons";
import { cn } from "@/lib/utils";

export interface WizardMobileHeaderProps {
  title: string;
  onOpenSteps: () => void;
  progressPercent?: number;
  className?: string;
}

/**
 * WizardMobileHeader - Mobile-only header with menu button and progress
 * RTL-aware: Uses gap-* for spacing, flex auto-handles direction
 */
export function WizardMobileHeader({
  title,
  onOpenSteps,
  progressPercent,
  className,
}: WizardMobileHeaderProps) {
  return (
    <div
      className={cn(
        "sticky top-0 z-50 border-b bg-background md:hidden",
        className
      )}
    >
      <div className="flex items-center gap-3 px-4 py-3">
        {/* Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onOpenSteps}
          aria-label="Open steps menu"
          className="shrink-0"
        >
          <Menu01 className="size-5" />
        </Button>

        {/* Title */}
        <h2 className="flex-1 truncate text-sm font-medium text-foreground">
          {title}
        </h2>
      </div>

      {/* Progress Bar */}
      {progressPercent !== undefined && (
        <div className="px-4 pb-3">
          <WizardProgress percent={progressPercent} />
        </div>
      )}
    </div>
  );
}
