import { Badge } from "@/components/base/badges/badges";
import type { HistoryLogItem as HistoryLogItemType } from "./types";
import {
  SubmitContent,
  SaveContent,
  AttachmentContent,
  AssignContent,
  GISResultsContent,
  RequestCreatedContent,
} from "./content";
import { Check } from "@untitledui/icons";

interface HistoryLogItemProps {
  log: HistoryLogItemType;
  isLast?: boolean;
}

const getRequestTypeLabel = (type: HistoryLogItemType["type"]): string => {
  const labels: Record<HistoryLogItemType["type"], string> = {
    submit: "Request Submitted",
    save: "Request Saved",
    attachment: "Attachments",
    assign: "Assigned to",
    gis_results: "Automated GIS Results",
    request_created: "Request Created",
  };
  return labels[type];
};

const getStatusConfig = (
  status: HistoryLogItemType["status"]
): { color: "success" | "warning" | "blue" | "error"; label: string } => {
  const config: Record<
    HistoryLogItemType["status"],
    { color: "success" | "warning" | "blue" | "error"; label: string }
  > = {
    completed: { color: "success", label: "Completed" },
    pending_review: { color: "warning", label: "Pending review" },
    uploaded: { color: "blue", label: "Uploaded" },
    deleted: { color: "error", label: "Deleted" },
  };
  return config[status];
};

const renderContent = (log: HistoryLogItemType) => {
  switch (log.type) {
    case "submit":
      return <SubmitContent log={log} />;
    case "save":
      return <SaveContent log={log} />;
    case "attachment":
      return <AttachmentContent log={log} />;
    case "assign":
      return <AssignContent log={log} />;
    case "gis_results":
      return <GISResultsContent log={log} />;
    case "request_created":
      return <RequestCreatedContent log={log} />;
    default:
      return null;
  }
};

export const HistoryLogItem = ({ log, isLast }: HistoryLogItemProps) => {
  const statusConfig = getStatusConfig(log.status);

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
          <span className="font-medium text-primary">{log.date}</span>
          <br />
          <span>{log.time}</span>
        </div>

        {/* Request Type and Status */}
        <div className="mb-2 flex items-center justify-between">
          <h4 className="font-medium text-primary">
            {getRequestTypeLabel(log.type)}
          </h4>
          <Badge color={statusConfig.color} size="sm">
            {statusConfig.label}
          </Badge>
        </div>

        {/* Dynamic Content based on type */}
        {renderContent(log)}
      </div>
    </div>
  );
};
