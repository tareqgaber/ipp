import type { HistoryLogItem } from "../types";

interface RequestCreatedContentProps {
  log: HistoryLogItem;
}

export const RequestCreatedContent = ({ log }: RequestCreatedContentProps) => {
  return (
    <div className="text-sm text-tertiary">
      <span>Done by </span>
      <span className="text-brand-600 font-medium">{log.doneBy}</span>
    </div>
  );
};
