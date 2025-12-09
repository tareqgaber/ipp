import { Timeline } from "@/components/base/Timeline";
import type { TimelineStatusConfig } from "@/components/base/Timeline";
import type { HistoryLogItem } from "./types";
import {
  SubmitContent,
  SaveContent,
  AttachmentContent,
  AssignContent,
  GISResultsContent,
  RequestCreatedContent,
} from "./content";

const getHistoryTitle = (log: HistoryLogItem): string => {
  const labels: Record<HistoryLogItem["type"], string> = {
    submit: "Request Submitted",
    save: "Request Saved",
    attachment: "Attachments",
    assign: "Assigned to",
    gis_results: "Automated GIS Results",
    request_created: "Request Created",
  };
  return labels[log.type];
};

const getHistoryStatus = (log: HistoryLogItem): TimelineStatusConfig => {
  const config: Record<HistoryLogItem["status"], TimelineStatusConfig> = {
    completed: { color: "success", label: "Completed" },
    pending_review: { color: "warning", label: "Pending review" },
    uploaded: { color: "blue", label: "Uploaded" },
    deleted: { color: "error", label: "Deleted" },
  };
  return config[log.status];
};

const renderHistoryContent = (log: HistoryLogItem) => {
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

interface HistoryLogTimelineProps {
  logs: HistoryLogItem[];
}

export const HistoryLogTimeline = ({ logs }: HistoryLogTimelineProps) => {
  return (
    <Timeline
      items={logs}
      getTitle={getHistoryTitle}
      getStatus={getHistoryStatus}
      renderContent={renderHistoryContent}
    />
  );
};
