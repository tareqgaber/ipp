export type HistoryLogType =
  | "submit"
  | "save"
  | "attachment"
  | "assign"
  | "gis_results"
  | "request_created";

export type HistoryLogStatus =
  | "completed"
  | "pending_review"
  | "uploaded"
  | "deleted";

export interface GISConflict {
  label: string;
  value: string;
}

export interface AttachmentItem {
  name: string;
  size: string;
  status: "uploaded" | "deleted";
}

export interface AssignmentInfo {
  from: string;
  to: string;
}

export interface HistoryLogItem {
  id: string;
  date: string;
  time: string;
  type: HistoryLogType;
  status: HistoryLogStatus;
  doneBy: string;
  // Optional fields based on type
  comment?: string;
  gisConflicts?: GISConflict[];
  attachments?: AttachmentItem[];
  assignment?: AssignmentInfo;
}
