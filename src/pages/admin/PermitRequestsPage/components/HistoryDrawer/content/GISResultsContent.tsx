import type { HistoryLogItem } from "../types";

interface GISResultsContentProps {
  log: HistoryLogItem;
}

export const GISResultsContent = ({ log }: GISResultsContentProps) => {
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
    </div>
  );
};
