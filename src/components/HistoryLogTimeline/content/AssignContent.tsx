import { ArrowRight, Users } from "lucide-react";
import type { HistoryLogItem } from "../types";

interface AssignContentProps {
  log: HistoryLogItem;
}

export const AssignContent = ({ log }: AssignContentProps) => {
  return (
    <div className="space-y-3">
      <div className="text-sm text-tertiary">
        <span>Done by </span>
        <span className="text-brand-600 font-medium">{log.doneBy}</span>
      </div>

      {log.assignment && (
        <div className="flex items-center gap-3 rounded-lg">
          <div className="flex items-center gap-2 text-sm rounded-lg border border-secondary px-[6px] py-[5px]">
            <Users className="h-4 w-4 text-tertiary" />
            <span className="text-tertiary">{log.assignment.from}</span>
          </div>
          <ArrowRight className="h-4 w-4 text-tertiary" />
          <div className="flex items-center gap-2 text-sm rounded-lg border border-secondary px-[6px] py-[5px]">
            <Users className="h-4 w-4 text-tertiary" />
            <span className="text-tertiary">{log.assignment.to}</span>
          </div>
        </div>
      )}
    </div>
  );
};
