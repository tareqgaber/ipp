import type { HistoryLogItem } from "../types";

interface SaveContentProps {
  log: HistoryLogItem;
}

export const SaveContent = ({ log }: SaveContentProps) => {
  return (
    <div className="space-y-3">
      <div className="text-sm text-tertiary">
        <span>Done by </span>
        <span className="text-brand-600 font-medium">{log.doneBy}</span>
      </div>

      {log.gisConflicts && log.gisConflicts.length > 0 && (
        <div className="grid grid-cols-2 gap-2 text-sm">
          {log.gisConflicts.map((conflict, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="text-tertiary">{conflict.label}</span>
              <span className="text-error-600 font-medium">
                {conflict.value}
              </span>
            </div>
          ))}
        </div>
      )}

      {log.comment && (
        <div className="space-y-1">
          <p className="text-sm font-medium text-secondary">Comment</p>
          <div className="rounded-lg bg-secondary p-3 text-sm text-tertiary">
            {log.comment}
          </div>
        </div>
      )}
    </div>
  );
};
