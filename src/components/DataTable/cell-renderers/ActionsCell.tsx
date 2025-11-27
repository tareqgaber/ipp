import { useState, isValidElement, createElement } from "react";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ActionItem, Action } from "../types";

interface ActionsCellProps {
  actions: ActionItem[];
  trigger?: React.ReactNode;
  align?: "start" | "center" | "end";
  disabled?: boolean;
}

export function ActionsCell({
  actions,
  trigger,
  align = "end",
  disabled,
}: ActionsCellProps) {
  const [loadingAction, setLoadingAction] = useState<string | null>(null);

  const handleAction = async (action: Action) => {
    // Confirmation
    if (action.requireConfirm) {
      const confirmed = window.confirm(
        action.confirmMessage || "Are you sure?"
      );
      if (!confirmed) return;
    }

    // Loading state
    setLoadingAction(action.label);

    try {
      await action.onClick();
    } catch (error) {
      console.error("Action failed:", error);
    } finally {
      setLoadingAction(null);
    }
  };

  // Filter visible actions
  const visibleActions = actions.filter(
    (action) =>
      action.type === "separator" || (action as Action).visible !== false
  );

  if (visibleActions.length === 0) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={disabled}>
        {trigger || (
          <Button variant="ghost" size="icon-sm" className="h-8 w-8">
            <MoreVertical className="h-4 w-4 text-gray-400" />
            <span className="sr-only">Actions</span>
          </Button>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent align={align} className="w-40">
        {visibleActions.map((item, index) => {
          // Separator
          if (item.type === "separator") {
            return <DropdownMenuSeparator key={`separator-${index}`} />;
          }

          const action = item as Action;
          const isLoading = loadingAction === action.label;
          const Icon = action.icon;

          return (
            <DropdownMenuItem
              key={action.label}
              onClick={() => handleAction(action)}
              disabled={action.disabled || isLoading}
              // className={
              //   action.variant === "destructive"
              //     ? "text-destructive focus:text-destructive"
              //     : ""
              // }
            >
              {Icon && (
                <span className="mr-2">
                  {isValidElement(Icon)
                    ? Icon
                    : createElement(Icon as any, { className: "h-4 w-4" })}
                </span>
              )}
              <span>{isLoading ? "Loading..." : action.label}</span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
