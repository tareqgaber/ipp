import type { HistoryLogItem as HistoryLogItemType } from "./types";
import { HistoryLogItem } from "./HistoryLogItem";

interface HistoryTimelineProps {
  logs: HistoryLogItemType[];
}

export const HistoryTimeline = ({ logs }: HistoryTimelineProps) => {
  return (
    <div className="space-y-0">
      {logs.map((log, index) => (
        <HistoryLogItem
          key={log.id}
          log={log}
          isLast={index === logs.length - 1}
        />
      ))}
    </div>
  );
};
