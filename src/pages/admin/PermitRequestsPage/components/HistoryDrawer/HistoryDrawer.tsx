import { Drawer } from "@/components/base/drawer";
import {
  HistoryLogTimeline,
  type HistoryLogItem,
} from "@/components/HistoryLogTimeline";

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  requestId: string;
  logs: HistoryLogItem[];
}

export const HistoryDrawer = ({
  isOpen,
  onClose,
  requestId: _requestId,
  logs,
}: HistoryDrawerProps) => {
  // requestId can be used for fetching history from API
  void _requestId;
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Log History"
      description="Track all system activities in one place."
    >
      <HistoryLogTimeline logs={logs} />
    </Drawer>
  );
};
