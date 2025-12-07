import type { HistoryLogItem } from "../types";

interface SubmitContentProps {
  log: HistoryLogItem;
}

export const SubmitContent = ({ log }: SubmitContentProps) => {
  return (
    <div className="text-sm text-tertiary">
      <span>Done by </span>
      <span className="text-brand-600 font-medium">{log.doneBy}</span>
    </div>
  );
};
