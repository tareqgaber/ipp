import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { DataTable } from "@/components/DataTable";
import { useTranslation } from "@/hooks/useTranslation";
import { usePermitRequestsQuery } from "@/api/queries";
import { createPermitRequestsTableConfig } from "./config/permitRequestsTableConfig";
import { AssignModal } from "./components/AssignModal";
import { HistoryDrawer } from "./components/HistoryDrawer";
import type { HistoryLogItem } from "./components/HistoryDrawer/types";
import type { PermitRequestListParams } from "@/api/types";

// Mock history data for demonstration
const mockHistoryLogs: HistoryLogItem[] = [
  {
    id: "1",
    date: "02/09/2025",
    time: "04:06:25",
    type: "submit",
    status: "completed",
    doneBy: "Elbnaa al hadeeth",
  },
  {
    id: "2",
    date: "02/09/2025",
    time: "04:06:25",
    type: "save",
    status: "pending_review",
    doneBy: "Elbnaa al hadeeth",
    gisConflicts: [
      { label: "GIS Conflict", value: "NG Conflict" },
      { label: "Dist Conflict", value: "VIP Conflict" },
    ],
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla",
  },
  {
    id: "3",
    date: "02/09/2025",
    time: "04:06:25",
    type: "attachment",
    status: "pending_review",
    doneBy: "Elbnaa al hadeeth",
    attachments: [{ name: "Spotify", size: "200 KB", status: "deleted" }],
  },
  {
    id: "4",
    date: "02/09/2025",
    time: "04:06:25",
    type: "attachment",
    status: "pending_review",
    doneBy: "Elbnaa al hadeeth",
    attachments: [{ name: "Spotify", size: "200 KB", status: "uploaded" }],
  },
  {
    id: "5",
    date: "02/09/2025",
    time: "04:06:25",
    type: "assign",
    status: "pending_review",
    doneBy: "Elbnaa al hadeeth",
    assignment: { from: "IPC Team - west", to: "Elbnaa al hadeeth" },
  },
];

export const PermitRequestsPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Table state - managed by DataTable internally, this is just for initial query
  const [tableParams] = useState<PermitRequestListParams>({
    page: 1,
    pageSize: 10,
  });

  // Modal state
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedIdsForAssign, setSelectedIdsForAssign] = useState<string[]>(
    []
  );

  // History drawer state
  const [isHistoryDrawerOpen, setIsHistoryDrawerOpen] = useState(false);
  const [selectedRequestIdForHistory, setSelectedRequestIdForHistory] =
    useState<string>("");

  // Fetch data
  const { data, isLoading } = usePermitRequestsQuery(tableParams);

  // Action handlers
  const handleAssign = (id: string) => {
    setSelectedIdsForAssign([id]);
    setIsAssignModalOpen(true);
  };

  const handleViewHistory = (id: string) => {
    setSelectedRequestIdForHistory(id);
    setIsHistoryDrawerOpen(true);
  };

  const handleViewRequest = (id: string) => {
    navigate(`/admin/permit-requests/${id}`);
  };

  const handleBulkAssign = (ids: string[]) => {
    setSelectedIdsForAssign(ids);
    setIsAssignModalOpen(true);
  };

  const handleAssignSubmit = (assigneeType: string, assignTo: string) => {
    console.log("Assigning permit requests:", {
      ids: selectedIdsForAssign,
      assigneeType,
      assignTo,
    });
    // Implement actual assign logic here
  };

  // Create table configuration
  const tableConfig = useMemo(
    () =>
      createPermitRequestsTableConfig(
        handleAssign,
        handleViewHistory,
        handleViewRequest,
        handleBulkAssign,
        t
      ),
    [t]
  );

  return (
    <>
      <DataTable config={tableConfig} data={data} isLoading={isLoading} />
      <AssignModal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        selectedIds={selectedIdsForAssign}
        onAssign={handleAssignSubmit}
      />
      <HistoryDrawer
        isOpen={isHistoryDrawerOpen}
        onClose={() => setIsHistoryDrawerOpen(false)}
        requestId={selectedRequestIdForHistory}
        logs={mockHistoryLogs}
      />
    </>
  );
};

export default PermitRequestsPage;
