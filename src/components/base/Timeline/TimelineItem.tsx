import { Badge } from "@/components/base/badges/badges";
import { Check } from "@untitledui/icons";
import type { TimelineItemBase, TimelineStatusConfig } from "./types";

interface TimelineItemProps<T extends TimelineItemBase> {
  item: T;
  isLast?: boolean;
  getTitle: (item: T) => string;
  getStatus: (item: T) => TimelineStatusConfig;
  renderContent: (item: T) => React.ReactNode;
}

export const TimelineItem = <T extends TimelineItemBase>({
  item,
  isLast,
  getTitle,
  getStatus,
  renderContent,
}: TimelineItemProps<T>) => {
  const statusConfig = getStatus(item);

  return (
    <div className="relative flex gap-4">
      {/* Timeline indicator */}
      <div className="flex flex-col items-center">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-600 shrink-0">
          <Check className="h-4 w-4 text-white" />
        </div>
        {!isLast && (
          <div className="w-0.5 bg-brand-500 h-[calc(100%-32px)] mt-1 rounded-2xl dark:bg-gray-700" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-6">
        {/* Date and Time */}
        <div className="mb-1 text-sm text-tertiary">
          <span className="font-medium text-primary">{item.date}</span>
          <br />
          <span>{item.time}</span>
        </div>

        {/* Title and Status */}
        <div className="mb-2 flex items-center justify-between">
          <h4 className="font-medium text-primary">{getTitle(item)}</h4>
          <Badge color={statusConfig.color} size="sm">
            {statusConfig.label}
          </Badge>
        </div>

        {/* Dynamic Content */}
        {renderContent(item)}
      </div>
    </div>
  );
};
