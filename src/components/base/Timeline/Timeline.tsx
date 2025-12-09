import { TimelineItem } from "./TimelineItem";
import type { TimelineItemBase, TimelineStatusConfig } from "./types";

interface TimelineProps<T extends TimelineItemBase> {
  items: T[];
  getTitle: (item: T) => string;
  getStatus: (item: T) => TimelineStatusConfig;
  renderContent: (item: T) => React.ReactNode;
}

export const Timeline = <T extends TimelineItemBase>({
  items,
  getTitle,
  getStatus,
  renderContent,
}: TimelineProps<T>) => {
  return (
    <div className="space-y-0">
      {items.map((item, index) => (
        <TimelineItem
          key={item.id}
          item={item}
          isLast={index === items.length - 1}
          getTitle={getTitle}
          getStatus={getStatus}
          renderContent={renderContent}
        />
      ))}
    </div>
  );
};
