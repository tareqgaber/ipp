export interface TimelineItemBase {
  id: string;
  date: string;
  time: string;
}

export interface TimelineStatusConfig {
  color: "success" | "warning" | "blue" | "error";
  label: string;
}
