import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  InfoCircle,
  AlertCircle,
  XCircle,
  CheckCircle,
  X,
} from "@untitledui/icons";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export interface WizardBannerProps {
  type: "info" | "warning" | "error" | "success";
  title?: string;
  message: string | ReactNode;
  dismissible?: boolean;
  onDismiss?(): void;
  className?: string;
}

const bannerConfig = {
  info: {
    icon: InfoCircle,
    className:
      "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800/40 dark:bg-blue-950/20 dark:text-blue-400",
  },
  warning: {
    icon: AlertCircle,
    className:
      "border-orange-200 bg-orange-50 text-orange-900 dark:border-orange-800/40 dark:bg-orange-950/20 dark:text-orange-400",
  },
  error: {
    icon: XCircle,
    className:
      "border-red-200 bg-red-50 text-red-900 dark:border-red-800/40 dark:bg-red-950/20 dark:text-red-400",
  },
  success: {
    icon: CheckCircle,
    className:
      "border-green-200 bg-green-50 text-green-900 dark:border-green-800/40 dark:bg-green-950/20 dark:text-green-400",
  },
};

/**
 * WizardBanner - Contextual alert messages
 * RTL-aware: Uses gap-* and ms-auto for dismiss button
 */
export function WizardBanner({
  type,
  title,
  message,
  dismissible = false,
  onDismiss,
  className,
}: WizardBannerProps) {
  const config = bannerConfig[type];
  const Icon = config.icon;

  return (
    <Alert className={cn(config.className, className)}>
      <Icon className="size-5" />
      <div className="flex-1">
        {title && <AlertTitle>{title}</AlertTitle>}
        <AlertDescription>{message}</AlertDescription>
      </div>
      {dismissible && onDismiss && (
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onDismiss}
          className="ms-auto shrink-0 hover:bg-current/10"
          aria-label="Dismiss"
        >
          <X className="size-4" />
        </Button>
      )}
    </Alert>
  );
}
